import fetch from '@/utils/fetch';

// 首页 新后台 模块数据
export const fetchData = () => fetch({
  url: '//app.lulutrip.com/tour/location/WAP_INDEX_20181029',
  method: 'get'
});

// 攻略优选 数据
export const fetchArticle = () => fetch({
  url: ' //app.lulutrip.com/llt/app/index',
  method: 'get'
});

// 搜索弹层 数据
export const fetchSearchData = () => fetch({
  url: '//app.lulutrip.com/tour/location/wap_destination_20181105',
  method: 'get'
});