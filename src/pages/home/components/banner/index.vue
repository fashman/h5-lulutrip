<template>
  <div class="banner" v-if="data.status == '0'">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item, idx) in data.data" :key="idx">
        <a :href="item.url">
          <img class="banner-img" :src="item.photo" alt="">
        </a>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

export default {
  name: 'Banner',
  props: ['data'],
  components: { swiper, swiperSlide },
  data() {
    return {
      swiperOption: {
        loop : true,
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
}
</script>

<style scoped lang="less">
  @import './index.less';
</style>
