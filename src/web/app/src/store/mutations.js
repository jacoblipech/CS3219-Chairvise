export default {
  setPageLoadingStatus(state, payload) {
    state.isPageLoading = payload;
  },
  setRenderForPDF(state, isForPDF) {
    state.isRenderForPDF = isForPDF;
  }
}