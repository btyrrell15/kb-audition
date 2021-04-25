import Vue from 'vue'
import VueRouter from 'vue-router'
// import Store from './store'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Performer from '../views/Performer.vue'
import Dashboard from '../views/Dashboard.vue'
import Audition from '../views/Audition.vue'
import Account from '../views/Account.vue'
import Scores from '../views/Scores.vue'
import List from '../views/List.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/performer',
    name: 'Performer',
    component: Performer,
    beforeEnter: (to, from, next) => {      
      if(localStorage.getItem('token')){
        next();
      }else{ 
        next('/');
      }
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {      
      if(localStorage.getItem('token')){
        next();
      }else{ 
        next('/');
      }
    }
  },
  {
    path: '/audition',
    name: 'Audition',
    component: Audition,
    beforeEnter: (to, from, next) => {      
      if(localStorage.getItem('token')){
        next();
      }else{ 
        next('/');
      }
    }
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    beforeEnter: (to, from, next) => {      
      if(localStorage.getItem('token')){
        next();
      }else{ 
        next('/');
      }
    }
  },
  {
    path: '/scores',
    name: 'Scores',
    component: Scores,
    beforeEnter: (to, from, next) => {      
      if(localStorage.getItem('token')){
        next();
      }else{ 
        next('/');
      }
    }
  },
  {
    path: '/list',
    name: 'List',
    component: List,
    beforeEnter: (to, from, next) => {      
      if(localStorage.getItem('token')){
        next();
      }else{ 
        next('/');
      }
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
