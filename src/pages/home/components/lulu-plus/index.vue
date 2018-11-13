<template>
  <div class="lulu-plus">
    <div class="title">{{plusData.name}}</div>
    <div class="lulu-plus-slide">
      <swiper :options="luluContainer" >
        <swiper-slide v-for="(item, idx) in plusData.data" :key="idx">
          <div class="lulu-slide-item">
            <a :href="item.url">
              <img v-lazy="item.photo" alt="" class="lulu-slide-img">
              <div class="lulu-slide-info">
                <p class="info-title">{{item.name}}</p>
                <p class="info-des">{{item.desc}}</p>
              </div>
            </a>
          </div>
        </swiper-slide>
      </swiper>
      <div class="lulu-pagination" slot="pagination"></div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

export default {
  name: 'LuluPlus',
  props: ['plusData'],
  components: { swiper, swiperSlide },
  data() {
    return {
      luluPLus: [1,2,3,4,5],
      luluContainer: {
        slidesPerView: 'auto',
        cancelable:false,
        pagination: {
          el: '.lulu-pagination'
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
  @import './index.less';
</style>