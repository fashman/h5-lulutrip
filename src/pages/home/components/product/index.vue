<template>
  <div class="product" v-if="data.status == 0">
    <div class="title">
      {{data.name}}
      <a
        class="title-link" 
        v-if="data.link"
        :href="data.link.url"
        target="_blank"
      >
        {{data.link.name}}
      </a>
    </div>
    <div class="product-tab">
      <div class="tab-nav">
        <swiper :options="tabsNav" >
          <swiper-slide v-for="(item, idx) in data.data"  :key="idx">
            <span 
              @click="switchTab(idx)"
              :class="['tabs-nav-item', {active: idx == activeTab ? true : false }]">
              {{item.name}}
            </span>
          </swiper-slide>
        </swiper>
      </div>
      <div class="tab-container">
        <div
          v-for="(val, idx) in data.list"
          :key="idx"
          :class="['tab-container-content', {activeContent: activeTab == idx ? true : false}]"
        >
          <div 
            class="product-item"
            v-for="(item, itemIdx) in val.productItem"
            :key="itemIdx" >
            <a :href="`http://app.lulutrip.com/tour/view/tourcode-${item.productCode}`">
              <img v-lazy="item.ext.photo" alt="">
              <div class="item-info">
              <div class="info-title">{{item.ext.title}}</div>
                <div class="info-price">
                  <span class="promotion">
                      {{item.ext.currency}}<span class="promotion-price">{{item.ext.disCount ? item.ext.marketPrice : item.ext.price}}</span>
                    </span>
                    <span class="original" v-if="item.ext.disCount">
                      {{item.ext.currency}}
                      <span class="original-price">{{item.ext.price}}</span>
                      <span class="line"></span>
                    </span>
                </div>
              </div>
              <div class="discount" v-if="item.ext.disCount">
                <p>{{item.ext.disCount}}%</p>
                <p>OFF</p>
              </div>
            </a>
          </div>
          <Link :data="val.urlItem" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import Link from '../link';

export default {
  name: 'Product',
  props: ['data'],
  components: { swiper, swiperSlide, Link },
  data() {
    return {
      tabsNav: {
        slidesPerView: 'auto',
      },
      activeTab: 0,
    }
  },
  methods: {
    switchTab(idx) {
      this.activeTab = idx;
    }
  },  
}
</script>

<style scoped lang="less">
  @import './index.less';
</style>