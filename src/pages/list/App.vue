<template>
  <div v-scroll-lock="locking">
    <div class="top-wrapper">
      <search-header :topWord="list.topWord" />
      <Tabs
        :tabs="list.tabs || []"
        v-show="scrollVisble"
      />
    </div>
    <product-list
      :lock-list="lockList"
      :list="list"
      :loading="loading"
      :getList="getList"
      :locking="locking"
    />
    <bottom-filter
      :change-state="changeState"
      :list="list"
      :getData="getData"
      v-show="scrollVisble"
    />
    <Loading :loading="loading" />
    <back-to-top bottom="20vw" right="5vw" :visibleoffset="offset">
      <button class="btn-to-top"></button>
    </back-to-top>
  </div>
</template>

<script>
import Vue from 'vue';
import VScrollLock from 'v-scroll-lock';
import BackToTop from 'vue-backtotop';
import { mapState, mapMutations, mapActions } from 'vuex';
import SearchHeader from '@/components/search-header';
import Loading from '@/components/loading';
import Tabs from './components/tabs';
import ProductList from './components/product-list';
import BottomFilter from './components/bottom-filter';

Vue.use(VScrollLock);

export default {
  name: 'App',
  data() {
    return {
      offset: 500,
      currentScrollOffset: 0,
      scrollVisble: true,
    };
  },
  components: {
    SearchHeader, Loading, Tabs, ProductList, BottomFilter, BackToTop
  },
  computed: {
    ...mapState({
      dataUrl: state => state.dataUrl,
      locking: state => state.locking,
      loading: state => state.loading,
      lockList: state => state.lockList,
      list: state => state.list,
    })
  },
  methods: {
    ...mapMutations({
      changeState: 'CHANGE_STATE'
    }),
    ...mapActions({
      getList: 'getList',
      getData: 'getData',
    }),
    catchScroll: function() {
      if (window.pageYOffset > this.scrollOffset) {
        if (window.pageYOffset > this.offset) {
          this.scrollVisble = false;
        }
      } else {
        this.scrollVisble = true;
      }
      this.scrollOffset = window.pageYOffset;
    },
    catchResize: function() {
      this.scrollOffset = window.pageYOffset;
    }
  },
  created() {
    this.getList({
      url: this.dataUrl,
    });
  },
  mounted() {
    window.addEventListener('scroll', this.catchScroll);
    window.addEventListener('resize', this.catchResize);
  },
  destroyed() {
    window.removeEventListener('scroll', this.catchScroll);
    window.removeEventListener('resize', this.catchResize);
  },
}
</script>

<style lang="less" scoped>
  @import './App.less';
</style>
