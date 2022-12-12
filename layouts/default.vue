<template>
  <v-app app>
    <v-navigation-drawer 
      v-model="drawer"
      app
    >
      <layoutComponent-sideBar />
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>COTEC</v-toolbar-title>
    </v-app-bar>

    <v-main class="grey lighten-2">
      <nuxt />
    </v-main>
    <layoutComponent-footer />
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: false 
    }),
    created(){
      this.$store.dispatch('getAgenda')
        .then((response) => {
          console.log("ok");
        })
    }
  }
</script>