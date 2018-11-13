<template>
  <div class="strategy">
    <div class="title">攻略优选</div>
    <div class="strategy-main">
      <div
        class="strategy-top" 
        v-for="(item, idx) in data" :key="idx"
        v-if="idx == 0">
        <a :href="item.link">
          <img v-lazy="item.imageUrl" alt="">
          <p class="tagTitle">{{item.title}}</p>
          <div class="big-layer"></div>
        </a>
      </div>
      <div class="strategy-bottom" >
        <div
          class="strategy-bottom-item"
          v-for="(item, idx) in data" :key="idx"
          v-if="idx > 0"
        >
          <a :href="item.link">
            <img v-lazy="item.imageUrl" alt="">
            <p class="tagTitle">{{item.title}}</p>
            <div class="little-layer"></div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Strategy',
  props: ['data']
}
</script>

<style scoped lang="less">
  @import './index.less';
</style>