<template>
    <v-card
      class="mx-auto mt-5 py-0"
      color="primary"
      outlined
    >
    <v-text-field
      label="Busca"
      placeholder="Digite um endereço..."
      v-model="search"
      dense outlined
      append-icon="mdi-magnify"
      class="mx-2 mt-5"
      clearable
      solo
    ></v-text-field>
  
      <v-list three-line class="py-0 my-0">
        <v-list-item-group
          v-model="selected"
          :active-class="colorLine"
        >
          <v-slide-x-transition
            group
          >
            <template v-for="(item, index) in listSearch.list">
              <!-- show mode -->
              <v-list-item :key="index">
                <template v-slot:default="{ active }">
                  <v-list-item-content>
                    <v-list-item-title v-text="item.name"></v-list-item-title>
                    <v-list-item-subtitle>{{item.sector.name}} - Ramal: {{item.phone.phone}} - celular {{item.cellphone}} <v-icon v-if="item.wtzp" small>mdi-whatsapp</v-icon></v-list-item-subtitle>
                    <v-list-item-subtitle>
                      {{item.sector.localization.adress}} - {{item.sector.localization.city}}
                    </v-list-item-subtitle>
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
            </template>
          </v-slide-x-transition>
        </v-list-item-group>
      </v-list>
      <layoutComponent-pagination :pagination="pagination" :totalPages="listSearch.totalPages" />
    </v-card>
  </template>
  <script>
  import { mapActions } from 'vuex'
  
  export default {
    data: () => ({
      selected: 1,
      editMode:  null,
      deleteMode: null,
      search: null,
      rules:{
          required: (value) => !!value || "Campo obrigatório",
          mincaracter: (v) => (v||'').length >= 5 || "Mínimo de 05 caracteres",
      },
      pagination:{
          page: 1,
          perPage: 10,
      },
    }),
    computed:{
        list(){
            return this.$store.getters.readEmployee.sort(this.order)
        },
        listSearch(){
          let list = this.list
          if(this.search){
              this.pageOne()
             //retirar acentuação
             let search = this.search.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                //retirar caracteres especiais
              let exp = new RegExp(search.trim().replace(/[\[\]!'.@><|//\\&*()_+=]/g, ""), "i")
              //fazer o filtro
              let filtro = list.filter(project => exp.test(project.name.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, "") ) )
                list = filtro
          }
  
          let page = this.pagination.page - 1
          let start = page * this.pagination.perPage
          let end = start + this.pagination.perPage
  
          return {
            list: list.slice(start, end),
            totalPages: Math.ceil(list.length/this.pagination.perPage),
          }
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
        ...mapActions(['cargaEmployee', 'editSetEmployee', 'removeEmployee']),
        order(a, b){
          return b.id - a.id
        },
        edit(item){
          this.deleteMode = null
          this.editMode = item
        },
        remove(item){
          this.editMode = null
          this.deleteMode = item
        },
        pageOne(){
          this.pagination.page = 1
        },
        modifyList(item){
          if(this.editMode){
              this.editSetEmployee(item)
              this.editMode = null
              this.$store.dispatch("snackbars/setSnackbars", {text:'Registro editado', color:'success'})
          }
          if(this.deleteMode){
            this.removeEmployee(item.id)
            this.deleteMode = null
            this.$store.dispatch("snackbars/setSnackbars", {text:'Registro removido', color:'error'})
          }
        }
    },
    created(){
        this.cargaEmployee()
    }
  }
  </script>