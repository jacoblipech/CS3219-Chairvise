import Vue from 'vue'
import Vuex from 'vuex'
import userInfo from './modules/userInfo'
import mutations from './mutations'
import accessControl from './modules/accessControl'
import presentation from "./modules/presentation";
import section from "./modules/section.js";
import dbMetaData from "./modules/dbMetaData";

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
    presentation,
    accessControl,
    section,
    dbMetaData
  }
})
