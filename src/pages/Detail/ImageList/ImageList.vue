<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(img, index) in imglist" :key="img.id" @click="imgClick(index)">
        <img :src="img.imgUrl" :class="{ active: currentImgIndex === index }" />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'ImageList',
  props: ['imglist'],
  data() {
    return {
      currentImgIndex: 0
    }
  },
  methods: {
    imgClick(index) {
      this.currentImgIndex = index
      // 传数据去兄弟组件Zoom
      this.$bus.$emit('imgIndexChange', index)
    }
  },
  mounted() {
    this.$nextTick(() => {
      new Swiper(this.$refs.swiper, {
        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },

        // 如果需要滚动条
        scrollbar: {
          el: '.swiper-scrollbar'
        },
        // 设置slider容器能够同时显示的slides数量(carousel模式)。
        slidesPerView: 3,
        slidesPerGroup: 2
      })
    })
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

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

      // &:hover {
      //   border: 2px solid #f60;
      //   padding: 1px;
      // }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
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
    &::after {
      font-size: 12px;
    }
  }
}
</style>
