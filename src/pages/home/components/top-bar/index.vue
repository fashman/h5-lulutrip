<template>
  <div class="top-bar" v-show="showTopBar">
    <span class="close" @click="closeTop"></span>
    <div>
      <div class="logo">
        <img src="./images/lulu.png" alt="">
      </div>
      <div class="logo-title">
        <p class="logo-title-t">路路行，自由行服务专家</p>
        <p class="logo-title-b">新人领$25刀红包</p>
      </div>
    </div>
    <a href="https://itunes.apple.com/cn/app/%E8%B7%AF%E8%B7%AF%E8%A1%8C%E6%97%85%E6%B8%B8-%E5%85%A8%E7%90%83%E8%87%AA%E7%94%B1%E8%A1%8C%E6%9C%8D%E5%8A%A1%E4%B8%93%E5%AE%B6/id1070820127?mt=8" class="check">立即查看</a>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  data() {
    return {
      showTopBar: true
    }
  },
  methods: {
    closeTop() {
      this.showTopBar = false;
    }
  }
}
</script>

<style scoped lang="less">
  @import './index.less';
</style>
