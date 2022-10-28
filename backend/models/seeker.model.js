const mongoose = require('mongoose')

// need to be tested
// while intialaizing use mongoose.Types.ObjectId('4edd40c86762e0fb12000003') if getting from req.body or as string
const ObjectId = mongoose.Schema.ObjectId

const seekerSchema = new mongoose.Schema({
    user : {
        type: ObjectId,
        required: true
    },
    isVerified : {
        type: Boolean,
        required: true,
        // default: false
    },
    stage : {
        type: Number,
        required: true
    },
    f1 : {
        type: String,
        required: false
    },
    f2 : {
        type: String,
        required: false
    },
    f3 : {
        type: String,
        required: false
    },
    f4 : {
        type: String,
        required: false
    },
    f5 : {
        type: String,
        required: false
    },
    address : {
        type: String,
        required: true
    },
    license : {
        type: String,
        required: false
    },
    eth : {
        type: String,
        required: true
    },
    project : {
        type: String,
        required: true,
        default: '0'
    }
})

module.exports = mongoose.model('seeker', seekerSchema)