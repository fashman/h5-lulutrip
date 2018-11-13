<template>
  <div class="view-more" v-if="data.status == '0'">
    <a :href="data.data.url" target="_blank">
      <img v-lazy="data.data.photo" alt="">
    </a>
  </div>
</template>

<script>
export default {
  name: 'ViewMore',
  props: ['data']
}
</script>

<style scoped lang="less">
  @import './index.less';
</style>