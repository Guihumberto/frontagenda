<template>
  <v-card
    class="mt-5 mx-auto"
    :min-width="`${sizeAgenda}%`"
    outlined
  >
    <v-toolbar
      color="cyan"
      dark
    >
    <span v-if="!showSearchField">Lista de Contatos</span>
    <v-expand-x-transition>
        <v-text-field
            class="mt-5"
            dense append-icon="mdi-magnify"
            rounded outlined filled
            autofocus="true"
            v-if="showSearchField"
            v-model="search"
            clearable
        ></v-text-field>
    </v-expand-x-transition>
      <v-spacer
          v-if="!showSearchField"
      ></v-spacer>
      <v-btn 
          icon
          @click="showSearchField =! showSearchField, search = null"
      >
        <v-icon>{{magnifyIcon}}</v-icon>
      </v-btn>
    </v-toolbar>
    
    <v-list three-line>
      <template v-if="contactList">
        <v-subheader
        >Contato</v-subheader>
        <v-list-item-group>
          <template v-for="(item, index) in contactList">
            <v-list-item
              @click="contatoRight(item)"
              :key="index"
            >
              <v-list-item-avatar 
                  color="primary"
              >
                <v-icon dark>mdi-account</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
                <v-list-item-subtitle>
                  {{item.sector.name}} 
                   <!-- {{item.andar}} -->
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                  <div class="my-2">
                      <small>
                        <v-icon x-small>mdi-phone</v-icon>
                        {{item.phone.phone}}
                      </small>  <br>
                      <small>
                        <v-icon x-small>mdi-briefcase-outline</v-icon>
                        {{item.phoneTable ? "Mesa":"Próximo"}}
                      </small>
                  </div>
              </v-list-item-action>
            </v-list-item>
            <v-divider></v-divider>
          </template>
        </v-list-item-group>
      </template>
      <v-list-item v-else>
        <v-list-item-avatar
          color="error"
        >
          <v-icon dark>mdi-alert-circle</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            Não foram encontrados resultados para sua busca!
          </v-list-item-title>
          <v-list-item-subtitle>
            Refaça a busca
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
      <layoutComponent-pagination />
  </v-card>
</template>

<script>
export default {
data: () => ({
  showSearchField: false,
  search: null,
  employee: null,
  sizeAgenda: 100,
}),
props:{
  showContato: Boolean
},
computed:{
  contactList(){
    if(this.showSearchField && this.search){
      let search = this.search.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      let exp = new RegExp(search.trim().replace(/[\[\]!'.@><|//\\&*()_+=]/g, ""), "i");
      let filtro = this.items.filter(project => exp.test(
              project.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "") ) 
              || exp.test( project.phone.phone.replace('.', '') ) 
              || exp.test( project.sector.name.replace('.', '') ))

      return filtro.length
      ? filtro
      : false
    } else {
      return this.items
    }
  },
  magnifyIcon(){
      return this.showSearchField
      ? 'mdi-close' 
      : 'mdi-magnify'
  },
  items(){
    const lista = this.$store.getters.readAgenda
    return lista
  }
},
methods:{
  contatoRight(item){
    this.employee = item
    this.sizeAgenda = 65,
    this.$emit('showContactBtn', this.employee)
  },
},
}
</script>