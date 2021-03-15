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

    <form @submit.prevent="addReview">
        <h1>Add review:</h1>
        <textarea v-model="newReview.txt"></textarea>
        <button>Add review</button>
    </form>
    <ul>
        <li v-for="review in reviewsForShow" :key="review._id">
            {{review.txt}} - {{review.byUser.username}}
        </li>
    </ul>
    <chat :toy="toy" />
  </section>
</template>

<script>
import {toyService} from '../services/toy-service'
import chat from '../cmps/chat'
export default {
    name: 'toy-details',
    data(){
        return {
            toy: null,
            newReview: {txt: ''},
            
        }
    },
    methods: {
        async addReview(){
            await this.$store.dispatch({type: 'addReview', reviewTxt: {txt: this.newReview.txt, toyId: this.toy._id}});
            // const foundReviews = await reviewService.query(this.toyId)
            
            this.newReview = {}
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
            let date = Date.now(this.toy.createdAt)
            date = new Date(date)
            return date.toLocaleDateString('he-IL')
        },
        reviewsForShow(){
            return this.$store.getters.reviewsForShow
        }
    },
    async created(){
        const foundToy = await toyService.getById(this.toyId);
        this.toy = foundToy;
        await this.$store.dispatch({type: 'loadReviews', toLoad: {id: this.toyId, type: 'toyId'}})
    },
    components: {
        chat
    }
}
</script>
