import Vue from 'vue'
import Vuex from 'vuex'
import userInfo from './modules/userInfo'
import mutations from './mutations'
import presentation from "./modules/presentation";
import section from "./modules/section.js";
import dbMetaData from "./modules/dbMetaData.js";
import dataMapping from "./modules/dataMapping.js";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  state: {
    isPageLoading: true,
    isDataProcessing: false,
    isUploading: false,
  },

  mutations: mutations,

  actions: {

  },

  modules: {
    userInfo,
    presentation,
    section,
    dbMetaData,
    dataMapping
  }
})
