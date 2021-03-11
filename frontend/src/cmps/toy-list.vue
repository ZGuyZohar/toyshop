<template>
    <ul class="list">
        <li class="preview-container">
            <span><b @click="setSort('name')" class="sort">Name</b></span>
            <span> <b @click="setSort('price')" class="sort">Price</b></span>
            <span></span>
            <span></span> 
            <span></span> 
        </li>
        <toy-preview v-for="toy in toys" :toy="toy" :key="toy._id"/>
    </ul>
</template>

<script>
import toyPreview from '@/cmps/toy-preview.vue'
export default {
    props: {
        toys: {type: Array}
    },
    data(){
        return {
        }
    },
    methods: {
        setSort(type){
            this.$store.commit({ type: 'setSort', sortBy: type})
        }
    },
    components: {
        toyPreview
    }
}
</script>
