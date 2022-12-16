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

                    <v-tab-item id="1">
                        <v-card-text>
                            <admin-phone />
                            <admin-getAllPhone />
                        </v-card-text>
                    </v-tab-item>
                    <v-tab-item id="2">
                        <v-card-text>
                            <!-- <admin-localization /> -->
                            <!-- <admin-getAllLocalization /> -->
                        </v-card-text>
                    </v-tab-item>
                    <v-tab-item id="3">
                        <v-card-text>
                            <!-- <admin-employee /> -->
                            <!-- <admin-getAllEmployee /> -->
                        </v-card-text>
                    </v-tab-item>
                    <v-tab-item id="4">
                        <v-card-text>
                            <!-- <admin-sector /> -->
                            <!-- <admin-getAllSector /> -->
                        </v-card-text>
                    </v-tab-item>
                </v-tabs>
            </v-card>      
        </div>
    </v-container>
</template>

<script>
    export default {
        data(){
            return{
                tabs: 0,
                nameTabs: [
                    {icon: 'mdi-phone', name: 'Telefones'},
                    {icon: 'mdi-map-marker', name: 'Endereços'},
                    {icon: 'mdi-account', name: 'Usuários'},
                    {icon: 'mdi-home', name: 'Gerências'},
                ]
            }
        },
        watch:{
            tabs(newTabs, oldTabs){
                this.alter(newTabs)
            }
        },
        methods:{
            alter(item){
                console.log("chamou", item);
                this.$router.push( `/admin?id=${item}` )
            }
        }
    }
</script>

<style scoped>

</style>