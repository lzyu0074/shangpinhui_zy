import Vue from 'vue'
import VeeValidate from 'vee-validate'

// 中文提示信息
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate);

// 表单验证
VeeValidate.Validator.localize('zh_CN', {
  messages: {
    ...zh_CN.messages,
    is: (field) => `${field}必须与密码相同`, // 修改内置规则的message，让确认密码和密码相同

  },
  attributes: {
    userPhone: '手机号',
    userVerification: '验证码',
    userPassword: '密码',
    userPasswordConfirm: '确认密码',
    userAgree: '协议'
  }
})

// 自定义校验规则
VeeValidate.Validator.extend('tongyi', {
  validate: (value) => {
    return value
  },
  getMessage: (field) => field + '必须同意'
})