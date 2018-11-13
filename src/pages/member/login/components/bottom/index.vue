<template>
  <div class="bottom">
    <span v-if="loginType === 1" @click="toggle">{{ loginType === 1 ? '使用邮箱登录' : '使用手机登录'}}</span>
    <p>
      <a href="//app.lulutrip.com/member/find_pwd">忘记密码</a>
      <a href="//app.lulutrip.com/member/register" class="right">注册账号</a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Bottom',
  props: ['changeState', 'loginType'],
  methods: {
    toggle() {
      this.changeState({
        key: 'loginType', value: this.loginType === 1 ? 2 : 1
      });
    }
  }
}
</script>

<style scoped lang="less">
  @import './index.less';
</style>
