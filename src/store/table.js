const state = {
  listData: [
    {
      user: '王小虎',
      project: 'dasdasd',
      busin: '行业',
      type: '类型',
      area: '地区',
      status: '下架'
    },
    {
      user: '全文',
      project: 'dasd按时dasd',
      busin: '行业1',
      type: '类型2',
      area: '地3区',
      status: '上架'
    }
  ]
};

const actions = {
  async getlist({ commit }, value) {
    commit('GET_LIST', value);
  }
};

const mutations = {
  GET_LIST(state, value) {
    state.status = value;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
