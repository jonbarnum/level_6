const express = require('express')
const issueRouter = express.Router()
const Issue = require('../models/issue')
const Vote = require('../models/vote')


issueRouter.get('/', (req, res, next) => {
    Issue.find().populate('comments').then((issues) => {
        return Promise.all(
            issues.map((issue) => {
                return Vote.find({issue: issue._id}, ((error, votes) => {
                    if (error){
                        res.status(500)
                        return next(error)
                    }
                    issue.upvoteCount = votes.filter((vote) => vote.type === 'upvote').length
                    issue.downvoteCount = votes.filter((vote) => vote.type === 'downvote').length
                })).clone()
            })
        ).then(() => {
            res.send(issues)
        })
    }).catch((error) => {
        if (error){
            res.status(500)
            return next(error)
        }
    })
})

issueRouter.get('/:user', (req, res, next) => {
    Issue.find({user: req.user._id}).populate('comments').then((issues) => {
        return Promise.all(
            issues.map((issue) => {
                return Vote.find({issue: issue._id}, ((error, votes) => {
                    if (error){
                        res.status(500)
                        return next(error)
                    }
                    issue.upvoteCount = votes.filter((vote) => vote.type === 'upvote').length
                    issue.downvoteCount = votes.filter((vote) => vote.type === 'downvote').length
                })).clone()
            })
        ).then(() => {
            res.send(issues)
        })
    }).catch((error) => {
        if (error){
            res.status(500)
            return next(error)
        }
    })
})

issueRouter.post('/', (req, res, next) => {
    req.body.user = req.user._id
    const issue = new Issue(req.body)
    issue.save(function (error, newIssue) {
        if (error){
            res.status(500)
            return next(error)
        }
        return res.status(200).send(newIssue)
    })
})

issueRouter.put('/:issueId/addComment', (req, res, next) => {
    //find specific issue
    //push comment from req.body into issue.comments
    //run below function updating with the updated issue
    Issue.findOneAndUpdate(
        {_id: req.params.issueId, user: req.user._id},
        Issue.comments.push(req.body),
        {new: true},
        (error, updatedIssue) => {
            if (error){
                console.log(error)
                res.status(500)
                return next(error)
            }
            return res.send(updatedIssue)
        }
    )
})

issueRouter.put('/:issueId', (req, res, next) => {
    Issue.findOneAndUpdate(
        {_id: req.params.issueId, user: req.user._id},
        req.body,
        {new: true},
        (error, updatedIssue) => {
            if (error){
                console.log(error)
                res.status(500)
                return next(error)
            }
            return res.send(updatedIssue)
        }
    )
})

issueRouter.delete('/:issueId', (req, res, next) => {
    Issue.findOneAndDelete(
        {_id: req.params.issueId, user: req.user._id},
        (error, deletedIssue) => {
            if (error){
                res.status(500)
                return next(error)
            }
            return res.status(200).send(`Sucessfully deleted political issue: ${deletedIssue.title}`)
        }
    )
})

module.exports = issueRouter