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
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {},
}
</script>
