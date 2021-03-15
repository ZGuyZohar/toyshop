
const dbService = require('../../services/db.service')
// const logger = require('../../services/logger.service')
// const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByToyname,
    remove,
    update,
    add,
    queryChat
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('toy')
        var toys = await collection.find(criteria).toArray()
        toys = toys.map(toy => {
            toy.createdAt = ObjectId(toy._id).getTimestamp()
            return toy
        })
        return toys
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = await collection.findOne({ '_id': ObjectId(toyId) })

        // toy.givenReviews = await reviewService.query({ byToyId: ObjectId(toy._id) })
        // toy.givenReviews = toy.givenReviews.map(review => {
        //     delete review.byToy
        //     return review
        // })

        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}
async function getByToyname(toyname) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = await collection.findOne({ toyname })
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyname}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({ '_id': ObjectId(toyId) })
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function update(toy) {
    try {
        // peek only updatable fields!
        const toyToSave = {
            _id: ObjectId(toy._id),
            name: toy.name,
            type: toy.type,
            price: toy.price,
            inStock: toy.inStock
        }
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ '_id': toyToSave._id }, { $set: toyToSave })
        return toyToSave;
    } catch (err) {
        logger.error(`cannot update toy ${toy._id}`, err)
        throw err
    }
}

async function add(toy) {
    try {
        // peek only updatable fields!
        const toyToAdd = {
            name: toy.name,
            type: toy.type,
            price: toy.price,
            inStock: toy.inStock
        }
        const collection = await dbService.getCollection('toy')
        await collection.insertOne(toyToAdd)
        return toyToAdd
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                toyname: txtCriteria
            },
            {
                fullname: txtCriteria
            }
        ]
    }
    if (filterBy.minBalance) {
        criteria.balance = { $gte: filterBy.minBalance }
    }
    return criteria
}

async function queryChat(filterBy = {}) {
    // if(filterBy.toyId) filterBy.toyId = ObjectId(filterBy.toyId)
    try {
        console.log(filterBy,'querychat!');
        const collection = await dbService.getCollection('chat')
        var chatList = await collection.find(filterBy).toArray()
        chatList = chatList.map(chat => {
            chat.createdAt = ObjectId(chat._id).getTimestamp()
            return chat
        })
        return chatList
    } catch (err) {
        logger.error('cannot find chatList', err)
        throw err
    }
}

