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
            @click="$emit('noShowContact'), alter()"
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
            <v-list-item :class="colorModify">
                <v-list-item-icon>
                    <v-icon color="indigo">
                        mdi-cellphone
                    </v-icon>
                </v-list-item-icon>

                
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs}">         
                        <v-list-item-content
                            v-bind="attrs"
                            v-on="on"
                            @click="goWtzp(employee.cellphone)"
                        >
                            <v-list-item-title>{{employee.cellphone ? employee.cellphone : 'Não informado'}}</v-list-item-title>
                            <v-list-item-subtitle>Pessoal</v-list-item-subtitle>
                        </v-list-item-content>
                    </template>
                    <span v-if="employee.wtzp">Clique para acessar o Whatsapp</span>
                    <span v-else>Não há telefone cadastrado</span>
                </v-tooltip>

                <v-list-item-icon v-if="employee.wtzp">
                    <v-icon color="success">mdi-whatsapp</v-icon>
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
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
                <v-list-item-icon>
                    <v-icon color="indigo">
                        mdi-email
                    </v-icon>
                </v-list-item-icon>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-list-item-content
                            v-bind="attrs"
                            v-on="on"
                            @click="copiarEmail(employee.email)"
                        >
                            <v-list-item-title>{{employee.email}}</v-list-item-title>
                            <v-list-item-subtitle>SEFAZ</v-list-item-subtitle>
                        </v-list-item-content>
                    </template>
                    <span>Clique para copiar o email para área de transfeência</span>
                </v-tooltip>
                <v-list-item-icon>
                    <v-btn 
                        icon 
                        href="https://correio.sefaz.ma.gov.br/"
                        target="_blank">
                        <v-icon>mdi-message-text</v-icon>
                    </v-btn>
                </v-list-item-icon>
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
      <v-card-actions>
        <v-alert 
            v-if="cadSucess"
            color="secondary" dark>
            <small v-if="!showCadPhone">
                <p>
                    é o seu contato? 
                    <v-btn 
                        text x-small color="primary" class="mb-1 pa-0"
                        @click="showCadPhone = !showCadPhone"
                    >Clique aqui
                    </v-btn> 
                    <span v-if="!employee.cellphone">
                        para informar seu número
                        de celular.
                    </span> 
                    <span v-else>para atualizar seu número de celular</span>
                </p>
            </small>
            <v-slide-x-transition>
                <div v-if="showCadPhone">
                    <v-subheader class="pa-0">
                        <v-spacer></v-spacer>
                        <v-btn 
                            @click="showCadPhone = !showCadPhone, showNumberCode = true"
                            icon>
                            <v-icon small>mdi-close</v-icon>
                        </v-btn>
                    </v-subheader>
                    <small>informe o número do seu celular, em seguida você receberá uma mensagem de texto.</small>
                    <!-- numero do celular -->
                    <v-form 
                        v-if="showNumberCode"
                        class="mt-2" 
                        @submit.prevent="sendNumberPhone(numPhone)"
                        ref="refNumber"
                    >
                        <v-text-field
                            label="Celular"
                            placeholder="(98)98888-0000"
                            v-mask="'(##)#####-####'"
                            outlined dense
                            v-model="numPhone"
                            :rules="[rules.required, rules.minnum]"
                        ></v-text-field>
                        <v-btn
                            color="primary"
                            type="submit"
                            block
                        >Enviar</v-btn>
                    </v-form>
                    <!-- codigo -->
                    <v-form
                        v-show="!showNumberCode"
                        class="mt-2"
                        @submit.prevent="salvarNumber(code)"
                        ref="refCode"
                    >
                        <v-text-field
                            label="Código"
                            outlined dense
                            v-mask="'####'"
                            v-model="code"
                            placeholder="1234"
                            :rules="[rules.required, rules.mincaracter]"
                        >
                        </v-text-field>
                        <v-btn
                            color="success" block
                            type="submit"
                        >Salvar</v-btn>
                    </v-form>
                </div>
            </v-slide-x-transition>
        </v-alert>
        <v-alert
            v-else
            color="secondary" dark
        >
            <small>Número adicionado ao cadastrado com sucesso.</small>
        </v-alert>
      </v-card-actions>
    </v-card>
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        data(){
            return{
                selectedItem: 1,
                showCadPhone: false,
                numPhone: null,
                showNumberCode: true,
                code: null,
                codeSend: 1234,
                cadSucess: true,
                colorActive: false,
                colorChange: "pink lighten-4",
                rules:{
                    required: (value) => !!value || "Campo obrigatório",
                    mincaracter: (v) => (v||'').length >= 4 || "Deve conter 04 caracteres",
                    minnum: (v) => (v||'').length >= 14 || "Deve conter 11 caracteres",
                },
            }
        },
        props:{
            employee:Object
        },
        computed:{
            colorModify(){
                return this.colorActive
                ? this.colorChange
                : ''
            }
        },
        methods:{
            ...mapActions(['alterSizeAgenda', 'editSetEmployee']),
            alter(){
                setTimeout(() => {
                    this.alterSizeAgenda(100)
                }, 500);
            },
            copiarEmail(text){
                navigator.clipboard.writeText(text);
                this.$store.dispatch("snackbars/setSnackbars", {text:'Email copiado para área de transferência', color:'success'})
            },
            apenasNumeros(string) {
                var numsStr = string.replace(/[^0-9]/g,'');
                return parseInt(numsStr);
            },
            goWtzp(nro){
                if(nro){
                    const urlApi = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent) ? "https://api.whatsapp.com/send" : "https://web.whatsapp.com/send" 
                    const texto = "oi"
                    let phone = `55${this.apenasNumeros(nro)}`
                    window.open(urlApi + "?phone=" + phone + "&text=" + texto, "_blank")
                } else {
                    this.$store.dispatch("snackbars/setSnackbars", {text:'Não há número cadastrado', color:'error'})
                }
            },
            sendNumberPhone(numPhone){
                if(this.$refs.refNumber.validate()){
                    this.showNumberCode = false
                }
            },
            salvarNumber(code){
                if(this.$refs.refCode.validate()){
                    if(code == this.codeSend){
                        this.employee.cellphone = this.numPhone
                        this.editSetEmployee(this.employee)
                        this.cadSucess = false
                        this.colorActive = true
                        setTimeout(()=>{
                            this.colorActive = false
                        }, 1000)
                        this.$store.dispatch("snackbars/setSnackbars", {text:'Número de celular cadastrado', color:'success'})
                    } else {
                        this.$store.dispatch("snackbars/setSnackbars", {text:'Código incorreto', color:'error'})
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>