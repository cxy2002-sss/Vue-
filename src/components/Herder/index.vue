<template>
    <div>
      <header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
          <div class="container">
            <div class="loginList">
              <p>尚奇妙屋欢迎您！</p>
              <!-- 没有登录：显示登录与注册 -->
              <p v-if="!this.userInfo.loginName">

                <span>请</span>
                <!-- <a href="###">登录</a> -->
                <!-- 
                  声明式导航,当然你也可以使用编程式导航,因为不管是那个导航，都可以实现路由跳转，
                  但是最后为什么选择声明式导航，没有任何业务、逻辑
                 -->
                <router-link to="/login" >登入</router-link>
                <router-link class="register" to="/register">免费注册</router-link>
              </p>
              <p v-else> 
                <span>您好，</span>
                <a>{{ this.userInfo.loginName }}</a>
                  <a class="register" @click="logout">退出登录</a>
              </p>
              <!-- 如果登录显示的是用户名字与退出登录 -->
              
            </div>
            <div class="typeList">
              <router-link to="/center/myOrder">我的订单</router-link>
              <router-link to="/shopcart">我的购物车</router-link>
              <a href="###">我的奇妙屋</a>
              <a href="###">奇妙屋会员</a>
              <a href="###">企业采购</a>
              <a href="###">关注奇妙屋</a>
              <a href="###">合作招商</a>
              <a href="###">商家后台</a>
            </div>
          </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
          <h1 class="logoArea">
            <router-link class="logo" to="/home">
              <img src="./images/logo.png" alt="" />
            </router-link>
          </h1>
          <div class="searchArea">
            <form action="###" class="searchForm">
              <input
                v-model="keyword"
                type="text"
                id="autocomplete"
                class="input-error input-xxlarge"
              />
              <!-- 编程式导航:因为有业务 -->
              <button
                class="sui-btn btn-xlarge btn-danger"
                type="button"
                @click="goSearch"
              >
                搜索
              </button>
            </form>
          </div>
        </div>
      </header>
    </div>
  </template>
  
  <script>
  import { all } from 'axios';
import { mapState } from 'vuex';
  export default {
    //给组件起一个名字,开发者工具中显示这个组件的时候，显示的就是这个名字
    name: "Header",
    data() {
      return {
        //收集用户输入的关键字
        keyword: "",
      };
    },
    methods: {
      goSearch(){
        let location={name:'search',params:{keyword:this.keyword||undefined}};
        if(this.$route.query){
          location.query=this.$route.query
        }
        this.$router.push(location)
      },
      async logout(){
        try {
          await this.$store.dispatch('Logout')
          this.$router.push({name:'home'})
          if(!localStorage.getItem('TOKEN')){
            this.$store.commit('setUUID_TOKEN') 
          }
        } catch (error) {
          alert(error.message)
        }
        
      }
        
    },
    mounted() {
      //清除关键字
      this.$bus.$on('clear',()=>{
        this.keyword=""
      })
    },
    computed:{
      ...mapState({
        userInfo:state=>state.user.userInfo
      })
    }
}
  </script>
  
  <style scoped lang="less">
  .header {
    & > .top {
      background-color: #eaeaea;
      height: 30px;
      line-height: 30px;
  
      .container {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;
  
        .loginList {
          float: left;
  
          p {
            float: left;
            margin-right: 10px;
  
            .register {
              border-left: 1px solid #b3aeae;
              padding: 0 5px;
              margin-left: 5px;
            }
          }
        }
  
        .typeList {
          float: right;
  
          a {
            padding: 0 10px;
  
            & + a {
              border-left: 1px solid #b3aeae;
            }
          }
        }
      }
    }
  
    & > .bottom {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;
  
      .logoArea {
        float: left;
  
        .logo {
          img {
            width: 175px;
            margin: 25px 45px;
          }
        }
      }
  
      .searchArea {
        float: right;
        margin-top: 35px;
  
        .searchForm {
          overflow: hidden;
  
          input {
            box-sizing: border-box;
            width: 490px;
            height: 32px;
            padding: 0px 4px;
            border: 2px solid #ea4a36;
            float: left;
  
            &:focus {
              outline: none;
            }
          }
  
          button {
            height: 32px;
            width: 68px;
            background-color: #ea4a36;
            border: none;
            color: #fff;
            float: left;
            cursor: pointer;
  
            &:focus {
              outline: none;
            }
          }
        }
      }
    }
  }
  </style>
  