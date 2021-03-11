<template>
    <li class="preview-container">
        <span>{{toy.name}} </span>
        <span> ${{toy.price}} </span>
        <router-link class="prev-btn details" :to="'/toy/details/' + toy._id">Details</router-link>
        <router-link class="prev-btn edit" :to="'/toy/edit/' + toy._id">Edit</router-link>
        <button class="prev-btn remove" @click="removeToy">Remove</button>

    
    <!-- <el-row>
  <el-button circle>circle</el-button>
  <el-button type="primary" circle></el-button>
  <el-button type="success" circle>Success</el-button>
  <el-button type="info" circle>Info</el-button>
  <el-button type="warning" circle>Warning</el-button>
  <el-button type="danger" circle>Danger</el-button>
</el-row> -->
    </li>
    
</template>

<script>
export default {
    name: 'toy-preview',
    props: {
        toy: {
            type: Object
        }
    },
    methods: {
        removeToy(){
            this.$store.dispatch({type: 'removeToy', toyId: this.toy._id})
        }
    }
}
</script>
