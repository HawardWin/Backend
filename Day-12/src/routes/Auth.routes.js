const express = require('express')
const userModel = require('../models/user.models.js')
const authRouter = express.Router()

authRouter.post('/register' , async (req,res)=>{
    const {userName , email , password } = req.body

 const user =  await  userModel.create({
    userName , email , password 
    })

    res.status(201).json({
        message : 'User registered' ,
        user
    })

})

module.exports = authRouter