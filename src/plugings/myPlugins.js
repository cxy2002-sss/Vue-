//自定义指令
//先定义一个对象
let myPlugins={}
//必须使用一个install
myPlugins.install=function(Vue,options){
    //diretive就是执行一个自定义指令，参数第一个为v-name，第二个为方法
    //方法当中第一个参数是使用这个指令的标签，第二个是这个指令的对象
    Vue.directive(options.name,(element,item)=>{
        element.innerHTML=item.value.toUpperCase()
    })
}
export default myPlugins