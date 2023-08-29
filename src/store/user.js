// 登陆与注册模块
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from "@/api/index"
const state = {
    code: '',
    // 这样刷新的时候，也能获取到token
    userToken: localStorage.getItem("TOKEN"),
    userInfo: {}
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.userToken = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    CLEAR(state) {
        // 清空用户中的相关信息
        state.userInfo = {}
        state.userToken = ''
        localStorage.removeItem("TOKEN")
    }
}
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        console.log(result);
        if (result.code == 200) {
            commit("GETCODE", result.data)
            return "ok"
        } else return Promise.reject(new Error("fail"))
    },
    // 用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        console.log(result);
        if (result.code == 200) {
            return "ok"
        } else return Promise.reject(new Error("fail"))
    },

    // 用户登录
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        // 服务器下发token，将来通过token找服务器要用户信息进行展示
        console.log(result);
        if (result.code == 200) {
            commit("USERLOGIN", result.data.token)
            localStorage.setItem("TOKEN", result.data.token)
            return 'ok'
        } else return Promise.reject(new Error("fail"))
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        console.log(result);
        if (result.code == 200) {
            commit("GETUSERINFO", result.data)
            return 'ok'
        } else return Promise.reject(new Error("fail"))
    },

    async userLogout({ commit }) {
        let result = await reqLogout()
        if (result.code == 200) {
            commit("CLEAR")
            return 'ok'
        } else return Promise.reject(new Error("fail"))

    }

}
const getters = {}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}