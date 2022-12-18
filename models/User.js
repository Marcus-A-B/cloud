const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:4,
        max:256
    },
    email:{
        type:String,
        require:true,
        min:6,
        max:256
    },
    password:{
        type:String,
        require:true,
        min:8,
        max:1024
    },
    firstName:{
        type:String,
        require:true,
        min:1,
        max:15
    },
    lastName:{
        type:String,
        require:true,
        min:1,
        max:15
    },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model('users',userSchema)