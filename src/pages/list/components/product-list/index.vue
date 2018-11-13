<template>
  <div :class="{'product-list': true, 'locked': lockList, 'with-tabs': list.tabs && list.tabs.length > 0}">
    <div class="result-count" v-show="!loading && list.total">
      <span></span>
      <p>为您找到{{list.total}}个产品</p>
    </div>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="300">
      <product-item v-if="list.products" v-for="(product, index) in list.products" :key="index" :product="product"></product-item>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import InfiniteScroll from 'vue-infinite-scroll';
import { mapState } from 'vuex';
import ProductItem from '../product-item';

Vue.use(InfiniteScroll);

export default {
  name: 'ProductList',
  components: { ProductItem },
  props: ['list', 'loading', 'getList', 'locking', 'lockList'],
  computed: {
    ...mapState({
      dataUrl: state => state.dataUrl,
      page: state => state.page,
    }),
    busy: function() {
      return this.loading || this.locking;  // `loading` 表示正在加载数据，`locking` 表示正在筛选
    }
  },
  methods: {
    loadMore: function() {
      if (this.list.products.length >= this.list.total || this.lockList) {
        return;
      }

      this.getList({
        url: this.dataUrl,
        data: {
          page: this.page,
        }
      });
    }
  },
}
</script>

<style scoped lang="less">
  @import './index.less';
</style>
