<template>
  <div class="tabs-container" v-if="tabs.length > 0">
    <div class="tabs" ref="tabs">
      <a
        :href="tab.url"
        v-for="(tab, index) in tabs"
        :key="index"
        v-bind:class="{active: tab.selected == '1'}"
      >
        <span>{{ tab.name }}</span>
      </a>
    </div>
  </div>
</template>

<script>
import find from 'array-find';

export default {
  name: 'Tabs',
  props: ['tabs'],
  updated: function () {
    const _this = this;

    this.$nextTick(function () {
      if (!_this.tabs.length) {
        return;
      }

      const $tabs = _this.$refs.tabs;
      const activeTab = find(_this.tabs, function(tab, index, array) {
        if (tab && tab.selected == '1') {
          return tab.index = ++index;
        }
      });
      const activeIndex = activeTab.index;
      let scrollX = 0;

      $tabs.querySelectorAll('a').forEach(function(item, index) {
        if (index < activeIndex - 1) {
          scrollX += item.offsetWidth;
        }
      });

      $tabs.scrollTo(scrollX, 0);
    });
  }
}
</script>

<style scoped lang="less">
  @import './index.less';
</style>
