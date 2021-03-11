<template >
  <section v-if="toy">
    <h1>Toy details:</h1>
    <ul>
        <li><b>Name:</b>{{toy.name}}</li>
        <li><b>Price:</b>{{toy.price}}</li>
        <li><b>In stock?</b> {{isInStock}}</li>
        <li><b>Toy Type:</b> {{toy.type}}</li>
        <li><b>Last shipment brought at: </b>{{dateToShow}}</li>
    </ul>
  </section>
</template>

<script>
import {toyService} from '../services/toy-service'
export default {
    name: 'toy-details',
    data(){
        return {
            toy: null
        }
    },
    computed: {
        toyId() {
            return this.$route.params.toyId
        },
        isInStock(){
            return this.toy.inStock ? 'Yes' : 'No'
        },
        dateToShow(){
            const date = new Date(this.toy.createdAt)
            return date.toLocaleDateString('he-IL')
        }
    },
    created(){
        toyService.getById(this.toyId)
            .then(foundToy => this.toy = foundToy)
    }
}
</script>

<style>

</style>