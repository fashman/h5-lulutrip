import fetch from '@/utils/fetch';

/* 兼容小程序端
 * 小程序端页面 URL 为 www.lulutrip.com/m 
 */
const domain = location.href.indexOf('www.lulutrip.com/m') > -1 ? 'www.lulutrip.com/m' : 'app.lulutrip.com';

/**
 * 获取短信验证码
 */
export const getAuthcode = data => fetch({
  url: `//${domain}/publics/get_sms_authcode`,
  method: 'post',
  data
});

/**
 * 手机注册
 */
export const phoneRegister = data => fetch({
  url: `//${domain}/member/phone_register`,
  method: 'post',
  headers: {
    'Content-Type': 'application/json'
  },
  data
});

/**
 * 邮箱注册
 */
export const emailRegister = data => fetch({
  url: `//${domain}/member/ajax_register`,
  method: 'post',
  headers: {
    'Content-Type': 'application/json'
  },
  data
});

/**
 * 手机登录
 */
export const ajaxLogin = data => fetch({
  url: `//${domain}/member/ajax_login`,
  method: 'post',
  headers: {
    'Content-Type': 'application/json'
  },
  data
});

/**
 * 手机验证码登录
 */
export const ajaxSmsLogin = data => fetch({
  url: `//${domain}/member/ajax_login_via_sms`,
  method: 'post',
  headers: {
    'Content-Type': 'application/json'
  },
  data
});

/**
 * 短信验证码-校验
 */
export const checkSms = data => fetch({
  url: `//${domain}/publics/check_sms_authcode`,
  method: 'post',
  headers: {
    'Content-Type': 'application/json'
  },
  data
});

/**
 * 找回密码 - 发送邮箱
 */
export const sendEmail = data => fetch({
  url: `//${domain}/user/sendCheckEmail`,
  method: 'post',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [function (data) {
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret;
  }],
  data
});

/**
 * 防水墙验证
 */
export const tencentCheck = data => fetch({
  url: `//${domain}/publics/check_tencent_captcha`,
  method: 'post',
  headers: {
    'Content-Type': 'application/json'
  },
  data
});

/**
 * 重置密码
 */
export const resetPwd = data => fetch({
  url: `//${domain}/member/ajax_reset_pwd`,
  method: 'post',
  headers: {
    'Content-Type': 'application/json'
  },
  data
});
