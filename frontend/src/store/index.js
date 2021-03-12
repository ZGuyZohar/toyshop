import Vue from 'vue'
import Vuex from 'vuex'
import toyStore from './toy-store.js'
import {userService} from '../services/user-service.js'
import router from '../router'


Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    currentUser: null
  },
  getters: {
    currUser(state){
      return state.currentUser
    }
  },
  mutations: {
    setCurrUser(state, {currUser}){
      state.currentUser = currUser
    },
    logout(state){
      state.currentUser = null
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
    toyStore
  }
})
