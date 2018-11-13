<template>
  <div class="email">
    <form>
      <div v-if="senEmailSuccess" class="success">
        <h3>{{emailForm.value}}</h3>
        <h4>验证邮件已发送（24小时有效）请尽快完成验证</h4>
        <p>如无法正常收到邮件，请检查您的垃圾邮箱和邮箱名称</p>
        <div class="disable" v-if="seconds < 60">没收到？再次发送（{{ seconds }}）</div>
        <div v-else @click="submit">没收到？再次发送</div>
      </div>
      <div v-else>
        <div :class="{group: true, error: emailerror}">
          <input type="text" v-model="emailForm.value" placeholder="请输入邮箱">
        </div>
        <!-- 错误信息 -->
        <div class="error-msg">{{ emailError }}</div>
        <!-- 找回按钮 -->
        <div v-if="loading" class="btn">找回密码...</div>
        <div v-else class="btn" @click="submit">找回密码</div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Email',
  data() {
    return {
      emailerror: false
    }
  },
  props: ['emailForm', 'emailCheck', 'loading', 'emailError', 'changeState', 'senEmailSuccess', 'seconds'],
  methods: {
    submit() {
      if (!/^\w+([-.]\w+)*@\w+([-]\w+)*\.(\w+([-]\w+)*\.)*[a-z]{2,3}$/.test(this.emailForm.value)) {
        this.changeState({key: 'emailError', value: '请输入正确的邮箱地址！'});
        this.emailerror = true;
        return;
      } else {
        this.emailerror = false;
      }
      this.emailCheck();
    },
    handleYsf() {
      if ( ysf ) {
        ysf.open({ templateId: 2501631 });
      }
    },
  },
}
</script>

<style scoped lang="less">
  @import './index.less';
</style>
