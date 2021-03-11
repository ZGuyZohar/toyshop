<template>
  <section class="toy-app">
      <h1>Welcome to the toy store! <router-link class="add" to="/toy/edit">Add new toy</router-link></h1>
      <h3>Here is the list of your toys</h3>
        <toy-filter />
        <toy-list :toys="toys" />
  </section>
</template>

<script>
// @ is an alias to /src
import toyList from '@/cmps/toy-list.vue'
import toyFilter from '@/cmps/toy-filter.vue'
export default {
    name: 'toy-app',
    computed: {
        toys(){
            return this.$store.getters.toysToShow
        },

    },
    components: {
        toyList,
        toyFilter
    }
}
</script>
