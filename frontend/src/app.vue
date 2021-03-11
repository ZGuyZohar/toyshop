<template>
  <div class="container">
    <app-header/>
    <user-msg />
    <router-view/>
  </div>
</template>

<script>
import userMsg from '@/cmps/user-msg'
import appHeader from './cmps/app-header'
export default {
  data() {
    return {
      
    }
  },
  created(){
    this.$store.dispatch({type: 'loadToys'})
  },
  components: {
    userMsg,
    appHeader
  }
}
</script>

<style lang="scss">
</style>

