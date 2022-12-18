const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    title:{
        type: String,
        require:true,
        min:1,
        max:128
    },
    body:{
        type: String,
        require:true,
        min:1,
        max:2048
    },
    likes:{
        type: Number,
        default: 0
    },
    date:{
        type:Date,
        default:Date.now
    },
    ownerId:{
        type: String,
        require:true,
        min:24,
        max:24
    }
})

module.exports = mongoose.model('posts', PostSchema)