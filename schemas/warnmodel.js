const mongoose = require('mongoose')

const warnSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },

    warns: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('warns', warnSchema)