import {httpService} from './http.service.js'

const TOY_URL = '/toy/'

export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy,
}


function query() {
    return httpService.get(TOY_URL)
}

function getById(id) {
    return httpService.get(TOY_URL + id)
}

function remove(id) {
    return httpService.delete(TOY_URL + id)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(TOY_URL + toy._id, toy)
    } else {
        return httpService.post(TOY_URL, toy)
    }
}


function getEmptyToy() {
    return {
        name: '',
        price: null,
        type: '',
        createdAt: Date.now(),
        inStock: true,
        reviews: []
    }
}

// function _createToys() {
//     var toys = JSON.parse(localStorage.getItem(KEY))
//     if (!toys || !toys.length) {
//         toys = gToys
//         localStorage.setItem(KEY, JSON.stringify(toys))
//     }
//     return toys;
// }

