import {reqMyOrderInfo} from '@/api'
const state = {
    myOrder:{}
}
const mutations={
    GETMYORDERINFO(state,myOrder){
        state.myOrder=myOrder
    }
}
const actions={
    async getMyOrderInfo({commit},{page,limit}){
        let result = await reqMyOrderInfo(page,limit)
        if(result.code==200){
            commit('GETMYORDERINFO',result.data)
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