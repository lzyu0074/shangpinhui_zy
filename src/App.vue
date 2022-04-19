<template>
  <div>
    <my-header></my-header>
    <router-view></router-view>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader from '@/components/my-header/index.vue'
import MyFooter from '@/components/my-footer/index.vue'
export default {
  name: 'MyApp',
  components: {
    MyHeader,
    MyFooter
  }
}
</script>

<style></style>
