<template>
  <v-container 
    style="max-width: 1080px"
    class="my-5"
  >
    <h1 class="text-h4">
      <v-icon large>mdi-phone</v-icon>
      Agenda SEFAZ-MA
    </h1>
    <div class="d-flex">  
        <v-expand-x-transition>
          <agenda-listAgenda 
            @showContactBtn="showContact($event)" 
            :showContato="showContato"
          />
        </v-expand-x-transition> 
        <v-expand-x-transition>
          <agenda-contato 
            v-if="showContato" 
            @noShowContact="noShowContact()" 
            :employee="employee" /> 
        </v-expand-x-transition>
      </div>
  </v-container>
</template>

<script>
export default {
  data(){
    return{
      showContato: false,
      employee: null
    }
  },
  methods:{
    showContact(item){
      this.showContato = false
      this.employee = item
      setTimeout(() => 
      this.showContato = true
      , 0,1)
    },
    noShowContact(){
      this.showContato = false
      this.employee = null
    }
  }
}
</script>