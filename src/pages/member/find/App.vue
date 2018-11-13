<template>
  <div class="find">
    <div class="content">
      <SimpleHeader :text="'找回密码'" />
      <transition name="fade">
        <Phone v-if="loginType === 1" 
          :login-type="loginType" 
          :change-state="changeState"
          :get-authcode="getAuthcode"
          :phone-check="phoneCheck"
          :loading="loading"
          :phone-form="phoneForm"
          :get-authcode-success="getAuthcodeSuccess"
          :phone-error="phoneError"
        />
        <Email v-else
          :email-form="emailForm"
          :email-check="emailCheck"
          :email-error="emailError"
          :change-state="changeState"
          :sen-email-success="senEmailSuccess"
          :seconds="seconds"
        />
      </transition>
      <Bottom :login-type="loginType" :change-state="changeState"/>
    </div>
    <CopyRight />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import SimpleHeader from '@/components/simple-header';
import Bottom from './components/bottom';
import Phone from './components/phone';
import Email from './components/email';
import CopyRight from '@/components/copy-right';

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
      senEmailSuccess: state => state.senEmailSuccess,
      seconds: state => state.seconds
    })
  },
  methods: {
    ...mapMutations({
      changeState: 'CHANGE_STATE'
    }),
    ...mapActions({
      getAuthcode: 'getAuthcode',
      phoneCheck: 'phoneCheck',
      emailCheck: 'emailCheck'
    })
  }
}
</script>

<style lang="less" scoped>
  @import './App.less';
</style>
