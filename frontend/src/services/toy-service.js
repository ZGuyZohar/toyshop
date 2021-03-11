import axios from 'axios';
import {storageService} from './async-storage-service.js'

const KEY = 'toysDB';
const TOY_URL = 'http://localhost:3030/api/toy/'

export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy
}


function query() {
    return axios.get(TOY_URL).then(res => res.data)
}

function getById(id) {
    return axios.get(TOY_URL + id).then(res => res.data)
}

function remove(id) {
    return axios.delete(TOY_URL + id).then(res => res.data)
}

function save(toy) {
    if (toy._id) {
        console.log(toy);
        return axios.put(TOY_URL + toy._id, toy).then(res => res.data)
    } else {
        return axios.post(TOY_URL, toy).then(res => res.data)
    }
}


function getEmptyToy() {
    return {
        name: '',
        price: null,
        type: '',
        createdAt: Date.now(),
        inStock: true
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

