<template>
  <!-- `checked` should be true or false -->
  <el-checkbox @change="setFilter" v-model="checked"> Show only in stock</el-checkbox>
</template>
<script>
  export default {
    data() {
      return {
        checked: false
      };
    },
    methods: {
      setFilter(){    
        this.$emit('changeFilter', this.checked, 'inStock' )
      }
    }
  };
</script>