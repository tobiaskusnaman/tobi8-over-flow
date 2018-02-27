export default {
  getQuestions: (state, payload) => {
    state.questions = payload
  },
  setLogin: (state, payload) => {
    state.user = payload
  }
}
