import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const store = () => {
  return new Vuex.Store({
    state: {
      questions: null,
      user: null
    },
    actions,
    mutations,
    getters
  })
}

export default store
