const gToys = require('../../data/toy.json')


function query(){
    return Promise.resolve(gToys);
}

function getById(toyId){
    const foundToy = gToys.find((toy) => toy._id === toyId);
    return Promise.resolve(foundToy)
}

function remove(toyId) {
    const idx = gToys.findIndex(toy => toy._id === toyId)
    if (idx === -1) return Promise.reject('No Such Toy')
    gToys.splice(idx, 1)
    return _saveToysToFile();        
}

function save(toy){
    console.log(toy,'before');
    if(toy._id){
        console.log(toy,'after');
        const foundIdx = gToys.findIndex((b) => b._id === toy._id);
        if (foundIdx < 0) return Promise.reject('No such toy', toy._id)
        gToys.splice(foundIdx, 1, toy)  
    } else {
        toy._id = _makeId()
        gToys.unshift(toy)
    }
    return _saveToysToFile()
        .then(() => toy)
}

module.exports = {
    query,
    getById,
    remove,
    save
}

function _saveToysToFile() {
    return new Promise((resolve, reject) => {
        const fs = require('fs')
        fs.writeFile('data/toy.json', JSON.stringify(gToys, null, 2), (err) => {
            if (err) reject(err)
            else resolve()
        })
    })
}

function _makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}
