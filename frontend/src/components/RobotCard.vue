<template>
  <v-card class="mx-3 my-3" hover :max-width="size">
    <v-img class="align-end" :height="size" :width="size" :src="robot.image" />
    <v-card-title class="pa-0">
      <v-col>
        <div class="text-body-1 font-weight-bold text-wrap">
          {{ robot.name }}
        </div>
        <label-component text="Material">
          <span class="body-1 font-weight-bold">{{ robot.material }}</span>
        </label-component>

        <label-component icon="fa-coins" text="Price">
          <span class="body-1 font-weight-bold">{{
            robot.price | formatCurrency
          }}</span>
        </label-component>

        <label-component icon="fa-calendar-days" text="Cteated at">
          <span class="body-1 font-weight-bold">{{
            robot.createdAt | formatDate
          }}</span>
        </label-component>

        <label-component icon="fa-cubes" text="Stock">
          <span class="body-1 font-weight-bold">{{ robot.stock }}</span>
        </label-component>
      </v-col>
    </v-card-title>
    <v-card-actions>
      <v-text-field
        v-if="robot.stock > 0"
        v-model="quantity"
        label="Quantity to add"
        type="number"
        :max="robot.stock"
        outlined
        dense
        :min="0"
      />
    </v-card-actions>

    <v-card-actions>
      <v-btn
        block
        color="primary"
        :disabled="quantity <= 0 || quantity > robot.stock"
        @click="addRobot({ ...robot, quantity: parseInt(quantity)}); quantity = 1"
      >
        <v-icon small class="px-1"> fa-cart-plus </v-icon>
        Add to cart
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import LabelComponent from "./LabelComponent.vue"
import { ref } from "vue-demi"
import { mapActions } from "vuex"

export default {
  components: { LabelComponent },
  props: {
    robot: {
      type: Object,
      required: true,
    },
    size: {
      type: Number,
      default: 200,
    },
  },
  setup(props) {
    const quantity = ref(1)
    return {
      quantity,
      ...mapActions(["addRobot"]),
    }
  },
}
</script>
