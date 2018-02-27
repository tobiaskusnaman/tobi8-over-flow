<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand" href="#">tobi8-overflow</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ path: '/', params: {} }"> Home </router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" data-target="#openModalSignUp" data-toggle="modal">Sign Up</a>
          </li>
          <li v-if="isLogin" class="nav-item">
            <router-link class="nav-link" :to="{ path: '/user', params: {} }"> My Question </router-link>
          </li>
          <li class="nav-item">
            <a v-if="!isLogin" class="nav-link" data-target="#openModal" data-toggle="modal">Login</a>
            <a v-else="isLogin" class="nav-link" @click='logout'>LogOut</a>
          </li>
        </ul>
      </div>
    </nav>
    <main>
      <div class="container">
        <router-view></router-view>
      </div>
    </main>
    <Login/>
    <SignUp/>
  </div>
</template>

<script>
import store from '@/store/index.js'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
export default {
  name: 'app',
  store,
  components: {
    Login,
    SignUp
  },
  data: function () {
    return {
      isLogin: false
    }
  },
  methods: {
    logout () {
      this.isLogin = false
      localStorage.clear()
      this.$store.commit('setLogin', null)
    }
  },
  created: function () {
    if (localStorage.getItem('token')) {
      this.isLogin = true
    }
    this.$store.dispatch('getAllQuestions')
  },
  watch: {
    '$store.state.user': function (val) {
      if (val) {
        this.isLogin = true
      }
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
