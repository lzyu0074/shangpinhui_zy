<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.footerShow"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header/index.vue'
import Footer from '@/components/Footer/index.vue'
export default {
  name: 'MyApp',
  components: {
    Header,
    Footer
  },
  // 派发一个action，获取菜单数据
  created() {
    this.$store.dispatch('home/initCategoryList')
  }
}
</script>

<style></style>
