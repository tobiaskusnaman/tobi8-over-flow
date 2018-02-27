export default {
  getQuestions: (state, payload) => {
    state.questions = payload
  },
  setLogin: (state, payload) => {
    state.user = payload
  },
  addPost: (state, payload) => {
    state.questions.push(payload)
  },
  deletePost: (state, payload) => {
    let index = state.questions.findIndex(e => {
      return e._id === payload
    })
    state.questions.splice(index, 1)
  },
  addAnswer: (state, payload) => {
    let index = state.questions.findIndex(e => {
      return e._id === payload._id
    })
    state.questions.splice(index, 1, payload)
  },
  voteAnswer: (state, payload) => {
    // let index = state.questions.
  }
}
