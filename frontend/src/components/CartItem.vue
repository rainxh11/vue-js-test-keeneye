<template>
  <v-card class="mx-3 my-3" hover>
    <v-row no-gutters>
      <v-col cols="12" md="2">
        <v-img :src="item.image" width="100" height="100" />
      </v-col>
      <v-col cols="12" md="6">
        <div class="text-h6">{{ item.name }}</div>
        <div>
          Unit Price: <i>{{ item.price | formatCurrency }}</i>
        </div>
        <div>
          Subtotal: <b>{{ (item.price * item.quantity) | formatCurrency }}</b>
        </div>
      </v-col>
      <v-col cols="12" md="3">
        <v-btn icon color="primary" @click="decrement(item.name)"> <v-icon>fa-minus-circle</v-icon> </v-btn>
        <span class="text-h6 px-2">{{ item.quantity }}</span>
        <v-btn icon color="primary" @click="increment(item.name)"> <v-icon>fa-plus-circle</v-icon> </v-btn>
      </v-col>
      <v-col cols="12" md="1">
        <v-btn icon color="error" @click="remove(item.name)"><v-icon>fa-trash</v-icon></v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    remove: {
      type: Function,
      required: true,
    },
    increment: {
      type: Function,
      required: true,
    },
    decrement: {
      type: Function,
      required: true,
    },
  },
}
</script>
