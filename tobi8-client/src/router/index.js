import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import CreateQuestion from '@/components/CreateQuestion'
import UserPage from '@/components/UserPage'
import EditPost from '@/components/EditPost'
import ListPost from '@/components/ListPost'
import DetailQuestion from '@/components/DetailQuestion'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/post',
      component: CreateQuestion
    },
    {
      path: '/post/:id',
      component: DetailQuestion
    },
    {
      path: '/user',
      component: UserPage,
      children: [
        {
          path: ':postId/edit',
          component: EditPost
        },
        {
          path: '',
          component: ListPost,
          props: true
        }
      ]
    },
    {
      path: '/',
      name: 'Hello',
      component: HomePage
    }
  ]
})
