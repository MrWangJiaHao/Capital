const state = {
  status: 1
};

const actions = {
  async setStatus({ commit }, value) {
    commit('SET_STATUS', value);
  }
};

const mutations = {
  SET_STATUS(state, value) {
    state.status = value;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
