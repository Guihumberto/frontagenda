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
                <v-toolbar-title>CRUD</v-toolbar-title>
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
                        mdi-account
                        </v-icon>
                        {{item}}
                    </v-tab>
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
                </v-tabs>
            </v-card>      
        </div>
    </v-container>
</template>

<script>
    export default {
        data(){
            return{
                tabs: null,
                nameTabs: ['Telefones', 'Endereços', 'Usuários', 'Setores', 'Gerências']
            }
        }
    }
</script>

<style scoped>

</style>