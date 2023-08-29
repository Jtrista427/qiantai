import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import user from "./user"
import trade from './trade'

// const mutations = {}
// const actions = {}
// const getters = {}
export default new Vuex.Store({
    // namespaced: true,
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})