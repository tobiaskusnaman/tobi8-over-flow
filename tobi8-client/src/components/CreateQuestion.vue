<template lang="html">
  <div class="container">
  <fieldset>
    <legend>WHAT DO YOU WANT TO KNOW?</legend>
    <p v-if="helper"> {{msg}}</p>
    <div class="form-group">
      <input type="text" v-model="question" class="form-control" aria-describedby="emailHelp" placeholder="Enter a question">
      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
    </div>
    <div class="form-group">
      <textarea class="form-control" v-model="description" rows="10" placeholder="Detail question"></textarea>
    </div>
    <button type="submit" class="btn btn-primary" @click="ask">ASK QUESTION</button>
  </fieldset>
</form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: function () {
    return {
      posts: null,
      question: null,
      description: null,
      msg: null,
      helper: false
    }
  },
  computed: {
    ...mapGetters([
      'getUser'
    ])
  },
  methods: {
    findByUserId (userId) {
      let self = this
      this.$http.get(`posts/${userId}`)
        .then(posts => {
          self.posts = posts.data.post
        })
        .catch(err => {
          console.log(err)
        })
    },
    ask () {
      if (this.question !== null && this.description !== null) {
        let self = this
        this.$http.post('/posts', {
          question: self.question,
          description: self.description
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(post => {
            this.$swal({
              title: 'Good job!',
              text: 'Your question has been posted!',
              icon: 'success',
              button: 'Nice!'
            })
            self.question = null
            self.description = null
            self.$router.push('/user')
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.helper = true
        this.msg = '* question and description can not be empty'
      }
    }
  },
  created: function () {
    let self = this
    if (localStorage.getItem('token')) {
      this.$http.get('/getInfo', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(user => {
          this.$store.commit('setLogin', user.data.data)
          self.findByUserId(user.data.data._id)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="css">
</style>
