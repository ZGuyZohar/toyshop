const toyService = require('./toy.service');
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    // const filter = req.query['0']
    toyService.query()
        .then(toys => res.json(toys))
})

router.get('/:toyId', (req, res) => {
    const { toyId } = req.params;
    toyService.getById(toyId)
        .then(toy => res.json(toy))
})

router.post('/', (req, res) => {
    const {name, price, type, createdAt, inStock} = req.body;
    console.log(req.body);
    const newToy = {name, price, type, createdAt, inStock}
    toyService.save(newToy)
        .then(savedToy => res.json(savedToy))
        .catch(err => res.status(401).send(err))
})

router.put('/:toyId', (req, res) => {
    const {_id, name, price, type, createdAt, inStock} = req.body;
    const newToy = {_id, name, price, type, createdAt, inStock}
    toyService.save(newToy)
        .then(savedToy => res.json(savedToy))
        .catch(err => res.status(401).send(err))
})

router.delete('/:toyId', (req, res) => {
    const {toyId} = req.params;
    console.log(toyId);
    toyService.remove(toyId)
        .then(() => res.json('deleted...'))
        .catch((err) => res.status(401).send(err))
})

module.exports = router