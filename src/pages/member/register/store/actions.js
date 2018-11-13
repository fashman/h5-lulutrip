import api from '@/api';
import { CHANGE_STATE } from './mutations';
const { getAuthcode, phoneRegister, emailRegister } = api;

export default {
  async getAuthcode({ commit, state }) {
    let { areacode, phone } = state.phoneForm;
    commit(CHANGE_STATE, {key: 'loading', value: true});
    let res = await getAuthcode({ areacode, phone });
    if (res.flag === 1) {
      commit(CHANGE_STATE, {key: 'getAuthcodeSuccess', value: true});
      setTimeout(() => {
        commit(CHANGE_STATE, {key: 'getAuthcodeSuccess', value: false});
      }, 1000);
    } else {
      commit(CHANGE_STATE, {key: 'phoneError', value: `获取短信验证码失败，${res.msg}`});
    }
    commit(CHANGE_STATE, {key: 'loading', value: false});
  },
  async phoneRegister({ commit, state }) {
    let { phoneForm } = state;
    commit(CHANGE_STATE, {key: 'loading', value: true});
    let res =  await phoneRegister({ ...phoneForm, areacode: Number(phoneForm.areacode) });
    if (res.flag === 1) {
      commit(CHANGE_STATE, {key: 'registerSuccess', value: true});
      setTimeout(() => {
        let href = res.direct_url || '//app.lulutrip.com/my/home';
        if (href.indexOf('memeber/register') > -1) {
          href = '//app.lulutrip.com/my/home';
        }
        location.href = href;
      }, 1000);
    } else {
      commit(CHANGE_STATE, {key: 'phoneError', value: `注册失败，${res.msg}`});
    }
    commit(CHANGE_STATE, {key: 'loading', value: false});
  },
  async emailRegister({ commit, state }) {
    commit(CHANGE_STATE, {key: 'loading', value: true});
    let res =  await emailRegister(state.emailForm);
    if (res.flag === 1) {
      commit(CHANGE_STATE, {key: 'registerSuccess', value: true});
      setTimeout(() => {
        location.href = res.direct_url || '//app.lulutrip.com/my/home';
      }, 1000);
    } else {
      commit(CHANGE_STATE, {key: 'emailError', value: `注册失败，${res.msg}`});
    }
    commit(CHANGE_STATE, {key: 'loading', value: false});
  }
}
