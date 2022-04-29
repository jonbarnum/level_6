const mongoose = require('mongoose')
const Schema = mongoose.Schema

const voteSchema = new Schema({
    issue: {
        type: Schema.Types.ObjectId,
        required: true
    },
    type: {
        type: String,
        enum: ['upvote', 'downvote'],
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model('Vote', voteSchema)