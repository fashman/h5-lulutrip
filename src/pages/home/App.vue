<template>
  <div id="home">
    <div class="main" v-show="complete && showHome">
      <TopBar/>
      <Header :setSidebar="setSidebar" :showSearchPage="setShowSearchPage"/>
      <Sidebar :showSidebar="showSidebar" :callback="setSidebar"/>
      <!-- banner 模块 -->
      <Banner :data="banner"/>
      <!-- 探索路路行 模块 -->
      <Explore :explore="explore"/>
      <!-- B区 模块 -->
      <ViewMore :data="Bmodule"/>
      <!--  纽约日游／周边 -->
      <NewYork :tabData="newYork"/>
      <!--  路路行Plus -->
      <LuluPlus :plusData="Plus"/>
      <!--  C区 模块 -->
      <ViewMore :data="Cmodule"/>
      <!-- 留学生假期游 模块 -->
      <Product :data="holiday"/>
      <!-- 华人当季热推 模块 -->
      <Product :data="hot"/>
      <!-- 为爸妈的经典 模块 -->
      <Product :data="classic"/>
      <!-- 攻略优选 模块 -->
      <Strategy :data="article"/>
      <!-- 底部 模块 -->
      <Footer/>
    </div>
    <Loading :loading="loading"/>
    <!-- 搜索页面弹层 模块 -->
    <back-to-top bottom="20vw" right="5vw" :visibleoffset="offset">
      <button class="btn-to-top"></button>
    </back-to-top>
    <!-- 搜索页面弹层 模块 -->
    <SearchPage 
      :data="searchData"
      :isShow="showSearchPage"
      :setShow="setShowSearchPage"
      :isSearchPage="isSearchPage"
    />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import TopBar  from './components/top-bar';
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import Banner from './components/banner';
import Explore from './components/explore';
import ViewMore from './components/view-more';
import NewYork from './components/new-york';
import LuluPlus from './components/lulu-plus';
import Product from './components/product';
import Strategy from './components/strategy';
import Footer from './components/footer';
import Loading from '@/components/loading';
import SearchPage from '@/components/search-page';
import BackToTop from 'vue-backtotop';

export default {
  name: 'App',
  components: { TopBar, Sidebar, Banner, Explore, ViewMore, NewYork, LuluPlus, Product, Strategy, Footer, Loading, Header, SearchPage, BackToTop },
  data() {
    return {
      showSidebar: false,
      showSearchPage: false,
      offset: 500,
      isScroll: true,
      showHome: true,
      scrollTop: '',
      isSearchPage: true
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading,
      article: state => state.article,
      complete: state => state.complete,
      searchData: state => state.searchData
    }),
    ...mapGetters([
      'banner',
      'explore',
      'Bmodule',
      'newYork',
      'Plus',
      'Cmodule',
      'holiday',
      'hot',
      'classic'
    ])
  },
  methods: {
    ...mapActions([
      'fetchMOduleData',
      'getArticle',
      'fetchSearchPage'
    ]),

    setSidebar(data) {
      this.showSidebar = data;
    },

    setShowSearchPage(boolean) {
      this.showSearchPage = boolean;
      if (boolean) {
        this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        setTimeout(() => {
          this.showHome = !boolean;
        },500)
        
      } else {
        this.showHome = !boolean;
        setTimeout(() => {
          document.documentElement.scrollTo(0, this.scrollTop);
          document.body.scrollTo(0, this.scrollTop);
        }, 20);
      }
    } 
  },
  mounted () {
    this.fetchMOduleData();
    this.getArticle();
    this.fetchSearchPage();
  }
}
</script>


<style lang="less" scoped>
  @import './App.less';
</style>