const state = {
  progressStatus: false
};

const actions = {
  async progress({ commit }, status) {
    commit('SET_PROGRESS', status);
  }
};

const mutations = {
  SET_PROGRESS(state, status) {
    state.progressStatus = status;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
