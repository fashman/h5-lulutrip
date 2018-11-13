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
        <input type="text" placeholder="请输入手机号码" v-model.number="phoneForm.phone">
      </div>
      <div :class="{group: true, error: codeerror}">
        <input type="text" v-model.number="phoneForm.authcode" placeholder="请输入验证码">
        <div class="authecode disable" v-if="seconds < 60">重新发送( {{ seconds }} )</div>
        <div class="authecode" id="qqVerification" @click="sendAutheCode" v-else>发送验证码</div>
      </div>
      <!-- 错误信息 -->
      <div class="error-msg">{{ phoneError }}</div>
      <!-- 找回按钮 -->
      <div v-if="loading" class="btn">找回密码...</div>
      <div v-else class="btn" @click="submitLogin">找回密码</div>
    </form>
    <div class="send-success" v-if="getAuthcodeSuccess">发送成功</div>
  </div>
</template>

<script>
import phoneCode from '@/utils/phoneCode';
import phoneRegExp from '@/utils/phoneRegExp';
import Cookie from 'js-cookie';
import memnerUtils from '@/utils/member';

export default {
  name: 'Phone',
  data() {
    return {
      seconds: 60,
      timer: null,
      phoneCode,
      phoneerror: false,
      codeerror: false
    }
  },
  props: ['loginType', 'changeState', 'getAuthcode', 'phoneCheck', 'loading', 'phoneForm', 'getAuthcodeSuccess', 'phoneError'],
  computed: {
    phoneType() {
      return phoneCode.find(v => v.code === this.phoneForm.areacode) || {};
    }
  },
  methods: {
    sendAutheCode() {
      let { phone, areacode } = this.phoneForm;
      let matchType = phoneCode.find(v => v.code === areacode);
      let check = phoneRegExp(matchType.key, phone);
      if (!check.code) {
        this.changeState({key: 'phoneError', value: check.msg});
        this.phoneerror = true;
        return;
      } else {
        this.phoneerror = false;
      }
      if (location.href.indexOf('www.lulutrip.com/m') > -1) {
        this.setInter();
        this.getAuthcode();
      } else {
        memnerUtils.qqVerification([this.setInter, this.getAuthcode]);
      }
    },
    setInter() {
      this.seconds = 60;
      this.timer = setInterval(() => {
        if (this.seconds > 0){
          this.seconds--;
        } else {
          clearInterval(this.timer);
          this.seconds = 60;
        }
      }, 1000);
    },
    submitLogin() {
      let { phone, areacode, authcode } = this.phoneForm;
      let matchType = phoneCode.find(v => v.code === areacode);
      let check = phoneRegExp(matchType.key, phone);
      if (!check.code) {
        this.changeState({key: 'phoneError', value: check.msg});
        this.phoneerror = true;
        return;
      } else {
        this.phoneerror = false;
      }
      if (!/^\d{6}$/.test(authcode)) {
        this.changeState({key: 'phoneError', value: '请输入六位数短信验证码！'});
        this.codeerror = true;
        return;
      } else {
        this.codeerror = false;
      }
      this.phoneCheck();
    },

  }
}
</script>

<style scoped lang="less">
  @import './index.less';
</style>
