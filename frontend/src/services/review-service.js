import {httpService} from './http.service.js'

const REVIEW_URL = '/review/'

export const reviewService = {
    query,
    getById,
    remove,
    add
}


function query(type, queryStr) {
    let queryStrToSend = `/review/?${type}=${queryStr}`
    return httpService.get(queryStrToSend)
}

function getById(id) {
    return httpService.get(REVIEW_URL + id)
}

function remove(id) {
    return httpService.delete(REVIEW_URL + id)
}

function add(reviewTxt){
    return httpService.post(REVIEW_URL+reviewTxt.toyId+'/add', {reviewTxt})
}
