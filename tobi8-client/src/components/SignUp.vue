<template lang="html">
  <div class="modal" id='openModalSignUp'>
    <div class="modal-dialog show" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Register</h5>
          <button type="button" class="close" data-dismiss="modal" @click="eraseData" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <fieldset>
              <div class="form-group">
                <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                <input type="email" class="form-control" v-model='email' aria-describedby="emailHelp" placeholder="Enter email">
              </div>
              <div class="form-group">
                <input type="password" v-model="password" class="form-control" placeholder="Password">
              </div>
              <div class="form-group">
                <input type="text" v-model="username" class="form-control" placeholder="username">
              </div>
            </fieldset>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="submitSignUp">Register </button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal" @click='eraseData'>Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      email: null,
      password: null,
      username: null
    }
  },
  methods: {
    submitSignUp () {
      let self = this
      this.$http.post('/register', {
        email: self.email,
        password: self.password,
        username: self.username
      })
        .then(data => {
          this.login()
        })
    },
    login () {
      let self = this
      this.$http.post('/login', {
        email: self.email,
        password: self.password
      })
        .then(user => {
          localStorage.setItem('token', user.data.data[0])
          self.$store.commit('setLogin', user.data.data[1])
          self.eraseData()
          this.$swal({
            title: 'Good job!',
            text: 'Your account has been registered!',
            icon: 'success',
            button: 'Yeahh!'
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    eraseData () {
      this.email = null
      this.password = null
      this.username = null
    }
  }
}
</script>

<style lang="css">
</style>
