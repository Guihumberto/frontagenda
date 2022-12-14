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
      <v-slide-x-transition>
        <v-snackbar 
            v-for="(snack, i) in snacks.filter((s)=> s.showing)" :key="i + Math.random()"
            v-model="snack.showing"
            :timeout="snack.timeout"
            :color="snack.color"
            :style="`bottom: ${i * 60 + 8}px`"
          >
            <v-btn slot="action" icon small @click="snack.showing = false">
              <v-icon small>mdi-close</v-icon>
            </v-btn>
          {{snack.text}}
        </v-snackbar>
      </v-slide-x-transition>
    </v-main>
    <layoutComponent-footer />
  </v-app>
</template>

<script>
  import { mapGetters} from 'vuex'
  export default {
    data: () => ({
      drawer: false,
      snack: false,
    }),
    computed:{
      ...mapGetters({snacks:"snackbars/readSnackbars"}),
    },
    created(){
      this.$store.dispatch('getAgenda')
        .then((response) => {
          console.log("ok");
        })
    }
  }
</script>