<template>
  <div class="link">
    <a class="link-item" :href="data.url" >
      <span>{{data.name}}</span>
    </a>
  </div>
</template>

<script>
export default {
  name: 'Link',
  props: ['data']
}
</script>

<style scoped lang="less">
  @import './index.less';
</style>