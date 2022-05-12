const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Band Blueprint
const bandSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    genre: {
        type: String,
    },
    url: {
        type: String
    },
    img: {
        type: String
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

    comments: {
        type: Array
    },
    usersThatVoted: {
        type: Array
    }
})

module.exports = mongoose.model('Band', bandSchema)