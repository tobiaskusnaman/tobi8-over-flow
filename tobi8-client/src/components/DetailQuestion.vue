<template lang="html">
  <div class="content">
    <div class="jumbotron">
      <h2 >{{post.question}}</h2>
      <hr class="my-4">
      <p>{{post.description}}</p>
    </div>
    <p >
      <div class="row-centered">
        <button type="button" data-target="#answerModal" data-toggle="modal" class="btn btn-primary">Answer</button>
      </div>
    </p>
    <div class="list-group"  v-for='answer in post.comment'>
      <div class="row">
        <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
          <p class="mb-1">{{answer.comment}}</p>
          <small class="text-muted">by: {{answer.username}} </small>
        </a>
      </div>
    </div>
    <div class="modal" id='answerModal'>
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">What's on your mind ?</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>{{post.question}}</p>
            <div class="row">
              <textarea class="form-control" v-model="answer" id="exampleTextarea" rows="10" placeholder="write your answer here"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="answerQuestion" data-dismiss="modal">Answer</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      post: null,
      answer: null
    }
  },
  methods: {
    getPostById () {
      let self = this
      this.$http.get(`/posts/${this.$route.params.id}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(post => {
          self.post = post.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    answerQuestion () {
      if (localStorage.getItem('token')) {
        let self = this
        this.$http.get('/getInfo', {
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(user => {
            this.$http.post(`/posts/${this.$route.params.id}/comment`, {
              comment: self.answer,
              username: user.data.data.username
            }, {
              headers: {
                token: localStorage.getItem('token')
              }
            })
              .then(answer => {
                this.$swal({
                  title: 'Well Done !',
                  text: 'Thank you for your answer!',
                  icon: 'success',
                  button: 'Okay!'
                })
                this.$store.commit('addAnswer', answer.data.data)
              })
              .catch(err => {
                console.log(err)
              })
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.$swal({
          title: 'Wait!',
          text: 'You need to login to give answer!',
          icon: 'warning',
          button: 'Okay!'
        })
      }
    }
  },
  created: function () {
    this.getPostById()
  },
  watch: {
    '$store.state.questions': function () {
      this.getPostById()
    }
  }
}
</script>

<style lang="css">
</style>
