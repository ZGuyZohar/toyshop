<template>
  <el-select @change="setFilter" v-model="value" placeholder="Select">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: 'all',
          label: 'All'
        }, {
          value: 'girl',
          label: 'Girl'
        }, {
          value: 'boy',
          label: 'Boy'
        }, {
          value: 'tcg',
          label: 'TCG'
        }, {
          value: 'action',
          label: 'Action'
        },{
          value: 'funny',
          label: 'Funny'
        }],
        value: 'All'
      }
    },
    methods: {
      setFilter(){    
        this.$emit('changeFilter', this.value, 'category' )
      }
    }
  }
</script>