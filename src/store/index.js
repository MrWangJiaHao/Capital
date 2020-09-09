import Vue from 'vue';
import Vuex from 'vuex';

import common from './common';
import create from './create';
import form from './form';
import table from './table';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    common,
    create,
    form,
    table
  },
  strict: process.env.NODE_ENV !== 'production'
});
