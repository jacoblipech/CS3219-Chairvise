import axios from 'axios'

export default {
  state: {
    sectionList: [
      {
        id: '1',
        type: 'word_cloud',
        title: 'Word Cloud for All Submissions',
        dataSet: 'test@example.com',
        selections: [
          {
            field: 's_keywords'
          }
        ],
        involvedRecords: [
          {
            name: 'submission_record'
          }
        ],
        filters: [],
        result: [],
        tmpResult: [],
        status: {
          isLoading: true,
          isApiError: false,
          apiErrorMsg: '',
        }
      }
    ],
    sectionListStatus: {
      isLoading: true,
      isApiError: false,
      apiErrorMsg: '',
    }
  },
  mutations: {
    setSectionDetailLoading(state, {id, isLoading}) {
      let section = findSectionDetailById(state.sectionList, id);
      section.status.isApiError = false;
      section.status.isLoading = isLoading;
    },

    setSectionDetailApiError(state, {id, msg}) {
      let section = findSectionDetailById(state.sectionList, id);
      section.status.isApiError = true;
      section.status.apiErrorMsg = msg;
    },

    updateSectionAnalysisResult(state, {id, result}) {
      let section = findSectionDetailById(state.sectionList, id);
      section.result = result;
    },

    updateSectionAnalysisPreviewResult(state, {id, result}) {
      let section = findSectionDetailById(state.sectionList, id);
      section.previewResult = result;
    }
  },
  actions: {
    async sendPreviewAnalysisRequest({state, commit}, {id, dataSet, selections, involvedRecords, filters, joiners}) {
      commit('setSectionDetailLoading', {id, isLoading: true});

      await axios.post('/api/analysis', {
        dataSet,
        selections,
        involvedRecords,
        filters,
        joiners,
      })
        .then(response => {
          commit('updateSectionAnalysisPreviewResult', {id, result: response.data});
        })
        .catch(e => {
          commit('setSectionDetailApiError', {id, msg: e.toString()});
        })
        .finally(() => {
          commit('setSectionDetailLoading', {id, isLoading: false});
        })
    },

    async sendAnalysisRequest({state, commit}, payload) {
      let sectionToAnalysis = findSectionDetailById(state.sectionList, payload);
      commit('setSectionDetailLoading', {id: sectionToAnalysis.id, isLoading: true});

      await axios.post('/api/analysis', {
        dataSet: sectionToAnalysis.dataSet,
        selections: sectionToAnalysis.selections,
        involvedRecords: sectionToAnalysis.involvedRecords,
        filters: sectionToAnalysis.filters,
        joiners: sectionToAnalysis.joiners,
      })
        .then(response => {
          commit('updateSectionAnalysisResult', {id: sectionToAnalysis.id, result: response.data});
        })
        .catch(e => {
          commit('setSectionDetailApiError', {id: sectionToAnalysis.id, msg: e.toString()});
        })
        .finally(() => {
          commit('setSectionDetailLoading', {id: sectionToAnalysis.id, isLoading: false});
        })
    }
  }
}

function findSectionDetailById(sectionList, id) {
  return sectionList.find(element => element.id === id);
}