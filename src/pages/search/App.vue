<template>
  <div id="search">
    <div class="search-main" v-if="complete">
      <div class="search-top">
        <div class="head">
          <SearchHeader/>
        </div>
        <div class="nav-bar">
          <mt-navbar v-model="active">
            <mt-tab-item v-for="(item, idx) in navBar" :id="idx + ''" :key="idx" >
              <span>{{item}}</span>
            </mt-tab-item>
          </mt-navbar>
        </div>
      </div>
      <div class="destination-content">
        <mt-tab-container v-model="active" swipeable="swipeable">
          <mt-tab-container-item id="0">
            <searchModule :data="historyRecord" :callback="setHistoryRecord" />
            <searchModule :data="all"/>
          </mt-tab-container-item>
          <mt-tab-container-item id="1">
            <searchModule :data="americas" />
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <searchModule :data="european" />
          </mt-tab-container-item>
          <mt-tab-container-item id="3">
            <searchModule :data="australia" />
          </mt-tab-container-item>
          <mt-tab-container-item id="4">
            <searchModule :data="novel" />
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
    <Loading :loading="loading"/>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import Vue from 'vue';
import store from 'store';
import { Navbar, TabItem, TabContainer, TabContainerItem} from 'mint-ui';
import SearchHeader from '@/components/search-head';
import searchModule from '@/components/search-module';
import Loading from '@/components/loading';

Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);

export default {
  name: 'App',
  components: { SearchHeader, searchModule, Loading },
  data() {
    return {
      active: '0',
      swipeable: true,
      historyRecord: {}
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading,
      complete: state => state.complete,
    }),
     ...mapGetters([
      'all',
      'americas',
      'european',
      'australia',
      'novel',
      'navBar'
    ])
  },
  methods: {
    ...mapActions([
      'fetchDestination',
    ]),
    setHistoryRecord () {
      this.historyRecord = {}
    }
  },
  mounted () {
    this.fetchDestination();
    const search = store.get('search');
    if (search) {
      const searchRecord = {
        record: search,
        history: true,
        status: '0',
        lenght: search.lenght
      }
      this.historyRecord = searchRecord;
    }
   
  }
}
</script>


<style lang="less" scoped>
  @import './App.less';
</style>
