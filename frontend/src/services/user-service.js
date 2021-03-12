import {httpService} from './http.service.js'

const AUTH_URL = '/auth/'

export const userService = {
    login,
    logout,
    signup
}


function login(user) {
    return httpService.post(AUTH_URL + 'login', user)
}

function logout() {
    return httpService.post(AUTH_URL + 'logout')
}

function signup() {
    return httpService.post(AUTH_URL + 'signup')
}

