const gUsers = require('../../data/user.json')

function query() {
    var users = gUsers
    return Promise.resolve(users);
}
function getById(userId) {
    const user = gUsers.find(user => user._id === userId)
    return Promise.resolve(user);
}
function checkLogin(credentials) {
    var user = gUsers.find(user =>
        user.username === credentials.username &&
        user.password === credentials.password)

    if (user) {
        user = {...user}    
        delete user.password
    }

    return Promise.resolve(user);
}
function remove(userId) {
    const idx = gUsers.findIndex(user => user._id === userId)
    gUsers.splice(idx, 1)
    return _saveUsersToFile();
}
function save(user) {
    if (user._id) {
        const idx = gUsers.findIndex(c => c._id === user._id)
        if (idx < 0) return Promise.reject('No such user', user._id)
        gUsers.splice(idx, 1, user)
    } else {
        user._id = _makeId()
        gUsers.unshift(user)
    }
    return _saveUsersToFile()
        .then(() => {
            user = {...user}
            delete user.password
            return user
        })
}


module.exports = {
    query,
    checkLogin,
    getById,
    remove,
    save
}

function _makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function _saveUsersToFile() {
    return new Promise((resolve, reject) => {
        const fs = require('fs')
        fs.writeFile('data/user.json', JSON.stringify(gUsers, null, 2), (err) => {
            if (err) reject(err)
            else resolve()
        })
    })
}

