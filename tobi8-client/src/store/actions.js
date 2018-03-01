import axios from 'axios'

export const getAllQuestions = ({commit, state}, payload) => {
  axios.get('http://35.231.64.99:3000/posts')
    .then(posts => {
      commit('getQuestions', posts.data.data)
    })
    .catch(err => {
      console.log(err)
    })
}
