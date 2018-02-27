<template>
  <div class="hello">
    <h1 v-if="!isLogin">HOME PAGE</h1>
      <h1 v-else>Welcome, {{getUser.username}}</h1>
      <div class="" v-if="isLogin">
        <router-link :to="{ path: '/user', params: {} }">
          <button type="button" class="btn btn-primary" style='margin-bottom:20px'>My Questions</button>
        </router-link>
        <router-link :to="{ path: '/post', params: {} }">
          <button type="button" class="btn btn-primary" style='margin-bottom:20px'>ask a question</button>
        </router-link>
      </div>
    <div class="card bg-light mb-3" style="width: 100%;">
      <div class="card-header">Questions</div>
      <div class="row" v-for="question in getQuestions" style="margin:10px;text-align:left">
        <div class="col-sm-1">
          {{question.votes.length}}
          <button type="button" class="btn btn-primary" @click="voteQuestion(question._id)">Vote</button>
        </div>
        <div class="col-sm-11">
          <div class="card bg-light mb-3" style="margin-bottom:0px!important">
            <div class="card-body">
              <router-link class="card-title" :to="{ path: `post/${question._id}`, params: { postId : question._id} }">
                <h4 >{{question.question}}</h4>
              </router-link>
              <p class="card-text"> by {{question.userId.username}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      isLogin: false
    }
  },
  computed: {
    ...mapGetters([
      'getQuestions',
      'getUser'
    ])
  },
  methods: {
    voteQuestion (questionId) {
      let self = this
      this.$http.post(`posts/${this.$store.state.user._id}/post/${questionId}/vote`)
        .then(questionVoted => {
          self.$store.dispatch('getAllQuestions')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  watch: {
    'getUser': function (val) {
      if (val) {
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    }
  },
  created: function () {
    if (localStorage.getItem('token')) {
      this.$http.get('/getInfo', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(user => {
          this.$store.commit('setLogin', user.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
