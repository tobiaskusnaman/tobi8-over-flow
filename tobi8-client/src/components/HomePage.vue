<template>
  <div class="hello">
    <h1 v-if="!isLogin">HOME PAGE</h1>
      <h1 v-else>Welcome, {{getUser.username}}</h1>
      <router-link :to="{ path: '/user', params: {} }">
        <button type="button" class="btn btn-primary" style='margin-bottom:20px'>My Questions</button>
      </router-link>
      <router-link :to="{ path: '/post', params: {} }">
        <button type="button" class="btn btn-primary" style='margin-bottom:20px'>ask a question</button>
      </router-link>
    <div class="card bg-light mb-3" style="width: 100%;">
      <div class="card-header">Questions</div>
      <div v-for="question in getQuestions"class="card bg-light mb-3" style="width: 100%;margin-bottom:0px!important">
        <div class="card-body">
              <h4 class="card-title">{{question.question}}</h4>
              <p class="card-text"> by {{question.userId.username}}</p>
              <button type="button" class="btn btn-primary">Vote</button>
              [JUMLAH]
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
