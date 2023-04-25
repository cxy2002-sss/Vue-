<template>
  <div name="app">
    <header>
      <Header></Header>
    </header>
    <router-view></router-view>
    <!-- 在Home,Search显示，在登录和注册中隐藏 -->
    <footer>
      <!-- 通过路由的元信息meta进行判断 -->
      <Footer v-show="$route.meta.show"></Footer>
    </footer>
    
  </div>
</template>

<script>
import Header from '@/components/Herder/index.vue'
import Footer from '@/components/Footer/index.vue'
export default {
  data () {
    return {
      msg:'aabb'
    }
  },
  components: {
    Header,
    Footer,
  },
  mounted() {
    this.$store.dispatch("categoryList");
    //获取用户信息\
  },
  methods: {

  },
}

</script>
<style>
</style>