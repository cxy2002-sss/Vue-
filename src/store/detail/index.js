//detail模块小仓库
import { reqGoodsList,reqCartSuccess } from "@/api";
import { getUUID } from "@/utils/uuid_token";
const state={
    goodsInfo:{},
    uuid_token:getUUID()//这里我们调用了一次utils/uuid_token里面的getUUID的方法，用于获取商品详情
};
const mutations={
    GETGOODSINFO(state,goodsInfo){
        state.goodsInfo=goodsInfo
    },
    UUID_TOKEN(state){
        state.uuid_token=''
    },
    setUUID_TOKEN(){
        state.uuid_token=getUUID()
    }
};
const actions={
    async getGoodsInfo({commit},skuid){
        let result = await reqGoodsList(skuid);
        if(result.code==200){
            commit('GETGOODSINFO',result.data)
        }
    },
    async getCartSuccess({commit},{skuId,skuNum}){
        let result=await reqCartSuccess(skuId,skuNum);
        //async返回的是一个promise，要么失败要么成功
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters={
    //简化数据
    categoryView(state){
        return state.goodsInfo.categoryView||{}
    },
    skuInfo(state){
        return state.goodsInfo.skuInfo||{}
    },
    spuSaleAttrList(state){
        return state.goodsInfo.spuSaleAttrList||[]
    }
};
export default{
    state,
    mutations,
    actions,
    getters
}