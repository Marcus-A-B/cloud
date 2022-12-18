const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const verifyToken = require('../verifyToken')

const {postValidation} = require('../validations/validation')
const User = require('../models/User')

const jsonwebtoken = require('jsonwebtoken')

// POST (new post)
router.post('/', verifyToken, async(req,res)=>{
    // Check data format
    const {error} = postValidation(req.body)
    if(error){
        return res.status(400).send({message:error['details'][0]['message']})
    }

    const postData = new Post({
        title:req.body.title,
        body:req.body.body,
        ownerId:req.body.ownerId,
    })

    try{
        const postToSave = await postData.save()
        res.send(postToSave)

    }catch(err){
        res.send({message:err})
    }    
})

// POST (new like)
router.post('/like', verifyToken, async(req,res)=>{
    {
        try{
            const user = jsonwebtoken.decode(req.header('auth-token'),process.env.TOKEN_SECRET)
            const check = await Post.findById(req.body._id)
            console.log(user._id)
            console.log(check)
            if( user._id != check.ownerId )
            {
            const postToUpdate = await Post.findByIdAndUpdate(req.body._id, { $inc: { likes:1 } })          
            res.send(postToUpdate)            
            }
            else{
                res.send("Cannot like your own post")
            }
        }catch(err){
            res.send({message:err})
        }
    }
})

// GET (all posts)
router.get('/', verifyToken, async(req,res) => {
    try{
        const getPosts = await Post.find().sort({likes:-1, date:-1})    // order by most number of likes desc, followed by date desc
        res.send(getPosts)
    }catch(err){
        res.send({message:err})
    }
})

// GET (post byId)
router.get('/byId', verifyToken, async(req,res) => {
    try{
        const getPostById = await Post.findById(req.body._id)
        res.send(getPostById)
    }catch(err){
        res.send({message:err})
    }
})

module.exports = router