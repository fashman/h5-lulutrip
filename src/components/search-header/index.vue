<template>
  <div class="search-header">
    <a class="back" href="javascript:;" @click="goBack"></a>
    <div class="search">
      <div>
        <input type="text" @click="gotoSearch" :value="topWord || keyword">
      </div>
    </div>
  </div>
</template>

<script>
import getUrlKey from '@/utils/getUrlKey';

export default {
  name: 'SearchHeader',
  data() {
    return {
      keyword: ''
    };
  },
  props: ['topWord'],
  methods: {
    gotoSearch: function() {
      location.href = '/search';
    },
    goBack: function() {
      if (!document.referrer || document.referrer.indexOf('app.lulutrip.com') === -1) {
        location.href = `${location.protocol}//app.lulutrip.com`;
      } else {
        history.go(-1);
      }
    }
  },
  mounted() {
    const keyword = getUrlKey('keyword');

    this.keyword = keyword;
  }
}
</script>

<style lang="less" scoped>
  @import './index.less';
</style>
