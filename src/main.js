import Vue from 'vue'
import App from './App.vue'
import router from './router';
import TypeNav from '@/components/TypeNav'
//引入仓库
import store from './store'
import ElementUI from 'element-ui';
import VueLazyload from 'vue-lazyload';
import myPlugins from '@/plugings/myPlugins'
import Pagination from '@/components/Pagination'
import 'element-ui/lib/theme-chalk/index.css';
import loadImage from '@/assets/loading.gif';
import * as API from '@/api'
//引入mock
import '@/mock/mockServe'

//注册两个全局组件:Header、Footer,全局组件写法【定义一次,可以直接在任意地方使用】
//Vue.component(组件的名字,组件)
Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name,Pagination)
Vue.use(ElementUI);
Vue.use(VueLazyload,{
  loading:loadImage//加载时候的图片
});//配置对象
Vue.use(myPlugins,{
  name:'cxy'
})
Vue.prototype.$msgbox = ElementUI.MessageBox;
Vue.prototype.$alert = ElementUI.MessageBox.alert;
Vue.config.productionTip = false

new Vue({
  store,
  router,
  beforeCreate(){
    Vue.prototype.$bus=this
    Vue.prototype.$API=API
  },
  render: h => h(App),
}).$mount('#app')
