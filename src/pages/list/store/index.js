import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		dataUrl: window.dataUrl,		// 列表页数据接口，初始化由页面直出对应的变量
		page: 2,										// 记录当前的分页
		directUrl: '',							// 跳转的 url
		resetUrl: '',								// 重置的 url

		lockList: false,						// 打开筛选弹层，锁住列表页不能滚动
		loading: false,			  			// 列表数据加载中
		locking: false,							// 列表锁定
		list: {},										// 完整的列表数据对象
	},
	actions,
  getters,
  mutations
});
