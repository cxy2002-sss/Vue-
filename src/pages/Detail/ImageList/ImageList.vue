<template>
  <div class="swiper-container">
    <!-- <div class="swiper-wrapper">
      <div class="swiper-button-next"><i class="el-icon-arrow-left"></i></div>
      <div class="swiper-slide" v-for="(item,index) in skuImageList" :key="item.id">
        <img :src="item.imgUrl">
      </div>
      <div class="swiper-button-prev"><i class="el-icon-arrow-right"></i></div>
    </div> -->
    <el-carousel class="swiper-wrapper" type="card" :autoplay="false" trigger="click" height="56px">
      <el-carousel-item class="swiper-slide"  v-for="(item,index) in skuImageList" :key="item.id">
        <img :src="item.imgUrl" @click="changeCurrenrIndex(index)" :class="{active:currentIndex==index}">
      </el-carousel-item>
    </el-carousel>
    
    
    
  </div>
</template>

<script>
  import Swiper from 'swiper'
  export default {
    name: "ImageList",
    props:['skuImageList'],
    data(){
      return{
        currentIndex:0
      }
    },
    methods:{
      changeCurrenrIndex(index){
        this.currentIndex=index
        this.$bus.$emit('getIndex',this.currentIndex)//兄弟之间传递消息用$bus
      }
    }
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 416px;
    box-sizing: border-box;
    .swiper-wrapper{
      .swiper-slide {
      width: 56px;
      height: 56px;
      display: inline-block;
      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;
        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        &:hover {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }
    }
    

    .swiper-button-next {
      float: left;
    }

    .swiper-button-prev {
      float: right;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      display: inline-block;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>