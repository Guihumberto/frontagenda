export const strict = false

export const state = () => ({
    listAgenda: [],
    listPhone: [],
    listLocalization: [],
    listSector:[],
    listEmployee:[],
    sizeAgenda: 100
})

export const getters = {
    readSizeAgenda(state){
        return state.sizeAgenda
    },
    readAgenda(state){
        return state.listAgenda
    },
    readPhone(state){
        return state.listPhone
    },
    readLocal(state){
        return state.listLocalization
    },
    readSector(state){
        return state.listSector
    },
    readEmployee(state){
        return state.listEmployee
    }
}

export const mutations = {
    setSizeAgenda(state, payload){
        state.sizeAgenda = payload
    },
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
        const x = state.listPhone.map(item => item.id == payload.id ? payload : item)
        state.listPhone = x
    },
    removePhone(state, payload){
        state.listPhone = state.listPhone.filter(x => x.id != payload)
    },
    setLocal(state, payload){
        state.listLocalization = payload
    },
    saveLocal(state, payload){
        state.listLocalization.push(payload)
    },
    editLocal(state, payload){
        const x = state.listLocalization.map(item => item.id == payload.id ? payload : item)
        state.listLocalization = x
    },
    removeLocal(state, payload){
        state.listLocalization = state.listLocalization.filter(x => x.id != payload)
    },
    setSector(state, payload){
        state.listSector = payload
    },
    saveSector(state, payload){
        state.listSector.push(payload)
    },   
    editSector(state, payload){
        const x = state.listPhone.map(item => item.id == payload.id ? payload : item)
        state.listSector = x
    },
    removeSector(state, payload){
        state.listSector = state.listSector.filter(x => x.id != payload)
    },
    setEmployee(state, payload){
        state.listEmployee = payload
    },
    saveEmployee(state, payload){
        state.listEmployee.push(payload)
    },  
    editEmployee(state, payload){
        const x = state.listPhone.map(item => item.id == payload.id ? payload : item)
        state.listEmployee = x
    },
    removeEmployee(state, payload){
        state.listEmployee = state.listEmployee.filter(x => x.id != payload)
    },
}

export const actions = {
    alterSizeAgenda({commit}, num){
        commit('setSizeAgenda', num)
    },
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
        try {
            await this.$axios.$put(`phone/${phone.id}`, phone).then((response) => {
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
    async cargaLocal({commit}){
        try {
            await this.$axios.$get('localization').then((response) => {
                commit('setLocal', response)
            })
        } catch (error) {
            console.log(error)
        }
    },
    async insertLocal({commit}, local){
        try {
            await this.$axios.$post('localization', local).then((response) => {
                commit('saveLocal', response)
            })
        } catch (error) {
            console.log(error)
        }
    },
    async editSetLocal({commit}, local){
        try {
            await this.$axios.$put(`localization/${local.id}`, local).then((response) => {
                commit('editLocal', local)
            })
        } catch (error) {
            console.log(error)
        }
    },
    async removeLocal({commit}, local){
        const data = {
            id: local
        }
        try {
            await this.$axios.$delete(`localization/${local}`, data).then((response) => {
                commit('removeLocal', local)
            })
        } catch (error) {
            console.log(error)
        }
    },
    async cargaSector({commit}){
        try {
            await this.$axios.$get('sector').then((response) => {
                commit('setSector', response)
            })
        } catch (error) {
            console.log(error)
        }
    },
    async insertSector({commit}, sector){
        const data = {
            name: sector.name,
            localization: {
                id: sector.local
              }
        }
        try {
            await this.$axios.$post('sector', data).then((response) => {
                commit('saveSector', response)
            })
        } catch (error) {
            console.log(error)
        }
    },
    async editSetSector({commit}, phone){
        try {
            await this.$axios.$put(`sector/${phone.id}`, phone).then((response) => {
                commit('editSector', phone)
            })
        } catch (error) {
            console.log(error)
        }
    },
    async removeSector({commit}, sector){
        const data = {
            id: sector
        }
        try {
            await this.$axios.$delete(`sector/${sector}`, data).then((response) => {
                commit('removeSector', sector)
            })
        } catch (error) {
            console.log(error)
        }
    },
    async cargaEmployee({commit}){
        try {
            await this.$axios.$get('employee').then((response) => {
                commit('setEmployee', response)
            })
        } catch (error) {
            console.log(error)
        }
    },
    async insertEmployee({commit}, employee){
        const data = {
            name: employee.name,
            email: employee.email,
            cellphone: employee.cellphone,
            wtzp: employee.wtzp,
            phoneTable: employee.phoneTable,
            phone: {
                id: employee.phoneId,
            },
            sector: {
                id: employee.sectorId,
                localization:{
                    id: 1
                }
            }
        }
        try {
            await this.$axios.$post('employee', employee).then((response) => {
                commit('saveEmployee', data)
            })
        } catch (error) {
            console.log(error)
        }
    },
    async editSetEmployee({commit}, employee){
        const data = {
            name: employee.name,
            email: employee.email,
            cellphone: employee.cellphone,
            wtzp: employee.wtzp,
            phoneTable: employee.phoneTable,
            phoneId: employee.phone.id,
            sectorId: employee.sector.id
        }
        try {
            await this.$axios.$put(`employee/${employee.id}`, data).then((response) => {
                commit('editEmployee', employee)
            })
        } catch (error) {
            console.log(error)
        }
    },
    async removeEmployee({commit}, sector){
        const data = {
            id: sector
        }
        try {
            await this.$axios.$delete(`employee/${sector}`, data).then((response) => {
                commit('removeEmployee', sector)
            })
        } catch (error) {
            console.log(error)
        }
    },
}