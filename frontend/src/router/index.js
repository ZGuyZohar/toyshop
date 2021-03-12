import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home'
import about from '../views/about'
import toyApp from '../views/toy-app'
import toyEdit from '../views/toy-edit'
import toyDetails from '../views/toy-details'
import dashboard from '../views/dashboard'
import login from '../views/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: home
  },
  {
    path: '/toy',
    component: toyApp
  },
  {
    path: '/toy/details/:toyId',
    name: 'Details',
    component: toyDetails
  },
  {
    path: '/toy/edit/:toyId?',
    name: 'Edit',
    component: toyEdit
  },
  {
    path: '/toy/dashboard',
    name: 'Dashboard',
    component: dashboard
  },
  {
    path: '/about',
    name: 'About',
    component: about
  },
  {
    path: '/login',
    name: 'Login',
    component: login
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
