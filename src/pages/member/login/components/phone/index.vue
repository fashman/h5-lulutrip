<template>
  <div class="phone">
    <form>
      <div :class="{group: true, tel: true, error: phoneerror}">
        <div class="code">
          <span>{{phoneType.name}}+{{phoneType.code}}</span>
          <select v-model="phoneForm.areacode">
            <option v-for="(item, index) in phoneCode" :key="index" :value="item.code">
              +{{item.code}} {{item.name}}
            </option>
          </select>
        </div>
        <input type="text" placeholder="请输入手机号码" v-model.number="phoneForm.email">
      </div>
      <div :class="{group: true, error: passerror}">
        <input type="password" v-model="phoneForm.password" autocomplete="no" placeholder="请输入密码（6-16位字母数字）">
      </div>
      <!-- 错误提示 -->
      <div class="error-msg">{{ phoneError }}</div>
      <!-- 登录按钮 -->
      <div v-if="loading" class="btn">登录中...</div>
      <div v-else class="btn" id="qqVerification" @click="submitLogin">登录</div>
    </form>
    <transition name="fade">
    <div class="send-success" v-if="getAuthcodeSuccess">发送成功</div>
    </transition>
  </div>
</template>

<script>
import phoneCode from '@/utils/phoneCode';
import phoneRegExp from '@/utils/phoneRegExp';

export default {
  name: 'Phone',
  data() {
    return {
      phoneCode,
      phoneerror: false,
      passerror: false
    }
  },
  props: ['loginType', 'changeState', 'getAuthcode', 'ajaxLogin', 'loading', 'phoneForm', 'getAuthcodeSuccess', 'phoneError'],
  computed: {
    phoneType() {
      return phoneCode.find(v => v.code === this.phoneForm.areacode) || {};
    }
  },
  methods: {
    submitLogin() {
      let { email, areacode, password } = this.phoneForm;
      let matchType = phoneCode.find(v => v.code === areacode);
      let check = phoneRegExp(matchType.key, email);
      if (!check.code) {
        this.changeState({key: 'phoneError', value: check.msg});
        this.phoneerror = true;
        return;
      } else {
        this.phoneerror = false;
      }
      if (!password) {
        this.changeState({key: 'phoneError', value: '请输入密码(6-16位字母数字)！'});
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
