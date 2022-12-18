const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
    text:{
        type: String,
        require: true,
        min: 1,
        max:512
    },
    date:{
        type:Date,
        default:Date.now
    },    
    PostId:{
        type: String,
        require: true,
    }
})

module.exports = mongoose.model('comments', CommentSchema)