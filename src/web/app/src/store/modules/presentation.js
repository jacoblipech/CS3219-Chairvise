import axios from 'axios'

export default {
  state: {
    presentationList: [],
    presentationListStatus: {
      isLoading: true,
      isApiError: false,
      apiErrorMsg: '',
    },
    presentationForm: {
      id: '',
      name: '',
      description: '',
      creatorIdentifier: '',
      accessControlList: [],
    },
    shareForm: {
      email: '',
      accessLevel: '',
    },
    presentationFormStatus: {
      isLoading: false,
      isApiError: false,
      apiErrorMsg: '',
    },
  },
  mutations: {
    setPresentationListLoading(state, payload) {
      state.presentationListStatus.isLoading = payload;
    },

    setPresentationListApiError(state, payload) {
      state.presentationListStatus.isApiError = true;
      state.presentationListStatus.apiErrorMsg = payload;
    },

    setPresentationList(state, payload) {
      state.presentationList = payload;
    },

    addToPresentationList(state, payload) {
      state.presentationList.push(payload);
    },

    deleteFromPresentationList(state, payload) {
      const index = state.presentationList.findIndex(presentation => presentation.id === payload );
      state.presentationList.splice(index, 1)
    },

    updatePresentationListWith(state, payload) {
      state.presentationList = state.presentationList.map(presentation => {
        if (presentation.id === payload.id) {
          return payload
        }
        return presentation
      });
    },

    setPresentationFormLoading(state, isLoading) {
      state.presentationFormStatus.isLoading = isLoading;
    },

    setPresentationFormApiError(state, msg) {
      state.presentationFormStatus.isApiError = true;
      state.presentationFormStatus.apiErrorMsg = msg;
    },

    setPresentationForm(state, payload) {
      state.presentationForm = payload;
    },

    resetPresentationForm(state) {
      state.presentationForm.id = '';
      state.presentationForm.name = '';
      state.presentationForm.description = '';
      state.presentationForm.creatorIdentifier = '';
    },

    setPresentationFormField(state, {field, value}) {
      state.presentationForm[field] = value
    },

    setShareFormField(state, {field, value}) {
      state.shareForm[field] = value
    },
  },
  actions: {
    async getPresentationList({ commit }) {
      commit('setPresentationListLoading', true);
      axios.get('/api/presentations')
          .then(response => {
            commit('setPresentationList', response.data)
          })
          .catch(e => {
            commit('setPresentationListApiError', e.toString());
          })
          .finally(() => {
            commit('setPresentationListLoading', false);
          })
    },

    async getPresentation({commit}, payload) {
      commit('setPresentationFormLoading', true);
      axios.get('/api/presentations/' + payload)
          .then(response => {
            commit('setPresentationForm', response.data)
          })
          .catch(e => {
            commit('setPresentationFormApiError', e.toString());
          })
          .finally(() => {
            commit('setPresentationFormLoading', false);
          })
    },

    async savePresentation({ commit, state }) {
      commit('setPresentationFormLoading', true);
      await axios.post('/api/presentations', state.presentationForm)
          .then(response => {
            commit('addToPresentationList', response.data);
            commit('setPresentationForm', response.data)
          })
          .catch(e => {
            commit('setPresentationFormApiError', e.toString());
          })
          .finally(() => {
            commit('setPresentationFormLoading', false);
          })
    },

    async updatePresentation({ commit, state }) {
      commit('setPresentationFormLoading', true);
      await axios.put('/api/presentations/' + state.presentationForm.id, state.presentationForm)
          .then(response => {
            commit('updatePresentationListWith', response.data)
          })
          .catch(e => {
            commit('setPresentationFormApiError', e.toString());
          })
          .finally(() => {
            commit('setPresentationFormLoading', false);
          })
    },

    async sharePresentation({ commit, state }, payload) {
      commit('setPresentationFormLoading', true);
      await axios.put('/api/presentations/' + payload.id + '/accessControl/' + payload.email + '/' + payload.accessLevel, state.presentationForm)
          .then(response => {
            commit('setPresentationForm', response.data);
            commit('updatePresentationListWith', response.data)
          })
          .catch(e => {
            commit('setPresentationFormApiError', e.toString());
          })
          .finally(() => {
            commit('setPresentationFormLoading', false);
          })
    },

    async removePermissions({ commit, state }, payload) {
      commit('setPresentationFormLoading', true);
      await axios.put('/api/presentations/' + payload.id + '/' + payload.email, state.presentationForm)
          .then(response => {
            commit('setPresentationForm', response.data);
            commit('updatePresentationListWith', response.data)
          })
          .catch(e => {
            commit('setPresentationFormApiError', e.toString());
          })
          .finally(() => {
            commit('setPresentationFormLoading', false);
          })
    },

    async updatePermissions({ commit, state }, payload) {
      commit('setPresentationFormLoading', true);
      await axios.put('/api/presentations/' + payload.id + '/newAccessControl/' + payload.email + '/' + payload.accessLevel, state.presentationForm)
          .then(response => {
            commit('setPresentationForm', response.data);
            commit('updatePresentationListWith', response.data)
          })
          .catch(e => {
            commit('setPresentationFormApiError', e.toString());
          })
          .finally(() => {
            commit('setPresentationFormLoading', false);
          })
    },

    async deletePresentation({ commit }, payload) {
      commit('setPresentationFormLoading', true);
      await axios.delete('/api/presentations/' + payload)
          .then(() => {
            commit('deleteFromPresentationList', payload);
            commit('resetPresentationForm')
          })
          .catch(e => {
            commit('setPresentationFormApiError', e.toString());
          })
          .finally(() => {
            commit('setPresentationFormLoading', false);
          })
    }
  }
};