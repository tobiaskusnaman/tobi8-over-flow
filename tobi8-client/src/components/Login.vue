<template lang="html">
  <div class="modal" id='openModal'>
    <div class="modal-dialog show" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Login</h5>
          <button type="button" class="close" data-dismiss="modal" @click="eraseData" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <fieldset>
              <div class="form-group">
                <input type="email" class="form-control" v-model='email' aria-describedby="emailHelp" placeholder="Enter email">
                <small class="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div class="form-group">
                <input type="password" v-model="password" class="form-control" placeholder="Password">
              </div>
            </fieldset>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="submitLogin">Login </button>
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
      password: null
    }
  },
  methods: {
    eraseData () {
      this.email = null
      this.password = null
    },
    submitLogin () {
      let self = this
      this.$http.post('/login', {
        email: self.email,
        password: self.password
      })
        .then(user => {
          self.eraseData()
          localStorage.setItem('token', user.data.data[0])
          self.$store.commit('setLogin', user.data.data[1])
          self.eraseData()
          this.$swal({
            title: 'Good job!',
            text: 'You have logged in!',
            icon: 'success',
            button: 'Aww yiss!'
          })
        })
        .catch(err => {
          self.eraseData()
          console.log(err)
          this.$swal({
            title: 'Oh no!',
            text: 'Incorrect username or password!',
            icon: 'warning',
            button: 'Try again!'
          })
        })
    }
  }
}
</script>

<style lang="css">
</style>
