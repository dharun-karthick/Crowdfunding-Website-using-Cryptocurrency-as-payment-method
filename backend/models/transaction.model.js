const mongoose = require('mongoose')

// need to be tested
// while intialaizing use mongoose.Types.ObjectId('4edd40c86762e0fb12000003') if getting from req.body or as string
const ObjectId = mongoose.Schema.ObjectId

const transactionSchema = new mongoose.Schema({
    project : {
        type: ObjectId,
        required: true
    },
    investor : {
        type: ObjectId,
        required: true,
    },
    amount : {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('transaction', transactionSchema)