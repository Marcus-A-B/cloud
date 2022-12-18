const express = require('express')
const app = express()

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')

app.use(bodyParser.json())

const postsRoute = require('./routes/posts')
const commentsRoute = require('./routes/comments')
const authRoute = require('./routes/auth')
const User = require('./models/User')

app.use('/api/post', postsRoute)
app.use('/api/comment', commentsRoute)
app.use('/api/user', authRoute)

// Mini Wall root welcome page
app.get('/', (req,res)=>{
    res.send('{"Welcome to your Mini Wall!"}')
})

mongoose.connect(process.env.DB_CONNECTOR, ()=>{
    console.log('DB is connected')
})

app.listen(3000, ()=>{
    console.log('Server is running')
})