import {reqUserAddress,reqOrderInfo} from '@/api'
const state={
    userAddress:[],
    orderInfo:{}
}
const mutations={
    GETUSERADDRESS(state,userAddress){
        state.userAddress=userAddress
    },
    GETORDERINFO(state,orderInfo){
        state.orderInfo=orderInfo
    }
}
const actions={
    async getUserAddress({commit}){
        let result = await reqUserAddress()
        if(result.code==200){
            commit('GETUSERADDRESS',result.data)
            return 'ok'
        }else{
            return Promise(new Error('获取用户地址失败'))
        }
    },
    async getOrderInfo({commit}){
        let result = await reqOrderInfo()
        if(result.code==200){
            commit('GETORDERINFO',result.data)
            return 'ok'
        }else{
            return Promise(new Error('获取订单列表失败'))
        }
    }
}
const getters={
    detailArrayList(state){
        return state.orderInfo.detailArrayList||[]
        
    }
}
export default{
    state,
    mutations,
    actions,getters
}