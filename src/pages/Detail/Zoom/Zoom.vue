<template>
  <div class="spec-preview">
    <img :src="imgUrl" />
    <div class="event" @mousemove="mouseMove"></div>
    <div class="big">
      <img :src="imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: 'Zoom',
  data() {
    return {
      currentImgIndex: 0
    }
  },
  props: ['imglist'],
  methods: {
    mouseMove(e) {
      let left = e.offsetX - this.$refs.mask.offsetWidth / 2
      let top = e.offsetY - this.$refs.mask.offsetHeight / 2
      if (left <= 0) left = 0
      if (left > this.$refs.mask.offsetWidth) left = this.$refs.mask.offsetWidth
      if (top <= 0) top = 0
      if (top > this.$refs.mask.offsetWidth) top = this.$refs.mask.offsetWidth

      this.$refs.mask.style.left = left + 'px'
      this.$refs.mask.style.top = top + 'px'

      this.$refs.big.style.left = -left * 2 + 'px'
      this.$refs.big.style.top = -top * 2 + 'px'
    }
  },
  computed: {
    imgUrl() {
      // 1 防止数据还没回来，父组件给的是undefine
      return this.imglist ? this.imglist[this.currentImgIndex].imgUrl : []
    }
  },
  mounted() {
    this.$bus.$on('imgIndexChange', (index) => {
      // 不知道为啥会触发两次
      this.currentImgIndex = index
    })
  }
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
