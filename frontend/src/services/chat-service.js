import {httpService} from './http.service.js'

const CHAT_URL = '/toy/chat/'

export const chatService = {
    query,
}

function query(queryStr) {
    let queryStrToSend = `/toy/chat/?toyId=${queryStr}`
    return httpService.get(queryStrToSend)
}