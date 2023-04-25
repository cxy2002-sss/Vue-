//detail模块小仓库
import { reqCartList,reqDeleteCart,reqCheckCart } from "@/api";

const state={
    cartList:[],
    

};
const mutations={
    GETCARTLIST(state,cartList){
        state.cartList=cartList
    }
};
const actions={
    async getCartList({commit}){
        let result=await reqCartList();
        if(result.code==200){
            commit('GETCARTLIST',result.data);
        }
    },
    async deteleCart({commit},skuId){
        let result=await reqDeleteCart(skuId);
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    async getCheckCart({commit},{skuId,isChecked}){
        let result = await reqCheckCart(skuId,isChecked)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    deleteAllCheckedCart({dispatch,getters}){
        //context:小仓库
        let PromiseAll=[]
        getters.cartInfoList.forEach(element => {
                //内部还可以调用兄弟方法
            let promise = element.isChecked==1 ? dispatch('deteleCart',element.skuId):''
            //将每一次返回的结果放入数组中
            PromiseAll.push(promise)
        })
        //如果里面的数组都成功则返回的结果成功
        return Promise.all(PromiseAll)
    },
    changeAllChecked({dispatch,getters},isChecked){
        let PromiseAll=[]
        getters.cartInfoList.forEach(element=>{
            let promise=dispatch('getCheckCart',{skuId:element.skuId,isChecked:isChecked})
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    }
};
const getters={
    //简化数据
    cartInfoList(state){
        if(!state.cartList[0]){
            return []
        }else{
            return state.cartList[0].cartInfoList||[]
        }
        
    }
};
export default{
    state,
    mutations,
    actions,
    getters
}