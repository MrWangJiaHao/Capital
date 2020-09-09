import Vue from 'vue';

import ElementUI from 'element-ui';
import VueImg from 'v-img';

import App from './App.vue';
import router from './router';
import store from './store';

import request from '@/utils/request';
import CommentTable from '@/components/common_table.vue';
import CommentList from '@/components/common_list.vue';
import Create from '@/components/create.vue';
import CreateDetail from '@/components/createdetail.vue';

import 'nprogress/nprogress.css'; // 这个样式必须引入
import './styles/index.scss';

import area from '@/utils/area.js';
import chinaarea from '@/utils/chinaarea.js';
import trade from '@/utils/trade.js';
import form from '@/utils/form.js';

Vue.config.productionTip = false;

Vue.use(ElementUI, { size: 'small' });
Vue.use(VueImg);
Vue.component('common-table', CommentTable);
Vue.component('common-list', CommentList);
Vue.component('create', Create);
Vue.component('create-detail', CreateDetail);
Vue.prototype.$request = request;

Vue.prototype.$form = form;

Vue.prototype.$chinaarea = chinaarea.map(item => {
  return {
    value: item.name,
    label: item.name,
    children: item.cities.map(_item => {
      return {
        value: _item.name,
        label: _item.name
      };
    })
  };
});

Vue.prototype.$area = area.map(item => {
  return {
    value: item.name_zh,
    label: item.name_zh,
    children: item.children.map(_item1 => {
      return {
        value: _item1.name_zh,
        label: _item1.name_zh,
        children:
          _item1.children &&
          _item1.children.map(_item2 => {
            return {
              value: _item2.name_zh,
              label: _item2.name_zh
            };
          })
      };
    })
  };
});

Vue.prototype.$trade = trade.map(item => {
  return {
    value: item.name,
    label: item.name,
    children: item.children.map(_item => {
      return {
        value: _item.name,
        label: _item.name,
        children: _item.children.map(_item1 => {
          return {
            value: _item1.name,
            label: _item1.name
          };
        })
      };
    })
  };
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
