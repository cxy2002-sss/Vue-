<template>
  <div>
    <TypeNav />
    <!--列表-->
    <ListContainer />
    <!--今日推荐-->
    <TodayRecommend />
    <!-- 商品排行 -->
    <Rank />
    <!-- 猜你喜欢 -->
    <Like />
    <!--楼层-->
    <Floor v-for="(item,index) in floorList" :key="item.id" :list="item"/><!--:list是用于props父子通信中的-->
    <!--商标-->
    <Brand />
  </div>
</template>

<script>
  import Brand from './Brand/Brand'
  import Floor from './Floor/Floor'
  import Like from './Like/Like'
  import ListContainer from './ListContainer/ListContainer'
  import Rank from './Rank/Rank'
  import { mapState } from 'vuex'
  import TodayRecommend from './TodayRecommend/TodayRecommend'
  export default {
    name: 'Home',
    components: {
      Brand,
      Floor,
      Like,
      ListContainer,
      Rank,
      TodayRecommend,
    },
    mounted(){
      //
        //第一种方法，去派发action
        //this.$store.dispatch("add")
        //第二种方法，直接提交
        //this.$store.commit("ADD")
    this.$store.dispatch("floorList")

    
    //获取用户信息在首页展示
  },
  computed: {
      ...mapState({
        floorList:state=>state.home.floorList
      })
    }
  }
</script>

<style lang="less" scoped>

</style>