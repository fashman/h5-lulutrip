<template>
  <div class="bottom">
    <span v-if="loginType === 1" @click="toggle">{{ loginType === 1 ? '使用邮箱找回' : '使用手机找回'}}</span>
    <p>
      <a @click="handleYsf">在线客服</a>
      <a class="right" href="tel:4008218973">400-821-8973</a>
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
