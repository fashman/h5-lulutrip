import Vue from 'vue';
import App from './App';
import store from './store';
import '@/styles/reset.css';

import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload, {
  loading: '//llt.quimg.com/llt-static/images/common/preload_l.gif',
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
});
