<template>
  <div class="explore" v-if="explore.status == '0'">
    <div class="title">{{explore.name}}</div>
    <div class="explore-main">
      <div
        class="explore-item"
        v-for="(item, idx) in explore.data"
        :key="idx"
      >
        <a :href="item.url">
          <img :src="item.photo" alt="">
          <p>{{item.name}}</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Explore',
  props: ['explore'],
  data() {
    return {
      
    }
  },
}
</script>

<style scoped lang="less">
  @import './index.less';
</style>