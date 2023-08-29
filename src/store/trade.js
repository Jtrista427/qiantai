import { reqAddressInfo, reqOrderInfo } from '@/api'

const state = {
    address: [],
    orderInfo: {}
}
const mutations = {
    GETUSERADDRESS(state, address) {
        state.address = address
    },
    GETUSERORDER(state, order) {
        state.orderInfo = order
    }
}
const actions = {
    //获取用户地址
    async getUserAddress({ commit }) {
        let result = await reqAddressInfo()
        // console.log(result);
        if (result.code == 200) {
            commit("GETUSERADDRESS", result.data)
        }
    },
    async getUserOrder({ commit }) {
        let result = await reqOrderInfo()
        if (result.code == 200) {
            commit("GETUSERORDER", result.data)
        }

    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}