//当前的所有api统一管理
import requests from './request'
import mockRequest from './mockAjax'
//三级联动的接口
//请求地址
export const reqCategoryList=()=>{
    //发请求
   return requests({url:'/product/getBaseCategoryList',method:'get'})
}
export const reqSearchInfo=(params)=>{
    return requests({url:'/list',method:'post',data:params})
}
export const reqGoodsList=(skuid)=>{
    return requests({url:`/item/${skuid}`,method:'get'})
}
export const reqCartSuccess=(skuId,skuNum)=>{
    return requests({url:`/cart/addToCart/${ skuId }/${ skuNum }`,method:'post'})
}
export const reqCartList=()=>{
    return requests({url:'/cart/cartList',method:'get'})
}
export const reqDeleteCart=(skuId)=>{
    return requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})
}
export const reqCheckCart=(skuId,isChecked)=>{
    return requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})
}
export const reqUserLogin=(params)=>{
    return requests({url:'/user/passport/login',method:'post',data:params})
}
export const reqUserRegister=(params)=>{
    return requests({url:'/user/passport/register',method:'post',data:params})
}
export const reqGetCode=(phone)=>{
    return requests({url:`/user/passport/sendCode/${phone}`,method:'get'})
}
export const reqUserInfo=()=>{
    return requests({url:'/user/passport/auth/getUserInfo',method:'get'})
}
export const reqLogout=()=>{
    return requests({url:'/user/passport/logout',method:'get'})
}
export const reqUserAddress=()=>{
    return requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})
}
export const reqOrderInfo=()=>{
    return requests({url:'/order/auth/trade',method:'get'})
}
export const reqSubmitOrder=(tradeNo,data)=>{
    return requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:'post',data:data})
}
export const reqPayInfo=(orderId)=>{
    return requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})
}
export const reqPayStatus=(orderId)=>{
    return requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})
}
export const reqMyOrderInfo=(page,limit)=>{
    return requests({url:`/order/auth/${page}/${limit}`,method:'get'})
}
export const reqGetBannerList=()=>{
    //发请求
   return mockRequest({url:'/banner',method:'get'})
}
export const reqGetFloorList=()=>{
    //发请求
   return mockRequest({url:'/floor',method:'get'})
}

