<template>
  <div class="register">
    <div class="content">
      <SimpleHeader />
      <transition name="fade">
        <Phone v-if="loginType === 1" 
          :login-type="loginType" 
          :change-state="changeState"
          :get-authcode="getAuthcode"
          :phone-register="phoneRegister"
          :loading="loading"
          :phone-form="phoneForm"
          :get-authcode-success="getAuthcodeSuccess"
          :phone-error="phoneError"
        />
        <Email v-else
          :email-form="emailForm"
          :email-register="emailRegister"
          :email-error="emailError"
          :change-state="changeState"
        />
      </transition>
      <Bottom v-if="loginType === 1" :change-state="changeState"/>
      <div class="success" v-if="registerSuccess">注册成功，跳转中...</div>
    </div>
    <CopyRight />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import SimpleHeader from '@/components/simple-header';
import Phone from './components/phone';
import Email from './components/email';
import Bottom from './components/bottom';
import CopyRight from '@/components/copy-right';

export default {
  name: 'App',
  components: { SimpleHeader, Phone, Email, Bottom, CopyRight },
  computed: {
    ...mapState({
      loginType: state => state.loginType,
      loading: state => state.loading,
      phoneForm: state => state.phoneForm,
      emailForm: state => state.emailForm,
      getAuthcodeSuccess: state => state.getAuthcodeSuccess,
		  phoneError: state => state.phoneError,
      emailError: state => state.emailError,
      registerSuccess: state => state.registerSuccess
    })
  },
  methods: {
    ...mapMutations({
      changeState: 'CHANGE_STATE'
    }),
    ...mapActions({
      getAuthcode: 'getAuthcode',
      phoneRegister: 'phoneRegister',
      emailRegister: 'emailRegister'
    })
  }
}
</script>

<style lang="less" scoped>
  @import './App.less';
</style>
