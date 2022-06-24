<template>
  <div>
    <v-card max-width="100%" class="mx-1 my-3 mr-4 pa-2" :class="{ 'scrollable-sidebar': !$vuetify.breakpoint.mobile }">
      <v-card-title>
        <v-icon large>fa-cart-shopping</v-icon>
        <h2 class="px-5">Shopping Cart</h2>
        <v-spacer />
        <v-btn rounded outlined color="primary" @click="clearCart">
          <v-icon small class="px-2">fa-trash-can</v-icon>
          Clear Cart
        </v-btn>
      </v-card-title>
      <div class="text-center text-h4 pa-4">
        {{ getCart.map(x => x.quantity).reduce((a, c) => a + c, 0) }}
        <b> Robots </b>
      </div>
      <div class="text-center text-h4 pa-4">
        <b>Total: </b>
        {{ getCart.map(x => x.quantity * x.price).reduce((a, c) => a + c, 0) | formatCurrency }}
      </div>
      <div v-for="item in getCart" :key="item.name">
        <cart-item :item="item" :decrement="decrementQuantity" :increment="incrementQuantity" :remove="removeRobot" />
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations, mapGetters } from 'vuex'
import CartItem from '@/components/CartItem.vue'

export default Vue.extend({
  components: {
    CartItem,
  },
  setup() {
    return {
      ...mapMutations(['incrementQuantity', 'decrementQuantity', 'removeRobot', 'clearCart']),
    }
  },
  computed: {
    ...mapGetters(['getCart']),
  },
})
</script>

<style scoped>
.scrollable-sidebar {
  overflow-y: scroll;
  max-height: 80vh;
}
</style>