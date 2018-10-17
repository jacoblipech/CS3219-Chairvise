import axios from 'axios'
import { processMapping } from '../helpers/processor.js'

export default {
  state: {
		dbSchemaSetted: false,
    fileUploaded: false,
		tableTypeSelected: false,
		hasLabelSpecified: false,
		mappingFinished: false,
		data: {
			dbSchema: [],
			uploadedData: [],
			uploadedLabel: [],
			mappingResult: [],
			dataDetail: [],
			tableType: null,
			hasLabel: null
		},
		error: []
  },

  mutations: {
    setUploadedFile(state, data) {
			state.data.uploadedLabel = data[0];
			state.data.uploadedData = data;
    	state.fileUploaded = true;
		},
		
		clearUploadedFile(state) {
			state.data.uploadedLabel = [];
			state.data.uploadedData = [];
			state.fileUploaded = false;
		},

		setDBSchema(state, dbSchema) {
			state.data.dbSchema = dbSchema;
    	state.dbSchemaSetted = true;
		},
		
		clearDBSchema(state) {
			state.data.dbSchema = [];
    	state.dbSchemaSetted = false;
		},

    setTableType(state, selected) {
			state.data.tableType = selected;
			state.tableTypeSelected = true;
		},
		
		clearTableType(state) {
			state.data.tableType = null,
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
			state.error = [];
			state.data.mappingResult = payload.map;
			state.data.dataDetail = payload.types;
			state.mappingFinished = true;
			try {
				processMapping(payload.map, payload.types, state.data.uploadedData, state.data.dbSchema);
			} catch (err) {
				state.error.push(err);
				state.mappingFinished = false;
				state.data.mappingResult = [];
				state.data.dataDetail = [];
				state.data.dataDetail = null;
			}
		},
		
		clearMapping(state) {
			state.data.mappingResult = [];
			state.data.dataDetail = [];
			state.mappingFinished = false;
			state.data.dataDetail = null;
		}
  },

  actions: {
  }
}