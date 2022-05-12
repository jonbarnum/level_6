const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

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

//pre-save hook to encrpt user passwords and signups
//very important to use the function word as opposed to fat arrow key
userSchema.pre('save', function(next){
    const user = this
    if(!user.isModified('password')) return next()
    bcrypt.hash(user.password, 10, (error, hash) => {
        if(error) return next(error)
        user.password = hash
        next()
    })
})

    //method to check encrypted password on login
userSchema.methods.checkPassword = function(passwordAttempt, callback){
    bcrypt.compare(passwordAttempt, this.password, (error, isMatch) => {
        if(error) return callback(error)
        return callback(null, isMatch)
    })
}

// method to remove user password for token/sending the response
userSchema.methods.withoutPassword = function(){
    const user = this.toObject()
    delete user.password
    return user
}


module.exports = mongoose.model('User', userSchema)