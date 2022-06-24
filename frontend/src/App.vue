<template>
  <v-app>
    <v-app-bar
      app
      dark
      dense
      color="blue"
    >
      <div class="text-h5">
        Robot Shop
      </div>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
        <v-snackbar v-model="toast.show" :timeout="toast.timeout" :color="toast.color" top>
        <v-icon class="px-2" v-if="toast.icon">{{ toast.icon }}</v-icon>
      {{ toast.message }}
      <v-btn v-if="toast.timeout === 0" color="white" text @click="toast.show = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import { mapState } from 'vuex'

export default {
  name: 'App',

  computed: {
    ...mapState(['toast']),
  }
}
</script>
