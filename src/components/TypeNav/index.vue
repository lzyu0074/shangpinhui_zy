<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="removeBgcAndHideSort" @mouseenter="showSort">
        <h2 class="all">全部商品分类</h2>
        <!-- 添加菜单出现动画效果 -->
        <transition name="sort">
          <div class="sort" v-show="sortShow">
            <div class="all-sort-list2" @click="toSearch">
              <div class="item" v-for="(item1, index) in categoryList" :key="item1.categoryId" @mouseenter="addBgc(index)" :class="{ 'item-bgc': index === currentItemIndex }">
                <h3>
                  <a :data-categoryName="item1.categoryName" :data-category1Id="item1.categoryId">{{ item1.categoryName }}</a>
                </h3>
                <!-- <div class="item-list clearfix" v-show="index === currentItemIndex"> -->
                <div class="item-list clearfix" :style="{ display: index === currentItemIndex ? 'block' : 'none' }">
                  <div class="subitem" v-for="item2 in item1.categoryChild" :key="item2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="item2.categoryName" :data-category2Id="item2.categoryId">{{ item2.categoryName }}</a>
                      </dt>
                      <dd>
                        <em v-for="item3 in item2.categoryChild" :key="item3.categoryId">
                          <a :data-categoryName="item3.categoryName" :data-category3Id="item3.categoryId">{{ item3.categoryName }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// 引入节流模块
import jieliu from './jieliu'
import { throttle } from 'lodash'
export default {
  name: 'TypeNav',
  data() {
    return {
      currentItemIndex: -1,
      // 控制是否隐藏sort
      sortShow: true
    }
  },
  methods: {
    // 鼠标移入，显示sort
    showSort() {
      this.sortShow = true
    },
    // 设置索引，添加类名，给item添加背景色
    // addBgc: jieliu(function (index) {
    //   this.currentItemIndex = index
    // }, 50),
    addBgc: throttle(function (index) {
      this.currentItemIndex = index
    }, 50),
    // 鼠标离开时，设置索引-1，导致索引currentItemIndex与当前移入的索引不一致，移除类名
    // 鼠标离开时，隐藏sort
    removeBgcAndHideSort() {
      this.currentItemIndex = -1
      if (this.$route.path !== '/home') {
        this.sortShow = false
      }
    },
    // 点击三联菜单中的链接跳转到search页面
    toSearch(e) {
      // 鼠标点击时，隐藏sort
      this.removeBgcAndHideSort()

      const location = { name: 'search' }
      const query = {}
      const { categoryname, category1id, category2id, category3id } = e.target.dataset
      // 点击的元素含有categoryname的dataset属性
      if (categoryname) {
        query.categoryName = categoryname
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
        // 拼接好地址的对象
        location.query = query
        // 合并params参数
        location.params = this.$route.params
        // 以对象放入push
        this.$router.push(location)
      }
    }
  },
  created() {
    // 控制sort显示与隐藏
    if (this.$route.path !== '/home') {
      this.sortShow = false
    }
  },
  computed: {
    // 获取vuex中的数据
    ...mapState({
      categoryList: (state) => {
        return state.home.categoryList
      }
    })
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;
  a {
    cursor: pointer;
  }
  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 28.75px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            // display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .item-bgc {
          background-color: skyblue;
        }
      }
    }

    // 鼠标移入sort的动画
    .sort-enter {
      opacity: 0;
    }
    .sort-enter-to {
      opacity: 1;
    }
    .sort-enter-active {
      transition: opacity 0.5s linear;
    }
    .sort-leave {
      opacity: 1;
    }
    .sort-leave-to {
      opacity: 0;
    }
    .sort-leave-active {
      transition: opacity 0.5s linear;
    }
  }
}
</style>
