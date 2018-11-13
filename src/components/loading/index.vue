<template>
  <div class="loading" v-show="loading">
    <span>加载中...</span>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: ['loading']
}
</script>

<style lang="less" scoped>
  @import './index.less';
</style>
