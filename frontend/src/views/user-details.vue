<template>
  <section>
      <h1>Here is your list of reviews</h1>
      <ul v-if="reviewsForShow">
          <li v-for="review in reviewsForShow" :key="review._id">
              {{review.txt}} - About the toy: <router-link :to="'/toy/details/' + review.toy._id">{{review.toy.name}}</router-link>, at: {{review.createdAt}}
          </li>
      </ul>
  </section>
</template>

<script>
export default {
    computed: {
        currUser(){
            return this.$store.state.currentUser;
        },
        reviewsForShow(){
            return this.$store.getters.reviewsForShow
        },
        dateToShow(){
            let date = Date.now(this.review.createdAt)
            date = new Date(date)
            return date.toLocaleDateString('he-IL')
        },
    },
    async created(){
        console.log(this.currUser._id);
        await this.$store.dispatch({type: 'loadReviews', toLoad: {id: this.currUser._id, type: 'byUserId'}})
        console.log(this.reviewsForShow);
    }
}
</script>