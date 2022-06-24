<template>
  <v-row no-gutters class="align-center">
    <v-col cols="3">
      <v-icon v-if="icon" class="px-2">
        {{ icon }}
      </v-icon>
    </v-col>
    <v-col cols="9">
      <span class="body-1 pr-2 grey--text">{{ text }}</span
      ><Br />
      <slot></slot>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    icon: { type: String, default: null },
    text: { type: String },
  },
}
</script>
