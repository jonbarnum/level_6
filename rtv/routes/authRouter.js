const express = require('express')
const authRouter = express.Router()
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

//For Signup
authRouter.post('/signup', (req, res, next) => {
    User.findOne({username: req.body.username.toLowerCase()}, (error, user) => {
        if (error){
            res.status(500)
            return next(error)
        }
        if (user){
            res.status(403)
            return next(new Error('That username is already taken'))
        }
        const newUser = new User(req.body)
        newUser.save((error, savedUser) => {
            if (error){
                res.status(500)
                return next(error)
            }
            const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
            return res.status(201).send({token, user: savedUser.withoutPassword()})
        })
    })
})

//for login
authRouter.post('/login', (req, res, next) => {
    User.findOne({username: req.body.username.toLowerCase()}, (error, user) => {
        if (error){
            res.status(500)
            return next(error)
        }
        if (!user){
            res.status(403)
            return next(new Error('Username or Password are incorrect'))
        }
        user.checkPassword(req.body.password, (error, isMatch) => {
            if(error){
                res.status(403)
                return next(new Error('Username and Password are incorrect'))
            }
            if(!isMatch){
                res.status(403)
                return next(new Error('Username and Password are incorrect'))
            }
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
            return res.status(200).send({ token, user: user.withoutPassword() })
        })
    })
})

module.exports = authRouter