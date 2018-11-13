<template>
  <div class="reset">
    <form>
      <div :class="{group: true, error: passerror}">
        <input type="password" v-model="formData.password" placeholder="请输入密码（6-16位字母数字）">
      </div>
      <div :class="{group: true, error: passcheckerror}">
        <input type="password" v-model="formData.repassword" placeholder="请确定密码（6-16位字母数字）">
      </div>
      <div class="error-msg">{{ error }}</div>
      <div v-if="loading" class="btn">重置密码...</div>
      <div v-else class="btn" @click="submit">重置密码</div>
    </form>
    <div class="bottom">
      <a @click="handleYsf">在线客服</a>
      <a class="right" href="tel:4008218973">400-821-8973</a>
    </div>
    <div class="send-success" v-if="resetSuccess">发送成功</div>
  </div>
</template>

<script>
import getUrlKey from '@/utils/getUrlKey';

export default {
  name: 'Reset',
  data() {
    return {
      passerror: false,
      passcheckerror: false
    }
  },
  props: ['loading', 'resetPwd', 'changeState', 'formData', 'error', 'resetSuccess'],
  methods: {
    submit() {
      let { password, repassword } = this.formData;
      if (!password) {
        this.changeState({key: 'error', value: '请输入密码！'});
        this.passerror = true;
        return;
      } else {
        this.passerror = false;
      }
      if (password !== repassword) {
        this.changeState({key: 'error', value: '两次密码输入不一致，请重试！'});
        this.passcheckerror = true;
        return;
      } else {
        this.passcheckerror = false;
      }
      const  email = getUrlKey('email') || '';
      const  phone = getUrlKey('phone') || '';
      const  areacode = getUrlKey('areacode') || '';
      if (email || (phone && areacode)) {
        this.resetPwd({email, phone, areacode});
      } else {
        this.changeState({key: 'error', value: '您的URL地址有问题！'});
      }
    },
    handleYsf() {
      if ( ysf ) {
        ysf.open({ templateId: 2501631 });
      }
    },
  }
}
</script>

<style scoped lang="less">
  @import './index.less';
</style>
