//home模块的小仓库
import { reqCategoryList, reqGetBannerList, reqGetFloorList } from "@/api"
const state = {
    CategoryList: [],
    BannerList: [],
    FloorList: []
}
const mutations = {
    CATEGORYLIST(state, CategoryList) {
        state.CategoryList = CategoryList
    },
    GetBannerList(state, BannerList) {
        state.BannerList = BannerList
    },
    GetFloorList(state, FloorList) {
        state.FloorList = FloorList
    }
}
const actions = {
    // 通过API接口函数调用，向服务器发送请求
    async categoryList(context) {
        let result = await reqCategoryList()
        // console.log(result);
        if (result.code == 200) {
            context.commit('CATEGORYLIST', result.data)
        }
    },

    async getBannerList(context) {
        let result = await reqGetBannerList()
        // console.log(result);
        if (result.code == 200) {
            context.commit('GetBannerList', result.data)
        }
    },
    async getFloorList(context) {
        let result = await reqGetFloorList()
        // console.log(result);
        if (result.code == 200) {
            context.commit('GetFloorList', result.data)
        }
    },
}
const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}