import { reqGoodsInfo, reqAddorUpdateShopCar } from "@/api/index"
import { getUUID } from '@/utils/uuid_token'
const state = {
    goodsList: {},
    // 游客临时身份,再加入购物车的时候就需要把这个参数也传过去
    uuid_token: getUUID()

}
const mutations = {
    GoodsInfo(state, goodsInfo) {
        state.goodsList = goodsInfo
    }
}
const actions = {
    async getGoodsInfo(context, params) {
        // params 是用户派发action的时候，第二传参
        // console.log(params);
        let result = await reqGoodsInfo(params)
        // console.log(result.data);
        if (result.code == 200) {
            context.commit('GoodsInfo', result.data)
        }
    },
    async getShopCar(content, { skuId, skuNum }) {
        let result = await reqAddorUpdateShopCar(skuId, skuNum)
        // console.log(result);
        // 没有返回数据，但是detail需要知道请求是否成功
        // 当前这个函数返回的是promise,可以利用，而不需要在仓库中添加值
        if (result.code == 200)
            return "ok"
        else
            return Promise.reject(new Error('fail'))
    }
}
// 计算属性，在项目中是为了简化数据而生
//可以把数据简化，方便获取数据
const getters = {
    categoryView(state) {
        //刷新的时候会假报错，因为一开始的goodsList是空，那么这个值就是undefined，只有数据返回才有值
        return state.goodsList.categoryView || {}
    },
    skuInfo(state) {
        return state.goodsList.skuInfo || {}
    },
    skuSaleAttrValueList(state) {
        if (state.goodsList.skuInfo) //这里会报警
            return state.goodsList.skuInfo.skuSaleAttrValueList || []
        else return []
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}