import { fetchData, fetchArticle, fetchSearchData } from '../api';
import { CHANGE_LOADING, SET_DATA, SET_ARTICLE, SET_SEARCH_DATA } from './mutations';

export default {
  async fetchMOduleData({ commit, state }) {
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

  async getArticle({ commit, state }) {
    try {
      let res = await fetchArticle();
      if (res.rs == 1) {
        commit(SET_ARTICLE, res.data);
      } else {
        alert(`获取文章数据出错！${res.msg}`);
      }
    } catch (error) {
      alert(`出错了！${error}`);
    } 
  },

  async fetchSearchPage({ commit, state }) {
    try {
      let res = await fetchSearchData();
      if (res.code == 0) {
        commit(SET_SEARCH_DATA, res.data.groupBOList);
      } else {
        alert(`获取搜索数据出错！${res.message}`);
      }
    } catch (error) {
      alert(`出错了！${error}`);
    } 
  },
}