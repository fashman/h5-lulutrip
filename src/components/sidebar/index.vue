<template>
  <div class="sidebar" ref="sidebar">
    <transition name="sidebar">
      <div class="sidebar-container" v-show="showSidebar" >
        <div class="sidebar-content" ref="sidebarContent">
          <div class="sidebar-logo"></div>
          <div class="sidebar-menu">
            <div class="sidebar-menu-item active-menu">
              <a href="http://app.lulutrip.com/tour/home">
                <img src="./images/home.png" alt="">
                首页
              </a>
            </div>
            <div class="sidebar-menu-item">
              <a href="http://app.lulutrip.com/tour/destinations?target=NA">
                <img src="./images/destination.png" alt="">
                目的地
              </a>
            </div>
            <div class="sidebar-menu-item">
              <a href="http://app.lulutrip.com/topic/entry">
                <img src="./images/lulu.png" alt="">
                路路结伴
              </a>
            </div>
            <div class="sidebar-menu-item">
              <a href="http://app.lulutrip.com/my/home#home">
                <img src="./images/me.png" alt="">
                我的
              </a>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SiderBar',
  props: ['showSidebar', 'callback'],
  mounted() {
    this.$refs.sidebar.addEventListener('touchmove', (e) => {
      e.preventDefault();
    });
    this.$refs.sidebar.addEventListener('click', (e) => {
      this.callback(false);
    });
    this.$refs.sidebarContent.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
}
</script>

<style scoped lang="less">
  @import './index.less';
</style>
