const userService = require('./user.service')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    userService.query()
    .then(users => res.json(users))
})

router.get('/admin', (req, res) => {
    const currentUser = req.session.loggedinUser;
    if(currentUser && currentUser.isAdmin){
        userService.query() 
            .then(users => res.json(users))
    } else res.status(401).send('You are not an admin!')
})


router.post('/signup', (req, res) => {
    const {fullname, username, password} = req.body;
    const user = {fullname, username, password};
    userService.save(user)
    .then((user) => {
        req.session.loggedinUser = user;
        res.json(user)
    })
})

router.post('/login', (req, res) => {
    const {username, password} = req.body;
    const credentials = {username, password}
    userService.checkLogin(credentials)
    .then(user =>{
        req.session.loggedinUser = user;
        res.json(user)
    })
})

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.end()
})

router.get('/:userId', (req, res) => {
    const {userId} = req.params
    userService.getById(userId)
        .then(user => res.json(user))
})

module.exports = router
