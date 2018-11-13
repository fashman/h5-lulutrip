import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		loading: false,
		formData: {
			password: '',
			repassword: '',
		},
		error: '',
		resetSuccess: false
	},
	actions,
  getters,
  mutations
});
