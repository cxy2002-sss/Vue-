import { reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout } from "@/api"
const state={
    code:'',
    token:localStorage.getItem('TOKEN'),
    userInfo:{}
}
const mutations={
    GETCODE(state,code){
        state.code=code
    },
    USERLOGIN(state,token){
        state.token=token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo=userInfo
    },
    CLEAINFO(state){
        state.token=''
        state.userInfo={}
        localStorage.removeItem('TOKEN')
    }
}
const actions={
    async getCode({commit},phone){
        let result = await reqGetCode(phone)
        if(result.code==200){
            commit('GETCODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    async UserRegister({commit},params){
        let result = await reqUserRegister(params)
        console.log(result)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    async UserLogin({commit},parmas){
        let result = await reqUserLogin(parmas)
        if(result.code==200){
            commit("USERLOGIN",result.data.token)
            localStorage.setItem('TOKEN',result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    async getUserInfo({commit}){
        let result = await reqUserInfo()
        if(result.code==200){
            commit('GETUSERINFO',result.data)
            return 'ok'
        }else{
            Promise.reject(new Error('登入失败'))
        }
    },
    async Logout({commit}){
        let result = await reqLogout()
        if(result.code==200){
            commit('CLEAINFO')
            return 'ok'
        }else{
            Promise.reject(new Error('退出失败'))
        }
    },

}
const getters={}
export default{
    state,
    mutations,
    actions,
    getters
}