<template>
  <div class="full">
    <small v-if="currUser">Welcome back, {{currUser.username}}<a @click="logout" href="#">Logout</a></small>
    <h1 class="logo">Toy Shop</h1>
    <h3>Welcome to the Toy Store!</h3>
    <p>Check out the toys we have to offer. We have a selection of games from the early 2000's, up to todays tik tok dolls.</p>
    
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'home',
  computed: {
    currUser(){
      return this.$store.state.currentUser
    }
  },
  methods: {
    logout(){
      this.$store.dispatch({type: 'logout'})
    }
  },
  components: {
  
  }
}
</script>
