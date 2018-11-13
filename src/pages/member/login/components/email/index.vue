<template>
  <div class="email">
    <form>
      <div :class="{group: true, error: emailerror}">
        <input type="text" v-model="emailForm.email" placeholder="请输入邮箱">
      </div>
      <div :class="{group: true, error: passerror}">
        <input type="password" v-model="emailForm.password" autocomplete="no" placeholder="请输入密码(6-16位字母数字)">
      </div>
      <!-- 错误提示 -->
      <div class="error-msg">{{ emailError }}</div>
      <!-- 登录按钮 -->
      <div v-if="loading" class="btn">登录中...</div>
      <div v-else class="btn" @click="submitLogin">登录</div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Email',
  data() {
    return {
      emailerror: false,
      passerror: false
    }
  },
  props: ['emailForm', 'ajaxLogin', 'loading', 'emailError', 'changeState'],
  methods: {
    submitLogin() {
      let { email, password, repassword } = this.emailForm;
      if (!/^\w+([-.]\w+)*@\w+([-]\w+)*\.(\w+([-]\w+)*\.)*[a-z]{2,3}$/.test(email)) {
        this.changeState({key: 'emailError', value: '请输入正确的邮箱地址！'});
        this.emailerror = true;
        return;
      } else {
        this.emailerror = false;
      }
      if (!password) {
        this.changeState({key: 'emailError', value: '请输入密码(6-16位字母数字)！'});
        this.passerror = true;
        return;
      } else {
        this.passerror = false;
      }
      this.ajaxLogin();
    }
  }
}
</script>

<style scoped lang="less">
  @import './index.less';
</style>
