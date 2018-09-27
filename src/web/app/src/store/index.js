import Vue from 'vue'
import Vuex from 'vuex'
import userInfo from './modules/userInfo'
import mutations from './mutations'
import presentation from "./modules/presentation";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  state: {
    isPageLoading: true,
  },

  mutations: mutations,

  actions: {

  },

  modules: {
    userInfo,
    presentation
  }
})
