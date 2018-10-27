export default {
  setPageLoadingStatus(state, payload) {
    state.isPageLoading = payload;
  },
  setRenderForPDF(state, isRenderForPDF) {
    state.isRenderForPDF = isRenderForPDF;
  }
}