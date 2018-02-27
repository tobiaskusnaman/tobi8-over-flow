<template lang="html">
  <div class="list-group">
    <router-link :to="{ path: '/post', params: {} }">
      <button type="button" class="btn btn-primary" style='margin-bottom:20px'>ask a question</button>
    </router-link>
    <a class="list-group-item list-group-item-action active">
      <span style="float:left">
        <strong>You have asked {{posts.length}} questions </strong>
      </span>
      <span style="float:right">
        <button class="btn btn-outline-primary" @click="getModify()">Modify</button>
      </span>
    </a>
    <!-- <router-link v-for="(post, i) in posts" :key='post._id' class="list-group-item list-group-item-action" :to="{ path: `${post._id}/edit`, params: {postId: post._id} }"> -->
    <a v-for="(post, i) in posts" :key='post._id' class="list-group-item list-group-item-action">
      <span style="float:left">
        <router-link :to="{ path: `/post/${post._id}`, params: {postId: post._id} }" style="color:black">{{post.question}}</router-link>
      </span>
      <span class="pull-right" style="float:right">
        <button v-if="modify" type="button" class="btn btn-outline-primary" @click="editPost(post._id)">Edit</button>
        <button v-if="modify" type="button" class="btn btn-outline-danger" @click="deletePost(post._id)">X</button>
      </span>
    </a>
    <!-- </router-link> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: function () {
    return {
      posts: null,
      modify: false
    }
  },
  computed: {
    ...mapGetters([
      'getUser'
    ])
  },
  methods: {
    getModify () {
      this.modify = !this.modify
    },
    findByUserId (userId) {
      let self = this
      this.$http.get(`posts/user/${userId}`)
        .then(posts => {
          self.posts = posts.data.post
        })
        .catch(err => {
          console.log(err)
        })
    },
    editPost (postId) {
      this.$router.push(`user/${postId}/edit`)
    },
    deletePost (postId) {
      this.$swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover your post!',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            this.$store.commit('deletePost', postId)
            this.$http.delete(`posts/${postId}`)
              .then(postDelete => {
                this.$swal('Poof! Your post has been deleted!', {
                  icon: 'success'
                })
                console.log(postDelete)
              })
              .catch(err => {
                console.log(err)
              })
          } else {
            this.$swal('Your post is safe!')
          }
        })
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
  },
  watch: {
    '$store.state.questions': function (val) {
      this.posts = this.$store.state.questions
    }
  }
}
</script>

<style lang="css">
</style>
