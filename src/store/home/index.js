//home模块小仓库
import {reqCategoryList,reqGetBannerList,reqGetFloorList} from "@/api";
const state={
    categoryList:[],
    bannerList:[],
    floorList:[]
};
const mutations={
    CATEGORYLIST(state,categoryList){
        //成功后我们接收请求回来的数据让他等于共享中的数据
        state.categoryList=categoryList
    },
    BANNERLIST(state,bannerList){
        state.bannerList=bannerList
    },
    FLOORLIST(state,floorList){
        state.floorList=floorList
    }
};
const actions={
    async categoryList({commit}){
        let result= await reqCategoryList();
        //如果我们成功，则提交数据
        if(result.code==200){
            commit("CATEGORYLIST",result.data)
        }
    },
    async bannerList({commit}){
        let result= await reqGetBannerList();
        //如果我们成功，则提交数据
        if(result.code==200){
            commit("BANNERLIST",result.data)
        }
    },
    async floorList({commit}){
        let result= await reqGetFloorList();
        //如果我们成功，则提交数据
        if(result.code==200){
            commit("FLOORLIST",result.data)
        }
    }
};

const getters={};
export default{
    state,
    mutations,
    actions,
    getters
}