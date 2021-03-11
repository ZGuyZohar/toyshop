<template>
    
<el-input @input="setFilter" placeholder="Search with a keyword" v-model="input"/>
</template>
    


<script>
export default {
  data() {
    return {
      input: ''
    }
  },
  methods: {
    setFilter(){    
        this.$emit('changeFilter', this.input, 'txt' )
    }
  }
}
</script>