<template>
  <div>
    <div class="bottom-filter">
      <div @click="toggleShowSort"><i class="sort"></i>排序</div>
      <div @click="gotoDestination"><i class="desitination"></i>目的地</div>
      <div @click="toggleShowFilter"><i class="filter"></i>筛选</div>
    </div>
    <div class="sort-wrapper">
      <span class="mask" v-show="sortVisible" @click="toggleShowSort"></span>
      <transition name="sort-slide-fade">
        <div class="sort-list" v-show="sortVisible">
          <a :href="order.url" :class="{active: order.selected == '1'}" v-for="(order, index) in orderFormat" :key="index">{{ order.label }}</a>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="filter-wrapper" v-show="filterVisible">
        <div class="top-op">
          <i class="close-btn" @click="toggleShowFilter"></i>
          <span class="reset-btn" @click="fetchData(list.resetUrl)">清空</span>
        </div>
        <div class="filter-content">
          <div class="filter-box" v-if="list.filters && list.filters.region && list.filters.region.length > 0">
            <h2>游玩区域<span>（可多选）</span><i @click.stop="showExpandMore('region')"></i></h2>
            <ul>
              <li
                :class="{active: item.selected == '1', disabled: !item.selectable}"
                v-for="(item, index) in list.filters.region"
                :key="index"
                v-if="index < 6"
                @click="fetchData(item.link, !item.selectable)"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
          <div class="filter-box" v-if="list.filters && list.filters.duration && list.filters.duration.length > 0">
            <h2>游玩天数<span>（可多选）</span></h2>
            <ul>
              <li
                :class="{active: item.selected == '1', disabled: !item.selectable}"
                v-for="(item, index) in list.filters.duration"
                :key="index"
                @click="fetchData(item.link, !item.selectable)"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
          <div class="filter-box" v-if="list.filters && list.filters.cities && list.filters.cities.length > 0">
            <h2>出发地<span>（可多选）</span><i @click.stop="showExpandMore('cities')"></i></h2>
            <ul>
              <li
                :class="{active: item.selected == '1', disabled: !item.selectable}"
                v-for="(item, index) in list.filters.cities"
                :key="index"
                v-if="index < 6"
                @click="fetchData(item.link, !item.selectable)"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
          <div class="filter-box" v-if="list.filters && list.filters.scenes && list.filters.scenes.length > 0">
            <h2>游玩景点/途径地<span>（可多选）</span><i @click.stop="showExpandMore('scenes')"></i></h2>
            <ul>
              <li
                :class="{active: item.selected == '1', disabled: !item.selectable}"
                v-for="(item, index) in list.filters.scenes"
                :key="index"
                v-if="index < 6"
                @click="fetchData(item.link, !item.selectable)"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
          <div class="filter-box" v-if="list.filters && list.filters.lines && list.filters.lines.length > 0">
            <h2>行程特色<span>（可多选）</span><i @click.stop="showExpandMore('lines')"></i></h2>
            <ul>
              <li
                :class="{active: item.selected == '1', disabled: !item.selectable}"
                v-for="(item, index) in list.filters.lines"
                :key="index"
                v-if="index < 6"
                @click="fetchData(item.link, !item.selectable)"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
          <div class="filter-box" v-if="list.filters && list.filters.service && list.filters.service.length > 0">
            <h2>综合筛选<span>（可多选）</span></h2>
            <ul>
              <li
                :class="{active: item.selected == '1', disabled: !item.selectable}"
                v-for="(item, index) in list.filters.service"
                :key="index"
                @click="fetchData(item.link, !item.selectable)"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
        <div class="bottom-op">
          <a class="submit-btn" :href="list.directUrl">显示结果（{{ list.total }}个产品）</a>
        </div>
      </div>
    </transition>
    <div class="expand-more">
      <span class="mask" v-show="showExpandMoreVisible" @click="hideExpandMore"></span>
      <transition name="more-slide-fade">
        <div class="expand-more-inner" v-show="showExpandMoreVisible">
          <ul class="more-list" ref="moreList">
            <li
              :class="{active: item.selected == '1', disabled: !item.selectable}"
              v-for="(item, index) in expandList"
              :key="index"
              @click="handleExpandSelect"
              :data-key="item.key"
            >
              <i></i>
              <span>{{ item.name }}</span>
            </li>
          </ul>
          <div class="more-bottom">
            <span class="reset-btn" @click="resetExpand">重置</span>
            <span class="confirm-select" @click="submitExpand">选择完成</span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Toast from 'vue-easy-toast';

Vue.use(Toast);

export default {
  name: 'BottomFilter',
  props: ['changeState', 'list', 'getData'],
  data() {
    return {
      sortVisible: false,         // 排序弹层
      filterVisible: false,       // 筛选弹层
      showExpandMoreVisible: false,   // 展开更多弹层

      expandKey: '',                    // 展开更多对应的数据字段
      searchObj: {},                    // 展开更多搜索区域
      expandSelecting: false,

      filterClick: false,               // 筛选条件是否改变
      documentElementScrollTop: 0,      // 记录列表页滚动的位置
    }
  },
  computed: {
    orderFormat: function() {
      const orderLabel = {
        hot: '推荐度排序',
        satisfaction: '满意度排序',
        priceasc: '人均单价 从低到高',
        pricedesc: '人均单价 从高到低',
      };
      const { order = [] } = this.list;

      return order.map(item => {
        item.label = orderLabel[item.key];
        return item;
      });
    },
    expandList: function() {
      return this.expandKey && this.list.filters ? this.list.filters[this.expandKey] : [];
    }
  },
  methods: {
    gotoDestination: function() {
      const { continent } = this.list;
      location.href = `/tour/destinations?target=${continent || 'NA'}`;
    },
    toggleShowSort: function() {
      this.sortVisible = !this.sortVisible;
      this.filterVisible = false;

      this.changeState({
        key: 'locking',
        value: this.sortVisible
      });
      this.changeState({
        key: 'lockList',
        value: this.filterVisible
      });
    },
    toggleShowFilter: function() {
      this.filterVisible = !this.filterVisible;
      this.sortVisible = false;
      this.changeState({
        key: 'locking',
        value: this.sortVisible
      });
      this.changeState({
        key: 'lockList',
        value: this.filterVisible
      });

      if (this.filterVisible) {
        this.documentElementScrollTop = document.documentElement.scrollTop;
      } else {
        if (this.filterClick) {
          this.filterClick = false;
          return;
        }
        const _this = this;
        setTimeout(function() {
          document.documentElement.scrollTo(0, _this.documentElementScrollTop);
        }, 20);
      }
    },
    fetchData: function(url, disabled) {
      if (disabled) {
        return;
      }
      this.filterClick = true;
      this.getData({
        url
      });
    },
    showExpandMore: function(type) {
      this.showExpandMoreVisible = !this.showExpandMoreVisible;
      this.expandKey = type;
      const { filters } = this.list;
      const expandList = filters[this.expandKey];

      if (this.showExpandMoreVisible) {      // 打开右侧弹层
        if (!this.searchObj[this.expandKey]) {
          this.searchObj[this.expandKey] = [];
        }

        if (!this.expandSelecting) {    // 初始化需要将默认选中的选项加到数据里面，只在初始化执行一次
          this.expandSelecting = true;
          expandList.map(item => {
            if (item.selected == 1) {
              this.searchObj[this.expandKey].push(item.key);
            }
          });
        }
      }
    },
    hideExpandMore: function() {
      this.showExpandMoreVisible = !this.showExpandMoreVisible;

      if (!this.showExpandMoreVisible) {      // 关闭右侧弹层后，重置筛选项
        this.$refs.moreList.scrollTo(0, '0px');
        this.expandKey = '';
        this.searchObj = {};
        this.expandSelecting = false;
      }
    },
    handleExpandSelect: function(event) {
      const target = event.target;
      const className = target.className;
      const itemKey = target.getAttribute('data-key');

      if (className.indexOf('disabled') > -1) {
        return;
      }

      if (className.indexOf('active') > -1) {
        target.className = className.replace('active', '');

        const index = this.searchObj[this.expandKey].indexOf(itemKey);
        this.searchObj[this.expandKey].splice(index, 1);
      } else {
        target.className = className + ' active';
        this.searchObj[this.expandKey].push(itemKey);
      }
    },
    resetExpand: function() {
      this.searchObj[this.expandKey] = [];
      this.$refs.moreList.querySelectorAll('li.active').forEach(node => {
        node.className = node.className.replace('active', '');
      });
    },
    submitExpand: function() {
      const _this = this;

      this.getData({
        url: this.list.dataUrl,
        data: {
          [this.expandKey]: this.searchObj[this.expandKey].length > 0 ? this.searchObj[this.expandKey] : ['clear']
        },
        success: function(res) {
          const resData = res.data;

          if (resData.products && resData.products.length > 0) {
            _this.hideExpandMore();
          } else {
            Vue.toast('无符合条件的结果', {
              horizontalPosition: 'center',
              duration: 3000,
              className: 'empty-tips'
            });
          }
        }
      });
    },
  }
}
</script>

<style scoped lang="less">
  @import './index.less';
</style>
