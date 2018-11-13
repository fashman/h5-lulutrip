<template>
 <div class="block" v-show="data.status == '0'">
  <div 
    class="block-main" 
    v-if="data.history"
  >
    <p class="title" >
      历史记录
      <span 
        class="delete" 
        @click="deleteStore" >
      </span>
    </p>
    <div class="destination-content">
      <a
        class="destination-item"
        v-for="(val, idx) in data.record"
        :key="idx"
        :href="val.value"
      >
        <span>{{val.key}}</span>
      </a>
    </div>
  </div>
  <div 
    class="block-main"
    v-else
    v-for="(item, itemIdx) in data.data" 
    :key="itemIdx">
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
      <span
        class="destination-item"
        v-for="(val, idx) in item.itemBO[0].urlItemChildBOList"
        :key="idx"
        v-show="idx < 9 || isShow[itemIdx]"
        @click="setStore(val.name, val.url)"
      >
        <span>{{val.name}}</span>
      </span>
    </div>
  </div>
 </div>
</template>

<script>
import store from 'store';

export default {
  name: 'Block',
  props: ['data', 'callback'],
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
    },

    setStore(name, url) {
      const search = store.get('search') || [];
      const hasName = search.find(val => (
        val.key == name
      ));
      if (hasName) {
        window.location.href = url;
      } else {
        const data = {
          key: name,
          value: url
        };
        search.push(data);
        store.set('search', search);
        window.location.href = url;
      }
    },

    deleteStore() {
      store.remove('search');
      this.callback();
    }
  }
}
</script>

<style lang="less" scoped>
  @import './index.less';
</style>