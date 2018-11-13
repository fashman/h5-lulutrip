<template>
 <div class="block" v-show="data.status == '0'">
  <div class="block-main" v-for="(item, itemIdx) in data.data" :key="itemIdx">
    <p class="title" >
      {{item.name}}
      <span 
        :class="['down-more',{down: isShow[itemIdx]}]" 
        @click="down(itemIdx)"
        v-show="isDown[itemIdx]"
      >
      </span>
    </p>
    <div class="destination-content">
      <a
        class="destination-item"
        v-for="(val, idx) in item.itemBO[0].urlItemChildBOList"
        :href="val.url"
        :key="idx"
        v-show="idx < 9 || isShow[itemIdx]"
      >
        <span>{{val.name}}</span>
      </a>
    </div>
  </div>
 </div>
</template>

<script>

export default {
  name: 'Block',
  props: ['data'],
  data() {
    return {
      // 是否展示隐藏 部分
      isShow: []
    }
  },
  computed: {
    isDown() {   // 是否展示下拉展示按钮
       let ary = (this.data.data || []).map(val => {
        return val.itemBO[0].urlItemChildBOList.length > 9;
      });
      return ary;
    }
  },
  methods: {
    down(idx) {
      let newss = [...this.isShow];
      newss[idx] = !this.isShow[idx];
      this.isShow = newss;
    }
  }
}
</script>

<style lang="less" scoped>
  @import './index.less';
</style>