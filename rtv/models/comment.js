const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    comment: {
        type: String
    },
    // vote: {
    //     type: Number,
    //     default: 0,
    //     max: 1
    // },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model('Comment', commentSchema)