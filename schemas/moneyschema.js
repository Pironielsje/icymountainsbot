const mongoose = require('mongoose')

const schema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    money: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('money', schema)