<template>
  <div class="row">
    <div class="col-md-8 col-xs-12">
      <v-card-title>
        <v-select
          v-model="selectedMaterials"
          :items="materials"
          multiple
          outlined
          clearable
          dense
          label="Filter by material"
        />
        <v-spacer />
        <v-text-field
          v-model="searchQuery"
          dense
          outlined
          clearable
          label="Search"
          prepend-inner-icon="fa-search"
        />
      </v-card-title>
      <div class="text-center mt-12">
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="primary"
          size="100"
          width="2"
        />
        <v-pagination
          v-else
          v-model="pagination.page"
          :length="pageCount"
          :total-visible="15"
        />
      </div>
      <v-row no-gutters>
        <v-col v-for="robot in paginated" :key="robot.name">
          <robot-card :robot="robot" />
        </v-col>
      </v-row>
    </div>
    <div class="col-md-4 col-xs-12" :class="{ 'sidebar' : !$vuetify.breakpoint.mobile }">
      <robot-cart class="py-2" />
    </div>
  </div>
</template>

<script>
import { ref, computed, reactive, watch } from "vue-demi"
import { asyncComputed, debouncedRef } from "@vueuse/core"
import { getRobots } from "../api/robots"
import { AsEnumerable } from "linq-es5"

import RobotCard from "../components/RobotCard.vue"
import RobotCart from "@/components/RobotCart.vue"
export default {
  components: {
    RobotCard,
    RobotCart,
  },
  setup() {
    const loading = ref(false)

    const searchQuery = ref("")
    const search = debouncedRef(searchQuery, 500)

    const robots = asyncComputed(
      async () => {
        const response = await getRobots()
        return response.data.data
      },
      [],
      loading
    )

    const materials = computed(() => {
      if (robots.length === 0) return []
      return AsEnumerable(robots.value.map((x) => x.material))
        .Distinct()
        .ToArray()
    })

    const selectedMaterials = ref([])

    const pagination = reactive({
      page: 1,
      pageSize: 8,
    })
    const skip = computed(() => {
      const ratio = pagination.page <= 0 ? 0 : pagination.page - 1
      return pagination.pageSize * ratio
    })
    const pageCount = computed(() => {
      const total = filtered.value.length
      return (
        Math.trunc(total / pagination.pageSize) +
        (total % pagination.pageSize > 0 ? 1 : 0)
      )
    })
    const filtered = computed(() => {
      const array = robots.value.filter(
        (x) => x.name.match(new RegExp(search.value ?? "", "i")) !== null
      )
      if (selectedMaterials.value.length === 0) return array
      return AsEnumerable(array)
        .Where((robot) => selectedMaterials.value.includes(robot.material))
        .ToArray()
    })
    const resetPage = watch([search, selectedMaterials], () => {
      pagination.page = 1
    })

    const paginated = computed(() => {
      return AsEnumerable(filtered.value)
        .Skip(skip.value)
        .Take(pagination.pageSize)
        .ToArray()
    })

    return {
      loading,
      paginated,
      selectedMaterials,
      materials,
      pagination,
      pageCount,
      searchQuery,
    }
  },
}
</script>
<style scoped>
.sidebar {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>