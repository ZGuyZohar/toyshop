<template>
    <nav class="nav-bar">
        <router-link to="/">Home</router-link> 
        <router-link to="/toy">Toys</router-link> 
        <router-link to="/toy/dashboard">Dashboard</router-link> 
        <a v-if="currUser" @click="logout" to="/">Logout</a> 
        <router-link v-else to="/login">Login</router-link> 
        <router-link v-if="currUser" to="/user/details">{{currUser.username}}</router-link>
        <router-link to="/about">About</router-link>
    </nav>
</template>

<script>
export default {

    computed: {
        currUser(){
            return this.$store.state.currentUser;
        }
    },
    methods: {
        logout(){
            this.$store.dispatch({type: 'logout'})
        }
    },
    created(){
        console.log(this.currUser);
    }
}
</script>
