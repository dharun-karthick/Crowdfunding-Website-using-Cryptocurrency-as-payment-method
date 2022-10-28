const mongoose = require('mongoose')

const licenseSchema = new mongoose.Schema({
    license : {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('license', licenseSchema)