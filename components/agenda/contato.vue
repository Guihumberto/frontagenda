<template>
    <v-card
      class="mt-5 mx-auto ml-2"
      width="30%"
      min-height="612"
    >
      <v-toolbar
        color="cyan"
        dark
      >
        <v-icon class="mr-1">mdi-account</v-icon>
        {{employee.name}}
        <v-spacer></v-spacer>
        <v-btn 
            icon
            @click="$emit('noShowContact')"
        >
            <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
  
      <v-card-text
      >
      <v-list two-line>
        <v-list-item-group
            v-model="selectedItem"
            color="primary"
        >
            <v-list-item>
                <v-list-item-icon>
                    <v-icon color="indigo">
                        mdi-cellphone
                    </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{employee.cellphone ? employee.cellphone : 'Não informado'}}</v-list-item-title>
                    <v-list-item-subtitle>Pessoal</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-icon v-if="employee.wtzp">
                <v-icon>mdi-whatsapp</v-icon>
                </v-list-item-icon>
            </v-list-item>

            <v-list-item>
                <v-list-item-icon>
                    <v-icon color="indigo">
                        mdi-phone
                    </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                <v-list-item-title>{{employee.phone.phone}}</v-list-item-title>
                <v-list-item-subtitle>SEFAZ / {{employee.phoneTable ? 'mesa' : 'próximo'}}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-icon>
                <v-icon>mdi-message-text</v-icon>
                </v-list-item-icon>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
                <v-list-item-icon>
                    <v-icon color="indigo">
                        mdi-email
                    </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                <v-list-item-title>{{employee.email}}</v-list-item-title>
                <v-list-item-subtitle>SEFAZ</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
                <v-list-item-icon>
                <v-icon color="indigo">
                    mdi-map-marker
                </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                <v-list-item-title>{{employee.sector.name}} - {{employee.sector.localization.type}}</v-list-item-title>
                <v-list-item-subtitle>{{employee.sector.localization.adress}}</v-list-item-subtitle>
                <v-list-item-subtitle>{{employee.sector.localization.city}} - MA</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list-item-group>
       </v-list>      
      </v-card-text>
    </v-card>
</template>

<script>
    export default {
        data(){
            return{
                selectedItem: 1,
            }
        },
        props:{
            employee:Object
        }
    }
</script>

<style lang="scss" scoped>

</style>