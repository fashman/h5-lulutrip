<template>
 <div class="search-header">
   <span class="search-input">
     <input
      type='search'
      placeholder="目的地/关键字/产品编号"
      v-on:keyup.13="search"
      v-model="searchData"
    >
     <span class="search-img" @click="search"></span>
   </span>
   <span class="cancel" @click="back">取消</span>
 </div>
</template>

<script>
import store from 'store';

export default {
  name: 'SearchHeader',
  props: ['callback'],
  data() {
    return {
      searchData: ''
    }
  },
  methods: {
    back() {
      if (this.callback) {    // 如果有回调函数，这处理回调，否则返回前一个页面
        this.callback();
      } else {
        window.history.back();
      }
    },

    search () {
      const search = store.get('search') || [];
      const hasName = search.find(val => (
        val.key == this.searchData
      ));
      const url = `http://app.lulutrip.com/search/tour?keyword=${this.searchData}`;

      if (hasName) {
        window.location.href = url;
      } else {
        const data = {
          key: this.searchData,
          value: url
        };
        search.push(data);
        store.set('search', search);
        window.location.href = url;
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import './index.less';
</style>
