const mongoose = require('mongoose')
const Schema = mongoose.Schema

const issueSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    upvote: {
        type: Number,
        default: 0
    },
    downvote: {
        type: Number,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    comments: [{
        commentId: {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
            immutable: true
        }
    }]
})

module.exports = mongoose.model('Issue', issueSchema)