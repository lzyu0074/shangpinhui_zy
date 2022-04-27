<template>
  <div class="pagination">
    <h2>{{ numStartAndEnd }}{{ pageNo }}</h2>
    <button :disabled="pageNo === 1" @click="$emit('pageChange', pageNo - 1)">上一页</button>
    <button v-if="numStartAndEnd.start >= parseInt(continues / 2)" @click="$emit('pageChange', 1)">1</button>
    <button v-if="numStartAndEnd.start > parseInt(continues / 2)">···</button>

    <button v-for="(page, index) in totalPage" :key="index" v-show="page >= numStartAndEnd.start && page <= numStartAndEnd.end" :class="{ active: pageNo === page }" @click="$emit('pageChange', page)">{{ page }}</button>

    <button v-if="numStartAndEnd.end < totalPage - 1">···</button>
    <button v-if="numStartAndEnd.end < totalPage" @click="$emit('pageChange', totalPage)">{{ totalPage }}</button>
    <button :disabled="pageNo === totalPage" @click="$emit('pageChange', pageNo + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    },
    numStartAndEnd() {
      const { pageNo, continues, totalPage } = this
      let start = 0,
        end = 0
      if (totalPage <= continues) {
        start = 1
        end = totalPage
      } else {
        start = pageNo - parseInt(continues / 2)
        end = pageNo + parseInt(continues / 2)
        if (start < 1) {
          start = 1
          end = continues
        }
        if (end > totalPage) {
          start = totalPage - continues + 1
          end = totalPage
        }
      }

      return { start, end }
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
