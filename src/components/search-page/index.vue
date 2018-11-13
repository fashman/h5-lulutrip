<template>
  <transition name="searchPage">
    <div id="destination" v-show="isShow" ref="destination">
      <div class="destination-top">
        <div class="head">
          <SearchHeader :callback="setPageShow"/>
        </div>
          <div class="nav-bar" v-if="isShow">
            <mt-navbar v-model="active">
              <mt-tab-item v-for="(item, idx) in navBar" :id="idx+''" :key="idx">
                <span>{{item}}</span>
              </mt-tab-item>
            </mt-navbar>
        </div>
      </div>
      <div class="destination-content" v-if="isShow" ref="destinationContent">
        <mt-tab-container v-model="active" swipeable="swipeable">
          <mt-tab-container-item id="0">
            <SearchModule :data="historyRecord" :callback="setHistoryRecord" v-if="isSearchPage"/>
            <SearchModule :data="all"/>
          </mt-tab-container-item>
          <mt-tab-container-item id="1">
            <SearchModule :data="americas" />
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <SearchModule :data="european" />
          </mt-tab-container-item>
          <mt-tab-container-item id="3">
            <SearchModule :data="australia" />
          </mt-tab-container-item>
          <mt-tab-container-item id="4">
            <SearchModule :data="novel" />
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import Vue from 'vue';
import store from 'store';
import { Navbar, TabItem, TabContainer, TabContainerItem} from 'mint-ui';
import SearchHeader from '@/components/search-head';
import SearchModule from '@/components/search-module';

Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);

export default {
  name: 'SearchPage',
  components: { SearchHeader, SearchModule },
  data() {
    return {
      active: '0',
      swipeable: true,
      historyRecord: {}
    }
  },
  props: ['data', 'isShow', 'setShow', 'isSearchPage'],
  computed: {
    // 全部
    all () {
      let allData = this.data.find(val => (
        val.id === 51
      ));

      if (allData) {
        return {
          status: allData.status,
          data: allData.itemBOList[0].tabItemChildBOList
        }
      } else {
        return {}
      }
    },

    // 美洲
    americas () {
      let americasData = this.data.find(val => (
        val.id === 47
      ));

      if (americasData) {
        return {
          status: americasData.status,
          data: americasData.itemBOList[0].tabItemChildBOList
        }
      } else {
        return {}
      }
    },

    // 欧洲
    european () {
      let europeanData = this.data.find(val => (
        val.id === 48
      ));

      if (europeanData) {
        return {
          status: europeanData.status,
          data: europeanData.itemBOList[0].tabItemChildBOList
        }
      } else {
        return {}
      }
    },

    // 澳新
    australia () {
      let europeanData = this.data.find(val => (
        val.id === 49
      ));

      if (europeanData) {
        return {
          status: europeanData.status,
          data: europeanData.itemBOList[0].tabItemChildBOList
        }
      } else {
        return {}
      }
    },

    // 新奇地
    novel () {
      let europeanData = this.data.find(val => (
        val.id === 50
      ));

      if (europeanData) {
        return {
          status: europeanData.status,
          data: europeanData.itemBOList[0].tabItemChildBOList
        }
      } else {
        return {}
      }
    },

     // navBar
    navBar (state, getters) {
      let navBar = state.data.map(val => (
        val.name
      ))

      return navBar || [];
    }
  },
  methods: {
    setHistoryRecord () {
      this.historyRecord = {}
    },
    setPageShow () {
      this.setShow(false);
    }
  },
  mounted () {
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


<style>
  /* html {
    overflow: hidden;
    height: 100%;
  }
  body {
    height: 100%;
  } */
</style>

<style lang="less" scoped>
  @import './index.less';
</style>