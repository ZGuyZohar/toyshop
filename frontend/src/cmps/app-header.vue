<template>
    <nav class="nav-bar">
        <router-link to="/">Home</router-link> 
        <router-link to="/toy">Toys</router-link> 
        <router-link to="/toy/dashboard">Dashboard</router-link> 
        <a v-if="currUser" @click="logout">Logout</a> 
        <router-link else to="/login">Login</router-link> 
        <router-link to="/about">About</router-link>
    </nav>
</template>

<script>
export default {

    computed: {
        currUser(){
            return this.$store.currentUser
        }
    },
    methods: {
        logout(){
        this.$store.dispatch({type: 'logout'})
        }
    }
}
</script>
