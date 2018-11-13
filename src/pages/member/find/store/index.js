import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		loginType: 1,
		loading: false,
		phoneForm: {
			areacode: '86',			// 区号
			phone: '',					// 手机号
			authcode: '',				// 短信验证码
		},
		emailForm: {
			type: 'email',
			value: ''
		},
		getAuthcodeSuccess: false,
		senEmailSuccess: false,
		emailError: '',
		phoneError: '',
		seconds: 60
	},
	actions,
  getters,
  mutations
});
