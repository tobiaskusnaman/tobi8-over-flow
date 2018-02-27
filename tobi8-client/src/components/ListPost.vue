<template lang="html">
  <div class="list-group">
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
        <router-link :to="{ name: '', params: {} }" style="color:black">{{post.question}}</router-link>
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
      console.log('ADSJBFDLSAFLDASKFDLSA')
      this.$router.push(`user/${postId}/edit`)
      console.log(postId)
    },
    deletePost (postId) {
      console.log(postId)
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
