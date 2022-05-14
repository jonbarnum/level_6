const express = require('express')
const bandRouter = express.Router()
const Band = require('../models/bands.js')
const Vote = require('../models/vote.js')


// //get all request mongoose
// bandRouter.get('/', (req, res, next) => {
//     Band.find((error, bands) => {
//         if(error){
//             res.status(500)
//             return next(error)
//         }
//         return res.status(200).send(bands)
//     })
// })

bandRouter.get('/', (req, res, next) => {
    Band.find().populate('comments').then((bands) => {
        return Promise.all(
            bands.map((band) => {
                return Vote.find({band: band._id}, ((error, votes) => {
                    if (error){
                        res.status(500)
                        return next(error)
                    }
                    band.upvoteCount = votes.filter((vote) => vote.type === 'upvote').length
                    band.downvoteCount = votes.filter((vote) => vote.type === 'downvote').length
                })).clone()
            })
        ).then(() => {
            res.send(bands)
        })
    }).catch((error) => {
        if (error){
            res.status(500)
            return next(error)
        }
    })
})

// //get one by id mongoose
// bandRouter.get('/:bandId', (req, res, next) => {
//     Band.findOne({_id: req.params.bandId}, (error, band) => {
//         if(error){
//             res.status(500)
//             return next(error)
//         }
//         res.status(200).send(band)
//     })
// })

bandRouter.get('/:user', (req, res, next) => {
    Band.find({user: req.user._id}).populate('comments').then((bands) => {
        return Promise.all(
            bands.map((band) => {
                return Vote.find({band: band._id}, ((error, votes) => {
                    if (error){
                        res.status(500)
                        return next(error)
                    }
                    band.upvoteCount = votes.filter((vote) => vote.type === 'upvote').length
                    band.downvoteCount = votes.filter((vote) => vote.type === 'downvote').length
                })).clone()
            })
        ).then(() => {
            res.send(bands)
        })
    }).catch((error) => {
        if (error){
            res.status(500)
            return next(error)
        }
    })
})

// //get request by genre mongoose
// bandRouter.get('/search/genre', (req, res, next) => {
//     Band.find({genre: req.query.genre}, (error, bands) => {
//         if(error){
//             res.status(500)
//             return next(error)
//         }
//         return res.status(200).send(bands)
//     })
// })

// //post one mongoose
// // http://localhost:8000/bands/
// bandRouter.post('/', (req, res, next) => {
//     const newBand = new Band(req.body)
//     newBand.save((error, savedBand) => {
//         if(error){
//             res.status(500)
//             return next(error)
//         }
//         return res.status(201).send(savedBand)
//     })
// })

bandRouter.post('/', (req, res, next) => {
    req.body.user = req.user._id
    // req.auth = req.auth._id
    const band = new Band(req.body)
    band.save(function (error, newBand) {
        if (error){
            res.status(500)
            return next(error)
        }
        return res.status(200).send(newBand)
    })
})

// //delete one mongoose
// bandRouter.delete('/:bandId', (req, res, next) => {
//     Band.findByIdAndDelete({_id: req.params.bandId}, (error, deletedItem) => {
//         if(error){
//             res.status(500)
//             return next(error)
//         }
//         return res.status(200).send(`You have successfully deleted the band ${deletedItem.artist} from the database`)
//     })
// })

bandRouter.delete('/:bandId', (req, res, next) => {
    Band.findOneAndDelete(
        {_id: req.params.bandId, user: req.user._id},
        (error, deletedIssue) => {
            if (error){
                res.status(500)
                return next(error)
            }
            return res.status(200).send(`Sucessfully deleted political issue: ${deletedIssue.title}`)
        }
    )
})

// //put request mongoose
// bandRouter.put('/:bandId', (req, res, next) => {
//     Band.findByIdAndUpdate(
//         {_id: req.params.bandId},
//         req.body,
//         {new: true},
//         (error, updatedband) => {
//             if(error){
//                 res.status(500)
//                 return next(error)
//             }
//             return res.status(201).send(updatedband)
//         }
//     )
// })

bandRouter.put('/:bandId', (req, res, next) => {
    Band.findOneAndUpdate(
        {_id: req.params.bandId},
        req.body,
        {new: true},
        (error, updatedBand) => {
            if (error){
                console.log(error)
                res.status(500)
                return next(error)
            }
            return res.send(updatedBand)
        }
    )
})

module.exports = bandRouter