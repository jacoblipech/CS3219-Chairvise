export default {
  setPageLoadingStatus(state, payload) {
    state.isPageLoading = payload;
  },
  setDataProcessingStatus(state, payload) {
    state.isDataProcessing = payload;
  },
  setUploadingStatus(state, payload) {
    state.isUploading = payload;
  }
}