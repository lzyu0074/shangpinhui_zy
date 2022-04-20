<template>
  <div>
    我是搜索

    <h2>params:-----------{{ $route.params.searchword }}</h2>
    <h2>query:-----------{{ $route.query.k }}</h2>
  </div>
</template>

<script>
export default {
  name: 'Search'
}
</script>

<style></style>
