<template>
    <v-card outlined>
        <v-form @submit.prevent="insert" ref="form">
            <v-card-text class="pb-0">
                    <v-text-field
                        label="Ramal"
                        placeholder="Insira o número do ramal"
                        outlined dense
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
        {{phone}}
    </v-card>
</template>

<script>
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
        methods:{
            insert(){
                if(this.$refs.form.validate()){
                    console.log(this.phone);
                }
            }
        }
    }
</script>

<style scoped>

</style>