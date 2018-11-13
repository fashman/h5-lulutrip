<template>
  <div class="reset">
    <div class="content">
      <SimpleHeader />
      <Reset 
        :reset-pwd="resetPwd" 
        :loading="loading" 
        :changeState="changeState"
        :formData="formData"
        :error="error"
        :reset-success="resetSuccess"
      />
    </div>
    <CopyRight />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import SimpleHeader from '@/components/simple-header';
import Reset from './components/reset';
import CopyRight from '@/components/copy-right';

export default {
  name: 'App',
  components: { SimpleHeader, Reset, CopyRight },
  computed: {
    ...mapState({
      loading: state => state.loading,
      error: state => state.error,
      formData: state => state.formData,
      resetSuccess: state => state.resetSuccess
    })
  },
  methods: {
    ...mapMutations({
      changeState: 'CHANGE_STATE'
    }),
    ...mapActions({
      resetPwd: 'resetPwd',
    })
  }
}
</script>

<style lang="less" scoped>
  @import './App.less';
</style>
