const mongoose = require('mongoose')

// need to be tested
// while intialaizing use mongoose.Types.ObjectId('4edd40c86762e0fb12000003') if getting from req.body or as string
const ObjectId = mongoose.Schema.ObjectId

const projectSchema = new mongoose.Schema({
    seeker : {
        type: ObjectId,
        required: true
    },
    deposit : {
        type: Number,
        required: true,
        //initalize as 0 if needed
    },
    amount_received : {
        type: Number,
        required: true,
        default: 0
    },
    investor_count : {
        type: Number,
        required: true,
        default: 0
    },
    transactions : {
        type: [ObjectId],
        required: true,
        default: []
    },
    eth : {
        type: String,
        required: true
    },
    address : {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    image : {
        type: String,
        required: true,
        default: '0'
    },
    sanctionedDate : {
        type: Number,
        required: false
    },
    totalRequiredTokens : {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('project', projectSchema)