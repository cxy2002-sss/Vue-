import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter)

const routes=[
  //()=>import('@/pages/Home')这个方法实现懒加载，只有当访问该页面的时候才会进行加载
    {path:'/home',name:'home',component:()=>import('@/pages/Home'),meta:{show:true}},//meta路由元信息
    {path:'/register',name:"register",component:()=>import('@/pages/Register')},
    {path:'/search/:keyword?',name:"search",component:()=>import('@/pages/search'),meta:{show:true}},
    {path:'/login',name:"login",component:()=>import('@/pages/Login')},
    {path:'/detail/:skuid?',name:"detail",component:()=>import('@/pages/Detail'),meta:{show:true}},
    {path:'/shopcart',name:"shopcart",component:()=>import('@/pages/ShopCart'),meta:{show:true}},
    {path:'/addcartsuccess',name:"addcartsuccess",component:()=>import('@/pages/AddCartSuccess'),meta:{show:true},
      beforeEnter:(to,from,next)=>{
        if(from.path.indexOf('/detail')!=-1){
          next()
        }else{
          next(false)
        }
      }
    },
    {path:'/trade',name:"trade",component:()=>import('@/pages/Trade'),meta:{show:true},
    //路由独享守卫
      beforeEnter:(to,from,next)=>{
        console.log(from.path)
        if(from.path=='/shopcart'){
          next()
        }else{
          //返回上一级
          next(false)
        }
      }
    },
    {path:'/pay',name:"pay",component:()=>import('@/pages/Pay'),meta:{show:true},
      beforeEnter:(to,from,next)=>{
        if(from.path=='/trade'){
          next()
        }else{
          next(false)
        }
      }
    },
    {path:'/paySuccess',name:"paySucess",component:()=>import('@/pages/PaySuccess'),meta:{show:true}},
    {
      path:'/center',name:"center",component:()=>import('@/pages/Center'),meta:{show:true},

      children:[
        {
          path:'myOrder',
          component:()=>import('@/pages/Center/myOrder')
        },
        {
          path:'groupOrder',
          component:()=>import('@/pages/Center/groupOrder')
        },
        {
          path:'/center',
          redirect:'/center/myOrder'//redirect重定向
        }
      ]
     },
    {path:'/',redirect:"/home"}
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
let router = new VueRouter({
    routes, // (缩写) 相当于 routes: routes
    scrollBehavior(to, from, savedPosition) {//scrollBehavior滚动行为
      //y:0表示滚动条在最上方
      return {y:0}
    },
  });
router.beforeEach(async(to,from,next)=>{
  //to:你要跳转的路由信息
  //from:你从那个路由跳转的信息
  //next:放行  next()直接放行  next('/login')放行至login路由
  
  let token= store.state.user.token
  //用户信息
  let name=store.state.user.userInfo.name
  if(token){
    if(to.path=='/login'||to.path=='/register'){
      next('/')
    }else{
      //如果用户名有则放行，没有用户信息则派发actions
      if(name){
        next()
      }else{
        try {
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          //token失效
          await store.dispatch('Logout')
          next('/login')
        }
      }
    }
  }else{
    //未登录不可以去交易相关的，不能去支付相关的，不能去订单
    let toPath=to.path
    //就是说这些路径当中不能有这些字符串
    if(toPath.indexOf('/trade')!=-1||toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
      next('/login?rediect='+toPath)
    }else{
      next()
    }
      
  }
})
export default router