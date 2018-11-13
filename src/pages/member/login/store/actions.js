import api from '@/api';
import { CHANGE_STATE } from './mutations';
const { ajaxLogin } = api;

export default {
  async ajaxLogin({ commit, state }) {
    let { loginType, phoneForm, emailForm } = state;
    let data = loginType === 1 ? phoneForm : emailForm;
    commit(CHANGE_STATE, {key: 'loading', value: true});
    commit(CHANGE_STATE, {key: loginType === 1 ? 'phoneError' : 'emailError', value: null});
    let res =  await ajaxLogin(data);
    if (res.flag === 1) {
      commit(CHANGE_STATE, {key: 'loginSuccess', value: true});
      setTimeout(() => {
        let href = res.direct_url || '//app.lulutrip.com/my/home';
        if (href.indexOf('memeber/login') > -1) {
          href = '//app.lulutrip.com/my/home';
        }
        location.href = href;
      }, 1000);
    } else {
      commit(CHANGE_STATE, {key: loginType === 1 ? 'phoneError' : 'emailError', value: `登录失败，${res.msg}`});
    }
    commit(CHANGE_STATE, {key: 'loading', value: false});
  }
}
