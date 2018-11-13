export const CHANGE_LOADING = 'CHANGE_LOADING';
export const SET_DATA = 'SET_DATA';
export const SET_ARTICLE = 'SET_ARTICLE';
export const SET_SEARCH_DATA = 'SET_SEARCH_DATA';


export default {
  [CHANGE_LOADING](state, payload) {
    state.loading = payload;
  },
  [SET_DATA](state, payload) {
    state.data = payload;
    state.complete = true;
  },
  [SET_ARTICLE](state, payload) {
    state.article = payload;
  },
  [SET_SEARCH_DATA](state, payload) {
    state.searchData = payload;
  },
};