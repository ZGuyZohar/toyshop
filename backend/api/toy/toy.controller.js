const toyService = require('./toy.service')
const reviewService = require('../review/review.service')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')

async function getToy(req, res) {
    try {
        const toy = await toyService.getById(req.params.id)
        res.send(toy)
    } catch (err) {
        logger.error('Failed to get toy', err)
        res.status(500).send({ err: 'Failed to get toy' })
    }
}

async function getToys(req, res) {
    try {
        const filterBy = {
            txt: req.query?.txt || '',
            minBalance: +req.query?.minBalance || 0
        }
        const toys = await toyService.query(filterBy)
        res.send(toys)
    } catch (err) {
        logger.error('Failed to get toys', err)
        res.status(500).send({ err: 'Failed to get toys' })
    }
}

async function deleteToy(req, res) {
    try {
        await toyService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete toy', err)
        res.status(500).send({ err: 'Failed to delete toy' })
    }
}

async function addToy(req, res) {
    try {
        var toy = req.body
        toy = await toyService.add(toy)
        res.send(toy)

    } catch (err) {
        logger.error('Failed to add toy', err)
        res.status(500).send({ err: 'Failed to add toy' })
    }
}


async function updateToy(req, res) {
    try {
        const toy = req.body
        console.log(toy);
        const savedToy = await toyService.update(toy)
        res.send(savedToy)
    } catch (err) {
        logger.error('Failed to update toy', err)
        res.status(500).send({ err: 'Failed to update toy' })
    }
}


async function addReview(req, res) {
    try {
        var review = req.body
        review.byUserId = req.session.user._id
        review = await reviewService.add(review)
        review.byUser = req.session.user
        review.aboutUser = await userService.getById(review.aboutUserId)
        res.send(review)

    } catch (err) {
        logger.error('Failed to add review', err)
        res.status(500).send({ err: 'Failed to add review' })
    }
}

module.exports = {
    getToy,
    getToys,
    deleteToy,
    addToy,
    updateToy,
    addReview
}