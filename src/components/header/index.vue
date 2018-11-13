<template>
  <div class="head">
    <div class="search">
      <span class="logo" @click="setSidebar(true)"></span>
      <span class="search-img" @click="search"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ['setSidebar', 'showSearchPage'],
  methods: {
    search() {
      this.showSearchPage(true);
    }
  }
}
</script>

<style scoped lang="less">
  @import './index.less';
</style>