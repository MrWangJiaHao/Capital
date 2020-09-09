import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress'; // 进度条

import Login from '../views/login.vue';
import Index from '../views/index.vue';
import Dashboard from '../views/dashboard.vue';
import Details from '../views/details.vue';
import Personal from '../views/personal.vue';
import Password from '../views/password.vue';
import SaleCreatechina from '../views/sale/sale_createchina.vue';
import SaleCreatehai from '../views/sale/sale_createhai.vue';
import SaleList from '../views/sale/sale_list.vue';
import SaleNadlist from '../views/sale/sale_ndalist.vue';
import NeedCreate from '../views/need/need_create.vue';
import NeedList from '../views/need/need_list.vue';
import NeedNadlist from '../views/need/need_ndalist.vue';
import Message from '../views/message.vue';
import CreateDetail from '../components/createdetail.vue';
import Step1 from '../components/step/step1.vue';
import Step2 from '../components/step/step2.vue';
import Step3 from '../components/step/step3.vue';
import Step4 from '../components/step/step4.vue';
import Step5 from '../components/step/step5.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/index',
    component: Index,
    redirect: '/dashboard',
    children: [
      {
        path: '/personal',
        name: 'Personal',
        component: Personal
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: '/password',
        name: 'Password',
        component: Password
      },
      {
        path: '/details/:type/:id',
        name: 'Details',
        component: Details
      },
      {
        path: '/sale_createchina',
        name: 'SaleCreatechina',
        component: SaleCreatechina
      },
      {
        path: '/sale_createhai',
        name: 'SaleCreatehai',
        component: SaleCreatehai
      },

      {
        path: '/sale_list',
        name: 'SaleList',
        component: SaleList
      },
      {
        path: '/sale_ndalist',
        name: 'SaleNadlist',
        component: SaleNadlist
      },
      {
        path: '/need_create',
        name: 'NeedCreate',
        component: NeedCreate
      },
      {
        path: '/need_list',
        name: 'NeedList',
        component: NeedList
      },
      {
        path: '/need_ndalist',
        name: 'NeedNadlist',
        component: NeedNadlist
      },
      {
        path: '/message',
        name: 'Message',
        component: Message
      },
      {
        path: '/createdetail',
        name: 'CreateDetail',
        component: CreateDetail,
        redirect: '/createdetail/step1',
        children: [
          {
            path: 'step1',
            name: 'Step1',
            component: Step1
          },
          {
            path: 'step2',
            name: 'Step2',
            component: Step2
          },
          {
            path: 'step3',
            name: 'Step3',
            component: Step3
          },
          {
            path: 'step4',
            name: 'Step4',
            component: Step4
          },
          {
            path: 'step5',
            name: 'Step5',
            component: Step5
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
];

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  console.log(to.name, 'to.name');
  if (to.name !== 'Login' && sessionStorage.getItem('token') === null) {
    next({ name: 'Login' });
  } else {
    next();
  }
  NProgress.done();
});

router.afterEach((to, from) => {
  NProgress.start();
});
export default router;
