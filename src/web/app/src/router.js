import Vue from 'vue'
import Router from 'vue-router'
import {ID_NEW_PRESENTATION} from "./common/const";

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/analyze',
      redirect: '/analyze/' + ID_NEW_PRESENTATION
    },
    {
      path: '/analyze/:id',
      name: 'analyze',
      component: () => import(/* webpackChunkName: "analyze" */ './views/Analyze.vue'),
      props: true
    },
    {
      path: '/importData',
      name: 'importData',
      component: () => import(/* webpackChunkName: "importData" */ './views/ImportData.vue')
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})
