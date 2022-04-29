const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const PORT = process.env.PORT
const expressJwt = require('express-jwt')


app.use(morgan('dev'))
app.use(express.json())

mongoose.connect(
    "mongodb://localhost:27017/rtv",
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
app.use('/api', expressJwt({secret: process.env.SECRET, algorithms: ['HS256']}))
app.use('/api/issues', require('./routes/issueRouter'))
app.use('/api/comments', require('./routes/commentRouter'))

app.use((error, req, res, next) => {
    console.log(error)
    if(error.name === 'UnauthorizedError'){
        res.status(error.status)
    }
    return res.send({message: error.message})
})

app.listen(PORT, () => {
    console.log(`Starting server on port ${PORT}`)
})