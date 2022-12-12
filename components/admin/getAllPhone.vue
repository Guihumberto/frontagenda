<template>
    <v-card
      class="mx-auto mt-5"
      outlined
    >
  
      <v-list two-line>
        <v-list-item-group
          v-model="selected"
          active-class="pink--text"
        >
          <template v-for="(item, index) in list">
            <v-list-item :key="item.phone">
              <template v-slot:default="{ active }">
                <v-list-item-content>
                  <v-list-item-title v-text="item.phone"></v-list-item-title>

  
                  <v-list-item-subtitle v-text="item"></v-list-item-subtitle>
                </v-list-item-content>
  
                <v-list-item-action>
                  <v-list-item-action-text>Ações</v-list-item-action-text>
  
                  <v-icon
                    v-if="!active"
                    color="grey lighten-1"
                  >
                    mdi-star-outline
                  </v-icon>
  
                  <v-icon
                    v-else
                    color="yellow darken-3"
                  >
                    mdi-star
                  </v-icon>
                </v-list-item-action>
              </template>
            </v-list-item>
  
            <v-divider
              v-if="index < list.length - 1"
              :key="index"
            ></v-divider>
          </template>
        </v-list-item-group>
      </v-list>
    </v-card>
  </template>
  <script>
  import { mapActions } from 'vuex'

  export default {
    data: () => ({
      selected: 1,
    }),
    computed:{
        list(){
            return this.$store.getters.readPhone
        }
    },
    methods:{
        ...mapActions(['cargaPhone'])
    },
    created(){
        this.cargaPhone()
    }
  }
</script>