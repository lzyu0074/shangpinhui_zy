<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cartInfo in cartInfoListComputed" :key="cartInfo.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cartInfo.isChecked" @change="checkedChange($event, cartInfo)" />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">{{ cartInfo.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.cartPrice }}</span>
          </li>
          <!-- 更改产品数量 -->
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" :class="{ 'not-allow': cartInfo.skuNum <= 1 }" @click="goodsNumChange('mins', -1, cartInfo)">-</a>

            <input autocomplete="off" type="text" :value="cartInfo.skuNum" minnum="1" class="itxt" @change="goodsNumChange('input', $event.target.value * 1, cartInfo)" />
            <a href="javascript:void(0)" class="plus" @click="goodsNumChange('plus', 1, cartInfo)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.skuNum * cartInfo.cartPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteGoods(cartInfo.skuId)">删除</a>
            <br />
            <a>移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <!-- 全选 -->
      <div class="select-all">
        <input class="chooseAll" type="checkbox" id="chooseAll" :checked="isAllCheck" @change="allSelect" />
        <label for="chooseAll">全选</label>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedGoods">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// 对改变商品数量按钮进行节流，引入lodash的throttle节流函数
import { throttle } from 'lodash'
export default {
  name: 'ShopCart',
  methods: {
    // 删除商品
    async deleteGoods(skuId) {
      try {
        // 等待第一个操作先完成
        await this.$store.dispatch('shopcart/deleteGoodsById', skuId)
        // 然后再执行这个操作 重新获取购物车数据
        this.$store.dispatch('shopcart/getCartList')
      } catch (error) {
        alert(error.message)
      }
    },
    // 删除所有选中的商品
    async deleteAllCheckedGoods() {
      try {
        // 派发一个action，在这个action里面执行业务逻辑
        await this.$store.dispatch('shopcart/deleteAllCheckedGoods')
        // 重新获取购物车数据
        this.$store.dispatch('shopcart/getCartList')
      } catch (error) {
        alert(error.message)
      }
    },
    // 全选与全不选
    // 即使模板（dom)中没有传e，也可以接受e
    async allSelect(e) {
      try {
        await this.$store.dispatch('shopcart/allSelect', e.target.checked)
        this.$store.dispatch('shopcart/getCartList')
      } catch (error) {
        alert(error.message)
      }
    },
    // 修改产品数量

    goodsNumChange: throttle(async function (type, skuNum, cartInfo) {
      switch (type) {
        case 'mins': //正确单词应该是 minus
          if (cartInfo.skuNum > 1) {
            skuNum = -1
          } else {
            skuNum = 0
          }
          break
        case 'plus':
          break
        case 'input':
          if (isNaN(skuNum) || skuNum < 1) {
            skuNum = 0
          } else {
            skuNum = parseInt(skuNum) - cartInfo.skuNum
          }
          break
      }
      try {
        // 派发action修改购物车数据
        await this.$store.dispatch('detail/addCart', { skuID: cartInfo.skuId, skuNum: skuNum })
        // 派发action获取购物车数据
        await this.$store.dispatch('shopcart/getCartList')
      } catch {
        alert('商品数量更改失败')
      }
    }, 1000),
    // 商品复选框改变
    async checkedChange(e, cartInfo) {
      const isChecked = e.target.checked ? '1' : '0'
      const skuID = cartInfo.skuId
      console.log(skuID, isChecked)
      try {
        await this.$store.dispatch('shopcart/goodsCheckChange', { skuID, isChecked })
        this.$store.dispatch('shopcart/getCartList')
      } catch (error) {
        alert(error.message)
      }
    }
  },
  computed: {
    // 从仓库拿回来的值，但数据没回来的时候可能没值
    ...mapGetters('shopcart', ['cartInfoList']),
    // 页面上真正渲染的是这个值
    cartInfoListComputed() {
      return this.cartInfoList.cartInfoList || []
    },
    // 全选
    isAllCheck() {
      return this.cartInfoListComputed.every((item) => item.isChecked === 1) && this.cartInfoListComputed.length !== 0
    },
    // 总价
    totalPrice() {
      return this.cartInfoListComputed
        .filter((item) => item.isChecked)
        .reduce((pre, cur, index) => {
          return (pre += cur.cartPrice * cur.skuNum)
        }, 0)
    }
  },
  created() {
    // 派发action获取购物车数据
    this.$store.dispatch('shopcart/getCartList')
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
          .mins.not-allow {
            cursor: not-allowed;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            cursor: pointer;
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      label {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
