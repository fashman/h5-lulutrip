<template>
  <div class="newYork" v-if="tabData.status == 0">
    <div class="title">{{tabData.name}}</div>
    <div class="newYork-tab">
      <div class="tab-nav">
        <swiper :options="tabsNav">
          <swiper-slide v-for="(item, idx) in tabData.data" :key="idx">
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
          v-for="(val, idx) in product " :key="idx"
          :class="['tabContainerItem', {activeTabs: idx == activeTab ? true : false }]">
          <swiper :options="tabSwiper[`tabContainer${idx}`]" >
            <swiper-slide 
              v-for="(item, itemIdx) in val"
              :key="itemIdx" 
              v-if="item.ext"
            >
              <div class="slide-item">
                <a :href="`http://app.lulutrip.com/tour/view/tourcode-${item.productCode}`">
                  <div class="item-img">
                    <img v-lazy="item.ext.photo" alt="">
                    <div class="layer"></div>
                    <div class="discount" v-if="item.ext.disCount">
                      <p>{{item.ext.disCount}}%</p>
                      <p>OFF</p>
                    </div>
                  </div>
                  <div class="item-words">
                    <div class="item-des">{{item.ext.title}}</div>
                    <div class="item-price">
                      <span class="promotion">
                        {{item.ext.currency}}<span class="promotion-price">{{item.ext.marketPrice}}</span>
                      </span>
                      <span class="original" v-if="item.ext.disCount">
                        {{item.ext.currency}}
                        <span class="original-price">{{item.ext.price}}</span>
                        <span class="line"></span>
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </swiper-slide>
          </swiper>
          <div :class="[`newYork-pagination${idx}`, 'pagination']" slot="pagination"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

export default {
  name: 'NewYork',
  props: ['tabData'],
  components: { swiper, swiperSlide },
  data() {
    return {
      tabsNav: {
        slidesPerView: 'auto',
      },
      activeTab: 0,
    }
  },
   computed: {
    // 计算属性的 getter
    tabSwiper: function () {
      let tabs = {};
      this.tabData.data.forEach((val, idx) => {
        tabs[`tabContainer${idx}`] = {
          slidesPerView: 'auto',
          pagination: {
            el: `.newYork-pagination${idx}`
          }
        }
      });
      return tabs;
    },
    product: function () {
      let data;
      data = this.tabData.data.map(val => (
        val.itemBO[0].productItemChildBOList
      ));
      return data || [];
    }
  },
  methods: {
    switchTab(idx) {
      this.activeTab = idx;
    }
  }
}
</script>

<style scoped lang="less">
  @import './index.less';
</style>