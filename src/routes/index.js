import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import { home, showlist, error404, main, login } from '@/view'
const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: main,
      children: [
        {
          path: '',
          component: home
        },
        {
          path: "/showlist",
          component: showlist
        }
      ]
    },
    {
      path: "/login",
      component: login
    }, {
      path: "*",
      component: error404
    }

  ]
})

export default router
import config from '@/config'
router.beforeEach((to, from, next) => {
  if(to.fullPath!=='/login'){
    if(!sessionStorage.getItem(config.KEY.CACHE_LOGIN_USER)){
      return next("/login")
    }
  }
  next()
})