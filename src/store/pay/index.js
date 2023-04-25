import {reqSubmitOrder,reqPayInfo} from '@/api'
const state={
    orderId:'',
    payInfo:{}
}
const mutations={
    GETSUBMITORDER(state,orderId){
        state.orderId=orderId
    },
    GETPAYINFO(state,payInfo){
        state.payInfo=payInfo
    }
}
const actions={
    async getSubmitOrder({commit},{tradeNo,data}){
        let result=await reqSubmitOrder(tradeNo,data)
        console.log(result)
        if(result.code==200){
            commit('GETSUBMITORDER',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('提交失败'))
        }
    },
    async getPayInfo({commit},orderId){
        let result=await reqPayInfo(orderId)
        if(result.code==200){
            commit('GETPAYINFO',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('提交失败'))
        }
    }
}
const getters={}
export default{
    state,
    mutations,
    actions,
    getters
}