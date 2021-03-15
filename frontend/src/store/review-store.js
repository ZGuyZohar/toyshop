import {reviewService} from '../services/review-service.js'

export default {
    strict: true,
    state: {
        reviewsForToy: [],
    },
    getters: {
        reviewsForShow(state){
            return state.reviewsForToy
        },
    },
    mutations: {
        setReviews(state, {foundReviews}){
            state.reviewsForToy = foundReviews;
        }
    },
    actions: {
        async loadReviews({commit}, {toLoad}){
            const foundReviews = await reviewService.query(toLoad.type, toLoad.id);
            commit({type: 'setReviews', foundReviews})
        },
        async addReview({commit}, {reviewTxt}){
            await reviewService.add(reviewTxt)
            const foundReviews = await reviewService.query('toyId', toyId)
            commit({type: 'setReviews', foundReviews})         
        }
    }
}