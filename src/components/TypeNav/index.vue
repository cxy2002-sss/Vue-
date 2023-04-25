<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex()" @mouseenter="enterShow">
        <h2 class="all" >全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="goSearch" >
            <div class="item bo" v-for="(item,index) in categoryList" :key="item.categoryId" :class="{cur:currentIndex==index}">
              <h3 @mouseenter="changeindex(index)" >
                <!-- :data-categoryName="item.categoryName "设置自定义属性 -->
                <a  :data-categoryName="item.categoryName " :data-category1Id="item.categoryId">{{ item.categoryName }}</a>
              </h3>
              <div class="item-list clearfix" :style="{display:currentIndex==index ? 'block':'none'}">
                <div class="subitem"  v-for="(item2,index) in item.categoryChild" :key="item2.categoryId">
                  <dl class="fore">
                    <dt>
                      <a :data-categoryName="item2.categoryName " :data-category2Id="item2.categoryId">{{item2.categoryName}}</a>
                    </dt>
                    <dd>
                      <em  v-for="(item3,index) in item2.categoryChild" :key="item3.categoryId">
                        <a :data-categoryName="item3.categoryName " :data-category3Id="item3.categoryId">{{ item3.categoryName }}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">奇妙屋超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import throttle from 'lodash/throttle'
export default {
  name: 'TypeNav',
  data(){
    return{
      currentIndex:-1,
      show:true
    }
  },
  //组件挂载完毕:可以向服务器发起请求
  mounted(){
    //通知vuex发请求,获取数据，存储在仓库中
    //我们可以将这个请求放在根组件中App.vue的mouted中，这样就只用执行一次
    //this.$store.dispatch("categoryList");
    if(this.$route.path!=='/home'){
      this.show=false
    }else{
      this.show=true
    }
  },
  methods:{
    enterShow(){
      //鼠标移入的时候将商品列表进行展示
      if(this.$route.path!=='/home')this.show=true
    },
    changeindex:throttle(function(index){//节流
        this.currentIndex=index
      },50),
    leaveIndex(){
      this.currentIndex=-1
      if(this.$route.path!=='/home')this.show=false
    },
    goSearch(event){
      let element = event.target//获取节点
      let {categoryname,category1id,category2id,category3id}=element.dataset//dataset获取这个节点的自定义属性
      if(categoryname){
        let location={name:'search'}
        let query={categoryName:categoryname}
        if(category1id){
          query.category1Id=category1id
        }else if(category2id){
          query.category2Id=category2id
        }else{
          query.category3Id=category3id
        }
        //整理参数，将query添加到location上面
        if(this.$route.params){
          location.params=this.$route.params
          location.query=query
          this.$router.push(location)
        }
      }
     

      //this.$router.push('/search')//最好的解决方法就是编程式导航和事件委派
      //事件委派会出现的问题：1.点击的一定是a标签，2.如何获取参数

  }

  },
  computed:{
    ...mapState({
      categoryList:state=>state.home.categoryList
    })
  }
}
</script>

<style  lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur{
          background: skyblue;
        }
      }
    }
    //过渡开始
    .sort-enter{
      opacity: 0;
    }
    //过渡结束
    .sort-enter-to{
      opacity: 1;
    }
    
    .sort-enter-active{
      transition: opacity 1s ease;
    }
  }
}
</style>
