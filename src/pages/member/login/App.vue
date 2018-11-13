<template>
  <div class="login">
    <div class="content">
      <SimpleHeader />
      <transition name="fade">
        <Phone v-if="loginType === 1" 
          :login-type="loginType" 
          :change-state="changeState"
          :get-authcode="getAuthcode"
          :ajax-login="ajaxLogin"
          :loading="loading"
          :phone-form="phoneForm"
          :get-authcode-success="getAuthcodeSuccess"
          :phone-error="phoneError"
        />
        <Email v-else
          :email-form="emailForm"
          :ajax-login="ajaxLogin"
          :email-error="emailError"
          :change-state="changeState"
        />
      </transition>
      <Bottom :login-type="loginType" :change-state="changeState"/>
      <div class="success" v-if="loginSuccess">登录成功，跳转中...</div>
    </div>
    <CopyRight />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import SimpleHeader from '@/components/simple-header';
import CopyRight from '@/components/copy-right';
import Bottom from './components/bottom';
import Phone from './components/phone';
import Email from './components/email';

export default {
  name: 'App',
  components: { SimpleHeader, Bottom, Phone, Email, CopyRight },
  computed: {
    ...mapState({
      loginType: state => state.loginType,
      loading: state => state.loading,
      phoneForm: state => state.phoneForm,
      emailForm: state => state.emailForm,
      getAuthcodeSuccess: state => state.getAuthcodeSuccess,
		  phoneError: state => state.phoneError,
      emailError: state => state.emailError,
      loginSuccess: state => state.loginSuccess
    })
  },
  methods: {
    ...mapMutations({
      changeState: 'CHANGE_STATE'
    }),
    ...mapActions({
      getAuthcode: 'getAuthcode',
      ajaxLogin: 'ajaxLogin'
    })
  }
}
</script>

<style lang="less" scoped>
  @import './App.less';
</style>
