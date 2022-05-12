const express = require('express')
const cors = require('cors')
const app = express()
const morgan = require('morgan')
require('dotenv').config()
const mongoose = require('mongoose')
const PORT = process.env.PORT
const { expressjwt: jwt } = require("express-jwt")


app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

mongoose.connect(
    "mongodb://localhost:27017/level_six_capstone",
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    },
    (error) => {
        if (error) throw error
        console.log('Connected to database')
    }    
)

app.use('/auth', require('./routes/authRouter.js'))
app.use('/api', jwt({secret: process.env.SECRET, algorithms: ['HS256']}))
app.use('/api/comments', require('./routes/commentRouter'))
app.use('/api/bands', require('./routes/bandRouter.js'))

app.use((error, req, res, next) => {
    console.log(error)
    if(error.name === 'UnauthorizedError'){
        res.status(error.status)
    }
    return res.send({message: error.message})
})

app.set('etag', false)

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
