<template>
    <div>
        <v-row>
            <v-col col="12">
                <v-card outlined>
                    <v-card-title class="py-0">Inserir novo setor</v-card-title>
                    <v-form @submit.prevent="insert" ref="form">
                        <v-card-text class="d-flex pb-0">
                                <v-text-field
                                    label="Setor"
                                    placeholder="COTEC-DEV"
                                    outlined dense class="mr-1"
                                    v-model.trim="sector.name"
                                    :rules="[rules.required, rules.mincaracter]"
                                ></v-text-field>
                                <v-select
                                    label="Endereço"
                                    outlined dense
                                    :items="localization"
                                    item-text="name"
                                    item-value="id"
                                    :rules="[rules.required]"
                                    v-model="sector.local"
                                ></v-select>
                        </v-card-text>
                        <v-card-actions class="mt-0 pt-0">
                            <v-spacer></v-spacer>
                            <v-btn
                                color="success" 
                                type="submit"
                            >Inserir</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
        <small class="ml-1">Total de Registros: {{list.length}}</small> 
    </div>
</template>

<script>
    import { mapActions } from 'vuex';  
    export default {
        data(){
            return{
                sector: {
                    name: null,
                    local: null
                },
                rules:{
                    required: (value) => !!value || "Campo obrigatório",
                    mincaracter: (v) => (v||'').length >= 5 || "Mínimo de 5 caracteres",
                },
            }
        },
        computed:{
            list(){
                return this.$store.getters.readSector
            },
            localization(){
                let list = []
                const local = this.$store.getters.readLocal
                local.forEach(x => {
                    list.push({
                        id: x.id,
                        name: `${x.adress} - ${x.floor} - ${x.type} - ${x.city}`
                    })
                });
                return list
            }
        },
        methods:{
            ...mapActions(['insertSector', 'cargaSector', 'cargaLocal']),
            insert(){
                if(this.$refs.form.validate()){
                    if(!this.Islist(this.sector.name)){
                        this.insertSector(this.sector);
                        this.$store.dispatch("snackbars/setSnackbars", {text:'Registro salvo', color:'success'})
                        this.clearSector()
                    } else {
                        this.$store.dispatch("snackbars/setSnackbars", {text:'Registro já cadastrado', color:'error'})
                    }
                }
            },
            Islist(sector){
                let find = this.list.filter(x => x.name == sector)
                if(find.length){
                    return true
                } else {
                    return false
                }
            },
            clearSector(){
                this.sector = {
                    name: null,
                    local: null
                }
            }
        },
        created(){
            this.cargaSector(),
            this.cargaLocal()
        }
    }
</script>

<style scoped>

</style>