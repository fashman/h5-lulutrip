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
			email: '', 
			password: '',
			areacode: '86',
		},
		emailForm: {
			email: '',
			password: ''
		},
		getAuthcodeSuccess: false,
		loginSuccess: false,
		emailError: '',
		phoneError: ''
	},
	actions,
  getters,
  mutations
});
