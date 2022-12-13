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
        state.listPhone.push(payload)
    },   
    editPhone(state, payload){
        console.log(payload)
    },
    removePhone(state, payload){
        state.listPhone = state.listPhone.filter(x => x.id != payload)
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
        const data = {
            phone: phone
        }
        try {
            await this.$axios.$post('phone', data).then((response) => {
                commit('savePhone', response)
            })
        } catch (error) {
            console.log(error)
        }
    },
    async editSetPhone({commit}, phone){
        const data = {
            phone: phone
        }
        try {
            await this.$axios.$put(`phone/${phone}`, data).then((response) => {
                commit('editPhone', phone)
            })
        } catch (error) {
            console.log(error)
        }
    },
    async removePhone({commit}, phone){
        const data = {
            phone: phone
        }
        try {
            await this.$axios.$delete(`phone/${phone}`, data).then((response) => {
                commit('removePhone', phone)
            })
        } catch (error) {
            console.log(error)
        }
    },

}