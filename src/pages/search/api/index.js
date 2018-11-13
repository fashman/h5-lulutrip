import fetch from '@/utils/fetch';

export const fetchData = () => fetch({
  url: '//app.lulutrip.com/tour/location/wap_destination_20181105',
  method: 'get'
});