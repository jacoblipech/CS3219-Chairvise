import axios from 'axios'
import { processRawCSVString, processMapping } from '../helpers/processor.js'

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
			tableType: null,
			hasLabel: null
		}
  },

  mutations: {
    setUploadedFile(state, uploadedFileString) {
			var processed = processRawCSVString(uploadedFileString);
			state.data.uploadedLabel = processed[0];
			state.data.uploadedData = processed[1];
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
		
		setMapping(state, mapping) {
			state.data.mapping = mapping;
			state.mappingFinished = true;
			processMapping(mapping, state.data.uploadedData, state.data.dbSchema);
		},
		
		clearMapping(state) {
			state.data.mappingResult = [];
			state.mappingFinished = false;
		}
  },

  actions: {
  }
}