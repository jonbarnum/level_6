const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    voted: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('User', userSchema)