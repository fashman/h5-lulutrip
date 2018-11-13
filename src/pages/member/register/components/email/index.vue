<template>
  <div class="email">
    <form>
      <div :class="{group: true, error: emailerror}">
        <input type="text" v-model="emailForm.email" placeholder="请输入邮箱">
      </div>
      <div :class="{group: true, error: passerror}">
        <input type="password" v-model="emailForm['reg-pwd']" autocomplete="no" placeholder="请输入密码(6-16位字母数字)">
      </div>
      <div :class="{group: true, error: passcheckerror}">
        <input type="password" v-model="emailForm['reg-pwd-check']" autocomplete="no" placeholder="请输入密码(6-16位字母数字)">
      </div>
      <div class="error-msg">{{ emailError }}</div>
      <div v-if="loading" class="btn">注册中...</div>
      <div v-else class="btn" @click="submitLogin">注册</div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Email',
  data() {
    return {
      emailerror: false,
      passerror: false,
      passcheckerror: false
    }
  },
  props: ['emailForm', 'emailRegister', 'loading', 'emailError', 'changeState'],
  methods: {
    submitLogin() {
      if (!/^\w+([-.]\w+)*@\w+([-]\w+)*\.(\w+([-]\w+)*\.)*[a-z]{2,3}$/.test(this.emailForm.email)) {
        this.changeState({key: 'emailError', value: '请输入正确的邮箱地址！'});
        this.emailerror = true;
        return;
      } else {
        this.emailerror = false;
      }
      if (!this.emailForm['reg-pwd']) {
        this.changeState({key: 'emailError', value: '请输入密码(6-16位字母数字)！'});
        this.passerror = true;
        return;
      } else {
        this.passerror = false;
      }
      if (this.emailForm['reg-pwd'] !== this.emailForm['reg-pwd-check']) {
        this.changeState({key: 'emailError', value: '两次密码输入不一致，请重试！'});
        this.passcheckerror = true;
        return;
      } else {
        this.passcheckerror = true;
      }
      this.emailRegister();
    }
  }
}
</script>

<style scoped lang="less">
  @import './index.less';
</style>
