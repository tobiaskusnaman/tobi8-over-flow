<template>
  <div class="hello">
    <h1>HOME PAGE</h1>
    <div class="card bg-light mb-3" style="width: 100%;">
      <div class="card-header">Questions</div>
      <div class="card bg-light mb-3" style="width: 100%;margin-bottom:0px!important">
        <div class="card-body">
              <h4 class="card-title">Title</h4>
              <p class="card-text">detik, by</p>
              Vote
        </div>
      </div>
      <div class="card bg-light mb-3" style="width: 100%;margin-bottom:0px!important">
        <div class="card-body">
              <h4 class="card-title">Title</h4>
              <p class="card-text">detik, by</p>
              Vote
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'getQuestions'
    ])
  },
  created: function () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
