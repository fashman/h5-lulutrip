import api from '@/api';
import { CHANGE_STATE } from './mutations';
const { resetPwd } = api;

export default {
  async resetPwd({ commit, state }, o) {
    commit(CHANGE_STATE, {key: 'loading', value: true});
    const data = {
      password: state.formData.password,
      ...o
    }
    let res = await resetPwd(data);
    if (res.flag === 1) {
      commit(CHANGE_STATE, {key: 'resetSuccess', value: true});
      setTimeout(() => {
        let href = location.href.indexOf('www.lulutrip.com/m') > -1 ? 'www.lulutrip.com/m' : 'app.lulutrip.com';
        location.href = `//${href}/my/home`;
      }, 1000);
    } else {
      commit(CHANGE_STATE, {key: 'error', value: `重置失败，${res.msg}`});
    }
    commit(CHANGE_STATE, {key: 'loading', value: false});
  },
}
