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
			// 必填
			areacode: '86',			// 区号
			phone: '',					// 手机号
			authcode: '',				// 短信验证码
			// 选填
			bdCoupon: '',				// BD标识
			note: '',						// 想去的地方
			password: ''				// 密码
		},
		emailForm: {
			email: '',
			'reg-pwd': '',
			'reg-pwd-check': '',
			p_contact_name: '',
			user_type: 2
		},
		getAuthcodeSuccess: false,
		registerSuccess: false,
		loading: false,
		emailError: '',
		phoneError: ''
	},
	actions,
  getters,
  mutations
});
