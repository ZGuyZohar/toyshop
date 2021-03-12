<template>
  <form @submit.prevent="login">
      <input type="text" v-model="user.username" placeholder="Username">
      <input type="password" v-model="user.password" placeholder="Password">
      <button>Log in</button>
  </form>
</template>

<script>
export default {
    data(){
        return {
            user : {
                username: '',
                password: ''
            }
        }
    },
    methods:{
        login(){
            this.$store.dispatch({type: 'login', user: this.user})
        }
    }
}
</script>
