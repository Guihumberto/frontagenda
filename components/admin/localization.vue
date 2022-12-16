<template>
    <div>
        <v-row>
            <v-col col="12">
                <v-card outlined>
                    <v-card-title class="py-0">Inserir novo endereço</v-card-title>
                    <v-form @submit.prevent="insert" ref="form">
                        <v-card-text class="pb-0">
                                <v-text-field
                                    label="Endereço"
                                    placeholder="Av. Carlos Cunha s/n Calhau"
                                    outlined dense
                                    v-model.trim="address.adress"
                                    :rules="[rules.required, rules.mincaracter]"
                                ></v-text-field>
                                <v-row>
                                    <v-col>
                                        <v-text-field
                                            label="Cidade"
                                            placeholder="São Luís"
                                            outlined dense
                                            v-model.trim="address.city"
                                            :rules="[rules.required, rules.mincaracter]"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col>
                                        <v-select
                                            label="Tipo"
                                            outlined dense
                                            :items="types"
                                            v-model="address.type"
                                            :rules="[rules.required]"
                                            clearable
                                        ></v-select>
                                    </v-col>
                                    <v-col>
                                        <v-select
                                            label="Andar"
                                            outlined dense
                                            :items="floor"
                                            v-model="address.floor"
                                            :rules="[rules.required]"
                                            clearable
                                        ></v-select>
                                    </v-col>
                                </v-row>
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
                address: {
                    adress: null,
                    city: null, 
                    type: null,
                    floor: null
                },
                types:['Sede', 'Agência', 'Posto', 'Outros'],
                floor:['Térreo', '1º piso', '2º piso', '3º piso'],
                rules:{
                    required: (value) => !!value || "Campo obrigatório",
                    mincaracter: (v) => (v||'').length >= 5 || "Mínimo de 05 caracteres",
                },
            }
        },
        computed:{
            list(){
                return this.$store.getters.readLocal
            }
        },
        methods:{
            ...mapActions(['insertLocal', 'cargaLocal']),
            insert(){
                if(this.$refs.form.validate()){
                    if(!this.Islist(this.address)){
                        this.insertLocal(this.address);
                        this.address = {
                            adress: null,
                            city: null, 
                            type: null,
                            floor: null
                        }
                        this.$store.dispatch("snackbars/setSnackbars", {text:'Registro salvo', color:'success'})
                    } else {
                        this.$store.dispatch("snackbars/setSnackbars", {text:'Registro já cadastrado', color:'error'})
                    }
                }
            },
            Islist(item){
                let find = this.list.filter(x => x.adress == item.address)
                if(find.length){
                    return true
                } else {
                    return false
                }
            }
        },
        created(){
            this.cargaLocal()
        }
    }
</script>

<style scoped>

</style>