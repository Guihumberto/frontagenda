<template>
    <v-container 
        style="max-width: 1080px"
        class="my-5"
    >
        <h1 class="text-h4">
            <v-icon large>mdi-cog-outline</v-icon>
            Configurações
        </h1>
        <div class="mt-5">   
            <v-card>
                <v-toolbar
                    flat
                    color="primary"
                    dark
                >
                    <v-toolbar-title>Cadstros e Listas</v-toolbar-title>
                </v-toolbar>
                <v-tabs 
                    v-model="tabs"
                    centered
                >
                    <v-tab
                        v-for="(item, index) in nameTabs"
                        :key="index"
                    >
                        <v-icon left>
                       {{item.icon}}
                        </v-icon>
                        {{item.name}}
                    </v-tab>
                </v-tabs>

                <v-tabs-items v-model="tabs">
                    <v-tab-item>
                        <v-card-text>
                            <admin-phone />
                            <admin-getAllPhone />
                        </v-card-text>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card-text>
                            <admin-localization /> 
                            <admin-getAllLocalization />
                        </v-card-text>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card-text>
                            <admin-employee />
                            <admin-getAllEmployee />
                        </v-card-text>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card-text>
                            <admin-sector />
                            <admin-getAllSector />
                        </v-card-text>
                    </v-tab-item>
                </v-tabs-items>
                
            </v-card>      
        </div>
    </v-container>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        data(){
            return{
                tabs: null,
                nameTabs: [
                    {id: 1, icon: 'mdi-phone', name: 'Telefones'},
                    {id: 2, icon: 'mdi-map-marker', name: 'Endereços'},
                    {id: 3, icon: 'mdi-account', name: 'Usuários'},
                    {id: 4, icon: 'mdi-home', name: 'Gerências'},
                ]
            }
        },
        watch:{
            tabs(newTab, oldTab){
                if(newTab){
                    this.$router.push(`/admin?id=${this.tabs}`)
                } else if (oldTab) {
                    this.$router.push(`/admin?id=${this.tabs}`)
                }
            }
        },  
        methods:{
            ...mapActions(['alterSizeAgenda']),
            alterTab(){
                if(this.$route.query.id != 0){
                    this.tabs = 3
                }
            }
        },
        created(){
            this.alterSizeAgenda(100)
        },
        mounted(){
            this.tabs = parseInt(this.$route.query.id)
        }
    }
</script>

<style scoped>

</style>