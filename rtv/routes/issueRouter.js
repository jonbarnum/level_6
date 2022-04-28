const express = require('express')
const issueRouter = express.Router()
const Issue = require('../models/issue')


issueRouter.get('/', (req, res, next) => {
    Issue.find((error, issues) => {
        if (error){
            res.status(500)
            return next(error)
        }
        return res.send(issues)
    })
})
// '/api/issues/:issueId?user=!EQuserId'
// {
//     filter: {
//         user: {
//             qualifier: 'equals'
//             term: 'theid'
//         }
//     }
// }
issueRouter.get('/:user', (req, res, next) => {
    Issue.find({user: req.user._id}, (error, issues) => {
        if (error){
            res.status(500)
            return next(error)
        }
        return res.status(200).send(issues)
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

// issueRouter.get('/:issueId', (req, res, next) => {
//     Issue.findById(
//         {_id: req.params.issueId}, 
//         (error, issue) => {
//         if (error){
//             res.status(500)
//             return next(error)
//         } else if (!issue){
//             res.status(404)
//             return next(new Error('No political issue found'))
//         }
//         return res.send(issue)
//     })
// })

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