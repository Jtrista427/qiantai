import { reqShopCartInfo, deleteShopCartInfo, reqUpdateCheckedInfo } from "@/api"
const state = { cartList: [] }
const mutations = {
    GETCARTLIST(content, data) {
        content.cartList = data

    }
}
const actions = {
    async getCartList({ commit }) {
        let result = await reqShopCartInfo()
        // console.log(result);
        if (result.code == 200)
            commit("GETCARTLIST", result.data)
    },
    // 根据Id删除某个产品
    async deleteCartList(store, skuId) {
        let result = await deleteShopCartInfo(skuId)
        // console.log(result);
        if (result.code == 200)
            return "ok"
        else
            return Promise.reject(new Error('fail'))
    },
    // 修改商品的选中状态
    async updateCheckedInfo(store, { skuId, isChecked }) {
        let result = await reqUpdateCheckedInfo(skuId, isChecked)
        if (result.code == 200)
            return "ok"
        else
            return Promise.reject(new Error('fail'))
    },
    // 学习怎么在仓库内调用仓库内的其他方法
    // 删除所有选中的商品
    deleteAllCheckedCart({ dispatch, getters }) {
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            if (item.isChecked == 1) {
                let promise = dispatch('deleteCartList', item.skuId)
                PromiseAll.push(promise)
            }
        });
        // 全部成功才成功
        return Promise.all(PromiseAll)
    },
    updateAllCartChecked({ dispatch, getters }, isChecked) {
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            if (item.isChecked != isChecked) {
                let promise = dispatch('updateCheckedInfo', { skuId: item.skuId, isChecked })
                PromiseAll.push(promise)
            }
        });
        // 全部成功才成功
        return Promise.all(PromiseAll)
    }
}
const getters = {
    // 后台数据设计不合理，简化一下
    cartList(state) {
        return state.cartList[0] || {}
    },

}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}