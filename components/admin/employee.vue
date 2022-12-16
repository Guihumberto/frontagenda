<template>
    <div>
        <v-row>
            <v-col col="12">
                <v-card outlined>
                    <v-card-title class="py-0">Inserir cadastro</v-card-title>
                    <v-form @submit.prevent="insert" ref="form">
                        <v-card-text class="pb-0">
                                <v-text-field
                                    label="Name"
                                    placeholder="Digite seu nome completo."
                                    outlined dense
                                    v-model.trim="employee.name"
                                    :rules="[rules.required, rules.mincaracter]"
                                ></v-text-field>
                                <v-row class="mb-0">
                                    <v-col>
                                        <v-text-field
                                            label="email"
                                            placeholder="exemplo@sefaz.ma.gov.br"
                                            outlined dense
                                            v-model.trim="employee.email"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col>
                                        <v-text-field
                                            label="Celular"
                                            placeholder="(98)98888-0000"
                                            v-mask="'(##)#####-####'"
                                            outlined dense
                                            v-model.trim="employee.cellphone"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col>
                                        <v-autocomplete
                                            label="Ramal"
                                            outlined dense
                                            :items="listPhone"
                                            item-text="phone"
                                            item-value="id"
                                            v-model="employee.phoneId"
                                            :rules="[rules.required]"
                                            clearable
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col>
                                        <v-autocomplete
                                            label="Setor"
                                            outlined dense
                                            :items="listSector"
                                            item-text="name"
                                            item-value="id"
                                            v-model="employee.sectorId"
                                            :rules="[rules.required]"
                                            clearable
                                        ></v-autocomplete>
                                    </v-col>
                                </v-row>
                                <v-row class="mt-0">
                                    <v-col class="d-flex">
                                        <v-checkbox
                                            label="Ramal na mesa"
                                            class="mr-2"
                                            v-model="employee.phoneTable"
                                        ></v-checkbox>
                                        <v-checkbox
                                            label="Whatsapp"
                                            v-model="employee.wtzp"
                                        ></v-checkbox>
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
                employee: {
                    name: '',
                    email: null, 
                    cellphone: null,
                    wtzp: true,
                    phoneTable: true,
                    phoneId: null,
                    sectorId: null,
                },
                rules:{
                    required: (value) => !!value || "Campo obrigatório",
                    mincaracter: (v) => (v||'').length >= 5 || "Mínimo de 05 caracteres",
                },
            }
        },
        computed:{
            list(){
                return this.$store.getters.readEmployee
            },
            listPhone(){
                return this.$store.getters.readPhone
            },
            listSector(){
                return this.$store.getters.readSector
            },
        },
        methods:{
            ...mapActions(['insertEmployee', 'cargaEmployee', 'cargaPhone', 'cargaSector']),
            insert(){
                if(this.$refs.form.validate()){
                    if(!this.Islist(this.employee)){
                        this.insertEmployee(this.employee);
                        this.$store.dispatch("snackbars/setSnackbars", {text:'Registro salvo', color:'success'})
                        this.clearEmployee()
                    } else {
                        this.$store.dispatch("snackbars/setSnackbars", {text:'Registro já cadastrado', color:'error'})
                    }
                }
            },
            clearEmployee(){
                this.employee = {
                            name: null,
                            email: null, 
                            cellphone: null,
                            wtzp: true,
                            phoneTable: true,
                            phoneId: null,
                            sectorId: null,
                        }
            },
            Islist(item){
                let find = this.list.filter(x => x.name == item.name)
                if(find.length){
                    return true
                } else {
                    return false
                }
            }
        },
        created(){
            this.cargaEmployee()
            this.cargaSector()
            this.cargaPhone()
        }
    }
</script>

<style scoped>

</style>