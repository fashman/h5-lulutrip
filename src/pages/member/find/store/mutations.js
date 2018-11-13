export const CHANGE_STATE = 'CHANGE_STATE';
export const REDUCE_SECOND = 'REDUCE_SECOND';

export default {
  [CHANGE_STATE](state, payload) {
    state[payload.key] = payload.value;
  },
  [REDUCE_SECOND](state, payload) {
    let seconds = 60, timer = setInterval(() => {
      if (seconds > 0) {
        seconds--;
        state.seconds = seconds;
      } else {
        clearInterval(timer);
        state.seconds = 60;
      }
    }, 1000);
  }
};
