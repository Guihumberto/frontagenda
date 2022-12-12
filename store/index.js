export const strict = false

export const state = () => ({
    listAgenda: [],
    listPhone: []
})

export const getters = {
    readAgenda(state){
        return state.listAgenda
    },
    readPhone(state){
        return state.listPhone
    }
}

export const mutations = {
    setQuestions(state, payload){
        state.listAgenda = payload
    },
    setPhone(state, payload){
        state.listPhone = payload
    },
    savePhone(state, payload){
        console.log(payload);
    }  
}

export const actions = {
    async getAgenda({commit}){
        try {
            await this.$axios.$get('employee').then((response) => {
                commit('setQuestions', response)
            })
        } catch (error) {
            console.log(error)
        }
    },
    async cargaPhone({commit}){
        try {
            await this.$axios.$get('phone').then((response) => {
                commit('setPhone', response)
            })
        } catch (error) {
            console.log(error)
        }
    },
    async insertPhone({commit}, phone){
        try {
            await this.$axios.$get('phone').then((response) => {
                commit('savePhone', response)
            })
        } catch (error) {
            console.log(error)
        }
    }
}