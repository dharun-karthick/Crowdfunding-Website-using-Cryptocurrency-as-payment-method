const mongoose = require('mongoose')

// need to be tested
// while intialaizing use mongoose.Types.ObjectId('4edd40c86762e0fb12000003') if getting from req.body or as string
const ObjectId = mongoose.Schema.ObjectId

const investorSchema = new mongoose.Schema({
    user : {
        type: ObjectId,
        required: true
    },
    projectIds : {
        type: [String],
        required: false
    }
})

module.exports = mongoose.model('investor', investorSchema)