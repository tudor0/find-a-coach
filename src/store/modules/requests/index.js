import actions from './action.js';
import getters from './getters.js';
import mutations from './mutations.js';

export default {
  namespaced: true,
  state() {
    return {
      requests: [],
    };
  },
  getters,
  mutations,
  actions,
};
