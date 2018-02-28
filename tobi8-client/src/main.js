// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(axios)

Vue.prototype.$http = axios.create({
  baseURL: 'http://35.231.64.99/'
})
Vue.prototype.$swal = swal
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
