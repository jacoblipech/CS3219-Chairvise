import axios from 'axios'
import {processMapping} from '../helpers/processor.js'

export default {
  state: {
    hasDBSchemaSetted: false,
    hasFileUploaded: false,
    hasTableTypeSelected: false,
    hasLabelSpecified: false,
    hasMappingFinished: false,
    isUploading: false,
    isUploadSuccess: false,
    data: {
      dbSchema: null,
      uploadedData: [],
      uploadedLabel: [],
      mappingResult: [],
      dataDetail: [],
      processedResult: [],
      tableType: null,
      hasLabel: null
    },
    error: []
  },

  mutations: {
    setUploadingStatus(state, status) {
      state.isUploading = status;
    },

    setUploadSuccess(state, success) {
      state.isUploadSuccess = success;
    },

    setUploadedFile(state, data) {
      state.data.uploadedLabel = data[0];
      state.data.uploadedData = data;
      state.hasFileUploaded = true;
    },

    clearUploadedFile(state) {
      state.data.uploadedLabel = [];
      state.data.uploadedData = [];
      state.hasFileUploaded = false;
    },

    setDBSchema(state, dbSchema) {
      state.data.dbSchema = dbSchema;
      state.hasDBSchemaSetted = true;
    },

    clearDBSchema(state) {
      state.data.dbSchema = [];
      state.hasDBSchemaSetted = false;
    },

    setTableType(state, selected) {
      state.data.tableType = selected;
      state.hasTableTypeSelected = true;
    },

    clearTableType(state) {
      state.data.tableType = null;
      state.tableTypeSelected = false;
    },

    setHasLabel(state, hasLabel) {
      state.data.hasLabel = hasLabel;
      state.hasLabelSpecified = true;
    },

    clearHasLabel(state) {
      state.data.hasLabel = null,
          state.hasLabelSpecified = false;
    },

    setMapping(state, payload) {
      try {
        state.error = [];
        state.data.mappingResult = payload.map;
        state.data.dataDetail = payload.types;
        state.mappingFinished = true;
        var processedResult = processMapping(payload.map,
            payload.types,
            state.data.uploadedData,
            state.data.dbSchema,
            state.data.hasLabel);
        state.data.processedResult = processedResult;
      } catch (err) {
        state.error.push(err);
        state.mappingFinished = false;
        state.data.mappingResult = [];
        state.data.dataDetail = [];
        state.data.dataDetail = null;
        state.data.processedResult = [];
      }
    },

    clearMapping(state) {
      state.data.mappingResult = [];
      state.data.dataDetail = [];
      state.data.processedResult = [];
      state.mappingFinished = false;
      state.data.dataDetail = null;
    },

    setError(state, err) {
      state.error.push(err);
    },

    clearError(state) {
      state.error = [];
    }
  },

  actions: {
    async uploadMapping({commit, state}) {
      commit("setUploadingStatus", true);
      var endpoint;
      switch (state.data.tableType) {
        case 0:
          endpoint = "author";
          break;
        case 1:
          endpoint = "review";
          break;
        case 2:
          endpoint = "submission";
          break;
      }
      await axios.post("/api/record/" + endpoint, state.data.processedResult)
        .then(response => {
          commit("setUploadingStatus", false);
          commit("setUploadSuccess", true);
        })
        .catch(e => {
          commit("setUploadingStatus", false);
          commit("setUploadSuccess", false);
          commit("setError", e.toString());
        });
    }
  }
}