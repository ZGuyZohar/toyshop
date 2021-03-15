import Vue from 'vue'
import Vuex from 'vuex'
import toyStore from './toy-store.js'
import reviewStore from './review-store.js'
import {socketStore} from './socket-store.js'
import {userService} from '../services/user-service.js'
import router from '../router'


Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    currentUser: JSON.parse(sessionStorage.getItem('currentUser')) || null  
  },
  getters: {
    currUser(state){
      return state.currentUser
    }
  },
  mutations: {
    setCurrUser(state, {currUser}){
      state.currentUser = currUser
      sessionStorage.setItem('currentUser', JSON.stringify(currUser))
    },
    logout(state){
      state.currentUser = null
      sessionStorage.setItem('currentUser', null)
    }
  },
  actions: {
    async login({commit}, {user}){
      try {
        const currUser = await userService.login(user)
        commit({type: 'setCurrUser', currUser})
        router.push('/')
      } catch(err) {
        return err
      }
    },
    async logout({commit}){
      await userService.logout();
      commit({type: 'logout'})
    }
  },
  modules: {
    toyStore,
    reviewStore,
    socketStore
  }
})
