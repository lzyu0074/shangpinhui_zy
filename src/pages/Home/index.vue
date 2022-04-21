<template>
  <div>
    <h1>{{ count }}</h1>
    <button @click="add">1111111</button>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommand></Recommand>
    <Rank></Rank>
    <Like></Like>
    <Floor></Floor>
    <Floor></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from './ListContainer'
import Recommand from './Recommand'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'

// 测试
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    ListContainer,
    Recommand,
    Rank,
    Like,
    Floor,
    Brand
  },
  computed: {
    ...mapState('home', ['count'])
  },
  methods: {
    add() {
      this.$store.commit('home/ADD', this.count + 1)
    }
  }
}
</script>

<style></style>
