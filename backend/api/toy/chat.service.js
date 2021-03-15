
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query
}

async function query(filterBy = {}) {
    // const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('chat')
        var chatList = await collection.find({}).toArray()
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
