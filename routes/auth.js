const express = require('express')
const router = express.Router()

const User = require('../models/User')

const {registerValidation, loginValidation} = require('../validations/validation')

const bcryptjs = require('bcryptjs')

const jsonwebtoken = require('jsonwebtoken')

router.post('/register', async(req,res) => {

    console.log('auth.js /register')
    console.log(req.body)


    // Check data format
    const {error} = registerValidation(req.body)
    if(error){
        return res.status(400).send({message:error['details'][0]['message']})
    }

    // Validation to check if user exists
    const userExists = await User.findOne({email:req.body.email})
    if(userExists){
        return res.status(400).send({message:'User already exists'})
    }

    // Create hashed representation of password
    const salt = await bcryptjs.genSalt(5)
    const hashedPassword = await bcryptjs.hash(req.body.password,salt)

    // Code to insert data
    const user = new User({
        username: req.body.username,
        email:req.body.email,
        password:hashedPassword,
        firstName:req.body.firstName,
        lastName:req.body.lastName
    })

    try{
        const savedUser = await user.save()
        res.send(savedUser)
    }catch(err){
        res.status(400).send({message:err})
    }
})

router.post('/login', async(req,res) => {

    // Validation to check user input
    const {error} =loginValidation(req.body)
    if(error){
        return res.status(400).send({message:error['details'][0]['message']})
    }

    // Validation to check if user exists
    const user = await User.findOne({email:req.body.email})
    if(!user){
        return res.status(400).send({message:'User does not exist'})
    }

    // Validation to check user password
    const passwordValidation = await bcryptjs.compare(req.body.password,user.password)
    if(!passwordValidation){
        return res.status(400).send({message:'Password is wrong'})
    }

    // Generate an auth-token for the user
    const token = jsonwebtoken.sign({_id:user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token, token').send({'auth-token':token})
    
/*     const tokenParts = token.split('.');
    const encodedPayload = tokenParts[1];
    const rawPayload = atob(encodedPayload);
    const user1 = JSON.parse(rawPayload);
    console.log(user1.username);  */
})

router.get('/getId', async(req,res) => {
    
    const getUser = jsonwebtoken.decode(req.header('auth-token'),process.env.TOKEN_SECRET)
    res.send(getUser)
})

module.exports = router