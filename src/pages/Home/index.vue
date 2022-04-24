<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommand></Recommand>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="item in floorsList" :key="item.id" :list="item"></Floor>
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
    ...mapState('home', ['floorsList'])
  },
  mounted() {
    this.$store.dispatch('home/getFloors')
  }
}
</script>

<style></style>
