import api from '@/api';
import { CHANGE_STATE, REDUCE_SECOND } from './mutations';
const { getAuthcode, checkSms, sendEmail } = api;

export default {
  async getAuthcode({ commit, state }) {
    let { areacode, phone } = state.phoneForm;
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
  async phoneCheck({ commit, state }) {
    let { areacode, phone, authcode } = state.phoneForm;
    let res =  await checkSms({ phone, areacode: Number(areacode), authcode });
    if (res.flag === 1) {
      let href = location.href.indexOf('www.lulutrip.com/m') > -1 ? 'www.lulutrip.com/m' : 'app.lulutrip.com';
      location.href = `//${href}/member/resetpwd?phone=${phone}&areacode=${areacode}`;
    } else {
      commit(CHANGE_STATE, {key: 'phoneError', value: `验证码不匹配，${res.msg}`});
    }
    commit(CHANGE_STATE, {key: 'loading', value: false});
  },
  async emailCheck({ commit, state }) {
    let res =  await sendEmail(state.emailForm);
    if (res.flag === 1) {
      commit(CHANGE_STATE, {key: 'senEmailSuccess', value: true});
      commit(REDUCE_SECOND);
    } else {
      commit(CHANGE_STATE, {key: 'emailError', value: `邮件发送失败，${res.msg}`});
    }
    commit(CHANGE_STATE, {key: 'loading', value: false});
  }
}
