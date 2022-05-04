<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go">我有账号，去 <a href="login.html" target="_blank">登陆</a> </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <!-- <input type="text" placeholder="请输入你的手机号" v-model="userPhone" /> -->
        <!-- <span class="error-msg">错误提示信息</span> -->
        <!-- vee-validate写法： -->
        <input placeholder="请输入你的手机号" v-model="userPhone" name="userPhone" v-validate="{ required: true, regex: /^1\d{10}$/ }" :class="{ invalid: errors.has('userPhone') }" />
        <span class="error-msg">{{ errors.first('userPhone') }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input placeholder="请输入你的验证码" v-model="userVerification" name="userVerification" v-validate="{ required: true, regex: /^\d{6}$/ }" :class="{ invalid: errors.has('userVerification') }" />
        <button style="width: 78px; height: 38px" @click="getVerificationCode">获取验证码</button>
        <span class="error-msg">{{ errors.first('userVerification') }}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input placeholder="请输入你的密码" v-model="userPassword" name="userPassword" v-validate="{ required: true, regex: /^[0-9A-Za-z]{3,20}$/ }" :class="{ invalid: errors.has('userPassword') }" />
        <span class="error-msg">{{ errors.first('userPassword') }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input placeholder="请输入确认密码" v-model="userPasswordConfirm" name="userPasswordConfirm" v-validate="{ required: true, is: userPassword }" :class="{ invalid: errors.has('userPasswordConfirm') }" />
        <span class="error-msg">{{ errors.first('userPasswordConfirm') }}</span>
      </div>
      <div class="controls">
        <input type="checkbox" v-model="userAgree" name="userAgree" v-validate="{ required: true, tongyi: true }" :class="{ invalid: errors.has('userAgree') }" />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{ errors.first('userAgree') }}</span>
      </div>
      <div class="btn">
        <button @click="gotoRegister">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Register',
  data() {
    return {
      userPhone: '',
      userVerification: '',
      userPassword: '',
      userPasswordConfirm: '',
      userAgree: false
    }
  },
  methods: {
    // 获取用户验证码按钮
    async getVerificationCode() {
      const { userPhone } = this
      try {
        await this.$store.dispatch('user/getVerificationCode', userPhone)
        this.userVerification = this.verificationCode
      } catch (error) {
        alert(error.message)
      }
    },
    // 完成注册按钮
    async gotoRegister() {
      const { userPhone, userPassword, userVerification } = this
      // vee-validate 校验
      const success = await this.$validator.validateAll()
      if (success) {
        try {
          await this.$store.dispatch('user/gotoRegister', { userPhone, userPassword, userVerification })
          alert('注册成功，点击跳转登录页面')
          this.$router.push({ name: 'login' })
        } catch (error) {
          alert(error.message)
        }
      } else {
        alert('请正确输入注册信息')
      }
    }
  },
  computed: {
    ...mapState('user', ['verificationCode'])
  }
}
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }
      input.verification {
        width: 193px;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>
