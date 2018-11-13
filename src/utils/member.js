import api from '@/api';
import Cookie from 'js-cookie';
const { tencentCheck } = api;

export default {
  /**
   * 注册登录页面输入验证码错误次数记录
   */
  setErrorCookie(key) {
    let value = Number(Cookie.get(key) || 0);
    Cookie.set(key, value + 1, {
      expires: new Date(new Date().getTime() + 60 * 60 * 1000),
      path: '/'
    });
  },

  /**
   * 腾讯防水墙
   */
  qqVerification(fn) {
    let verification = new TencentCaptcha(
      document.getElementById('qqVerification'),
      '2009179719',
      function(authObj) {
        if (authObj.ret === 0) {
          tencentCheck({ authObj }).then((res) => {
            if (res.flag === 1) {
              fn.forEach(val => val());
            } else {
              alert(`防刷验证失败，${res.msg}`);
            }
          });
        }
      },
      { bizState: 'h5' },
    );
    verification.show();
  }
};
