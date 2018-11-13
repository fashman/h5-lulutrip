import {fetchData} from '../api';
import { CHANGE_LOADING, SET_DATA, } from './mutations';

export default {
  async fetchDestination({ commit, state }) {
    try {
      let res = await fetchData();
      if (res.code == 0) {
        commit(CHANGE_LOADING, false);
        commit(SET_DATA, res.data.groupBOList);
      } else {
        alert(`获取数据出错！${res.message}`);
      }
    } catch (error) {
      alert(`出错了！${error}`);
    } 
  },
}
