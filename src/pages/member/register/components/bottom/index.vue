<template>
  <div class="bottom">
    <span @click="toggle">邮箱账号注册</span>
  </div>
</template>

<script>
export default {
  name: 'Bottom',
  props: ['changeState'],
  methods: {
    toggle() {
      this.changeState({ key: 'loginType', value: 2 });
    }
  }
}
</script>

<style scoped lang="less">
  @import './index.less';
</style>
