import { reqSearchInfo } from "@/api/index"
const state = {
    searchList: {}
}
const mutations = {
    SearchInfo(state, searchInfo) {
        state.searchList = searchInfo
    }
}
const actions = {
    async getSearchList(context, params) {
        // params 是用户派发action的时候，第二传参
        // console.log(params);
        let result = await reqSearchInfo(params)
        console.log(result.data);
        if (result.code == 200) {
            context.commit('SearchInfo', result.data)
        }
    }
}
// 计算属性，在项目中是为了简化数据而生
//可以把数据简化，方便获取数据
const getters = {
    goodsList(state) {
        return state.searchList.goodsList
    },
    trademarkList(state) {
        return state.searchList.trademarkList
    },
    attrsList(state) {
        return state.searchList.attrsList
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}