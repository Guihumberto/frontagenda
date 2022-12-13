<template>
    <div>
        <v-row>
            <v-col col="12" sm="6">
                <v-card outlined>
                    <v-card-title class="py-0">Inserir novo número</v-card-title>
                    <v-form @submit.prevent="insert" ref="form">
                        <v-card-text class="pb-0">
                                <v-text-field
                                    label="Ramal"
                                    placeholder="(98)3212-1234"
                                    outlined dense
                                    v-mask="'(##) ####-####'"
                                    v-model.trim="phone"
                                    :rules="[rules.required, rules.mincaracter]"
                                ></v-text-field>
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
            <v-col col="12" sm="6">
                <v-card outlined min-height="160">
                    <v-card-text>
                        <small>Qtd. Registro</small><br>
                        <small>Qtd Registros Vinculados</small><br>
                        <small>Qtd Registros Não Vinculados</small><br>
                        <small>última Atualização</small><br>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <small class="ml-1">Total de Registros: {{listPhone.length}}</small> 
    </div>
</template>

<script>
    import { mapActions } from 'vuex';  
    export default {
        data(){
            return{
                phone: null,
                rules:{
                    required: (value) => !!value || "Campo obrigatório",
                    mincaracter: (v) => (v||'').length >= 10 || "Mínimo de 10 caracteres",
                },
            }
        },
        computed:{
            listPhone(){
                return this.$store.getters.readPhone
            }
        },
        methods:{
            ...mapActions(['insertPhone', 'cargaPhone']),
            insert(){
                if(this.$refs.form.validate()){
                    if(!this.phoneIslist(this.phone)){
                        this.insertPhone(this.phone);
                        this.phone = null
                    }
                }
            },
            phoneIslist(phone){
                let find = this.listPhone.filter(x => x.phone == phone)
                if(find.length){
                    return true
                } else {
                    return false
                }
            }
        },
        created(){
            this.cargaPhone()
        }
    }
</script>

<style scoped>

</style>