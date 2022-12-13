<template>
  <v-card
    class="mx-auto mt-5 py-0"
    color="primary"
    outlined
  >

    <v-list two-line class="py-0 my-0">
      <v-list-item-group
        v-model="selected"
        :active-class="colorLine"
      >
        <v-slide-x-transition
          group
        >
          <template v-for="(item, index) in list">
            <!-- edit mode -->
            <v-list-item 
              :key="index + item.phone" 
              v-if="editMode == item.id"
            >
              <v-list-item-icon class="pt-3">
                <v-icon>mdi-circle-edit-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="pt-3">
                 <v-text-field
                 v-model="item.phone"
                 dense outlined
                 style="max-width:150px"
                 v-mask="'(##) ####-####'"
                 :rules="[rules.required, rules.mincaracter]"
                 ></v-text-field>
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <div class="d-flex">
                  <v-btn
                    outlined
                    @click="modifyList(item)"
                  >Editar</v-btn>
                  <v-btn
                    class="ml-1"
                    text
                    @click="editMode = null"
                  >Cancelar</v-btn>
                </div>
              </v-list-item-action>  
            </v-list-item>
            <!-- delete mode -->
            <v-list-item :key="index + item.phone" v-else-if="deleteMode == item.id">
              <v-list-item-icon>
                <v-icon color="error">mdi-alert-circle-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="error--text">
                  Tem certeza que deseja apagar o ramal <strong>{{item.phone}}</strong>?
                </v-list-item-title>
                <v-list-item-subtitle>
                  A operação não poderá ser desfeita.
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <div class="d-flex">
                  <v-btn
                    outlined
                    color="error"
                    @click="modifyList(item)"
                  >Sim</v-btn>
                  <v-btn
                    class="ml-1"
                    text
                    @click="deleteMode = null"
                  >Cancelar</v-btn>
                </div>
              </v-list-item-action>
            </v-list-item>
            <!-- show mode -->
            <v-list-item :key="index + item.phone" v-else>
              <template v-slot:default="{ active }">
                <v-list-item-content>
                  <v-list-item-subtitle v-text="item.id"></v-list-item-subtitle>
                  <v-list-item-title v-text="item.phone"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-list-item-action-text>Ações</v-list-item-action-text>
                  <div class="d-flex">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-bind="attrs"
                          v-on="on"
                          icon
                          @click="edit(item.id)"
                        >
                          <v-icon>mdi-circle-edit-outline</v-icon>
                        </v-btn>
                      </template>
                      <span>Editar</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-bind="attrs"
                          v-on="on"
                          icon
                          @click="remove(item.id)"
                        >
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </template>
                      <span>Apagar</span>
                  </v-tooltip>
                  </div>
                </v-list-item-action>
              </template>
            </v-list-item>
            <v-divider
              v-if="index < list.length - 1"
              :key="index"
            ></v-divider>
          </template>
        </v-slide-x-transition>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    selected: 1,
    editMode:  null,
    deleteMode: null,
    rules:{
        required: (value) => !!value || "Campo obrigatório",
        mincaracter: (v) => (v||'').length >= 10 || "Mínimo de 10 caracteres",
    },
  }),
  computed:{
      list(){
          return this.$store.getters.readPhone.sort(this.order)
      },
      colorLine(){
        let color = 'primary--text'
        if(this.editMode){
          color = 'success--text'
        }
        if(this.deleteMode){
          color = 'pink--text'
        }
        return color
      }
  },
  methods:{
      ...mapActions(['cargaPhone', 'editSetPhone', 'removePhone']),
      order(a, b){
        return b.id -  a.id
      },
      edit(item){
        this.deleteMode = null
        this.editMode = item
      },
      remove(item){
        this.editMode = null
        this.deleteMode = item
      },
      modifyList(item){
        if(this.editMode){
          this.editSetPhone(item.id)
        }
        if(this.deleteMode){
          this.removePhone(item.id)
        }
      }
  },
  created(){
      this.cargaPhone()
  }
}
</script>