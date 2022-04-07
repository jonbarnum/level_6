const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/comment')

commentRouter.get('/', (req, res, next) => {
    Comment.find((error, comment) => {
        if (error){
            res.status(500)
            return next(error)
        }
        return res.send(comment)
    }) 
})

commentRouter.get('/user', (req, res, next) => {
    Comment.find({user: req.user._id}, (error, comment) => {
        if (error){
            res.status(500)
            return next(error)
        }
        return res.status(200).send(comment)
    })
})

commentRouter.post('/', (req, res, next) => {
    req.body.user = req.user._id
    const comment = new Comment(req.body)
    comment.save(function (error, newComment) {
        if (error){
            res.status(500)
            return next (error)
        }
        return res.status(201).send(newComment)
    })
})

commentRouter.get('/:commentId', (req, res, next) => {
    Comment.findById(req.params.commentId, (error, comment) => {
        if (error) {
            res.status(500)
            return next(error)
        } else if (!comment){
            res.status(404)
            return next(new Error('No comment item found'))
        }
        return res.send(comment)
    })
})

commentRouter.put('/:commentId' , (req, res, next) => {
    Comment.findOneAndUpdate(
        {_id: req.params.commentId, user: req.user._id},
        req.body,
        {new: true},
        (error, updatedComment) => {
            if (error){
                console.log('Error')
                res.status(500)
                return next(error)
            }
            return res.send(updatedComment)
        }
    )
})

commentRouter.delete('/:commentId', (req, res, next) => {
    Comment.findOneAndDelete(
        {_id: req.params.commentId, user: req.user._id},
        (error, deleteComment) => {
            if (error){
                res.status(500)
                return next(error)
            }
            return res.status(200).send(`Successfully deleted comment`)
        }
    )
})

module.exports = commentRouter