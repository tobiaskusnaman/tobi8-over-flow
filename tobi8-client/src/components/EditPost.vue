<template lang="html">
  <div class="container">
  <fieldset v-if="isEdit">
    <p> {{msg}}</p>
    <div class="form-group">
      <input type="text" v-model="question" class="form-control" aria-describedby="emailHelp" placeholder="Enter a question">
      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
    </div>
    <div class="form-group">
      <textarea class="form-control" v-model="description" rows="10" placeholder="Detail question"></textarea>
    </div>
  </fieldset>

  <fieldset v-else disabled="">
    <p> {{msg}}</p>
    <div class="form-group">
      <input type="text" v-model="question" class="form-control" aria-describedby="emailHelp" placeholder="Enter a question">
      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
    </div>
    <div class="form-group">
      <textarea class="form-control" v-model="description" rows="10" placeholder="Detail question"></textarea>
    </div>
  </fieldset>

  <button v-if="!isEdit" type="submit" class="btn btn-primary" @click="startEdit">EDIT</button>
  <div class="" v-else>
    <button type="button" class="btn btn-outline-primary" @click="editPost">Save Changes</button>
    <button type="button" class="btn btn-outline-secondary" @click="cancelEdit">Cancel</button>
  </div>

  </div>
</template>

<script>
export default {
  data: function () {
    return {
      question: null,
      description: null,
      isEdit: false,
      msg: 'To edit your post please click edit button first'
    }
  },
  methods: {
    getArticleById () {
      let self = this
      this.$http.get(`posts/${this.$route.params.postId}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(post => {
          self.question = post.data.data.question
          self.description = post.data.data.description
        })
        .catch(err => {
          console.log(err)
        })
    },
    startEdit () {
      this.isEdit = true
    },
    cancelEdit () {
      this.$router.push(`/user`)
    },
    editPost () {
      let self = this
      this.$http.put(`posts/${this.$route.params.postId}`, {
        question: self.question,
        descriptor: self.description
      })
        .then(editedPost => {
          this.$swal({
            title: 'Edit successfully!',
            text: 'your post has been edited!',
            icon: 'success',
            button: 'Wow!'
          })
          this.$router.push(`/user`)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created: function () {
    this.getArticleById()
    // console.log('INI PARAMs', this.$route.params.postId)
    // let self = this
    // if (localStorage.getItem('token')) {
    //   this.$http.get('/getInfo', {
    //     headers: {
    //       token: localStorage.getItem('token')
    //     }
    //   })
    //     .then(user => {
    //       this.$store.commit('setLogin', user.data.data)
    //       self.findByUserId(user.data.data._id)
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // }
  }
}
</script>

<style lang="css">
</style>
