const state = {
  form1: {},
  form2: {},
  form3: {},
  form4: {}
};

const actions = {
  async setForm({ commit }, params) {
    commit('SET_FORM', params);
  }
};

const mutations = {
  SET_FORMTYPE(state, params) {
    state.formtype = params;
  },
  SET_STATUS(state, params) {
    state.status = params;
  },
  SET_FORM(state, params) {
    state[params[0]] = { ...params[1] };
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
