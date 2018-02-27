<template lang="html">
  <div class="content">
    <h1>Hello, {{getUser.username}}</h1>
    <p><strong>Let's gain more knowledge</strong></p>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'getUser'
    ])
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
          self.$store.commit('setLogin', user.data.data)
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
