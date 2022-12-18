const express = require('express')
const router = express.Router()

const Comment = require('../models/Comment')
const verifyToken = require('../verifyToken')

const {commentValidation} = require('../validations/validation')

// POST (new comment)
router.post('/', verifyToken, async(req,res)=>{
    // Check data format
    const {error} = commentValidation(req.body)
    if(error){
        return res.status(400).send({message:error['details'][0]['message']})
    }

    const postData = new Comment({
        text:req.body.text,
        postId:req.body.postId,
    })

    try{
        const postToSave = await postData.save()
        res.send(postToSave)

    }catch(err){
        res.send({message:err})
    }    
})

// GET (all comments)
router.get('/', verifyToken, async(req,res) => {
    try{
        const getComments = await Comment.find().sort({ date:-1 })    // order by date desc
        res.send(getComments)
    }catch(err){
        res.send({message:err})
    }
})

// GET (comment by post_id)
router.get('/:post_id', verifyToken, async(req,res) => {
    try{
        const getCommentByPostId = await Post.findById(req.params.post_id)
        res.send(getPostById)
    }catch(err){
        res.send({message:err})
        console.log('There has been an error!')
    }
})

module.exports = router