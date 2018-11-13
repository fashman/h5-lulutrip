import { fetchData } from '../api';
import { CHANGE_STATE } from './mutations';

export default {
  /**
   * 获取列表数据
   */
  async getList({ commit, state }, payload) {
    commit(CHANGE_STATE, { key: 'loading', value: true });
    let res =  await fetchData(payload);
    if (res.code === 0) {
      const resData = res.data;
      const { data } = payload;

      if (state.list.products) {
        resData.products = state.list.products.concat(resData.products);
      }
      commit(CHANGE_STATE, { key: 'list', value: res.data });

      if (data && data.page) {
        commit(CHANGE_STATE, { key: 'page', value: ++data.page });
      }
    } else {
      throw new Error('请求列表数据出错');
    }
    commit(CHANGE_STATE, { key: 'loading', value: false });
  },

  /**
   * 获取筛选数据
   */
  async getData({ commit, state }, payload) {
    commit(CHANGE_STATE, { key: 'loading', value: true });
    let res =  await fetchData(payload);
    if (res.code === 0) {
      const resData = res.data;
      const { data, success } = payload;

      typeof success === 'function' && success(res);
      if (resData.products.length > 0) {
        commit(CHANGE_STATE, { key: 'list', value: res.data });
      }
    } else {
      throw new Error('请求筛选数据出错');
    }
    commit(CHANGE_STATE, { key: 'loading', value: false });
  }
}
