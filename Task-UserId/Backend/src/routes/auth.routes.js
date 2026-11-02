const express = require('express')
const userModel = require('../models/user.model')
const authRouter = express.Router()
const jwt = require('jsonwebtoken')
authRouter.post('/register' , async(req,res)=>{
    const {userName ,email, password} = req.body

    const isUserAlreadyExist = await userModel.findOne({email})
    if(isUserAlreadyExist){
        return res.status(409).json({
            message : `Customers with -> ${email} is already exists`
        })
    }
   const user = await userModel.create({
        email ,
        userName ,
        password
    })

  const token =  await jwt.sign({
        email , 
        userName
    },
   process.env.JWT_SECRET
)
    res.cookie("jwt_Token" , token)

    res.status(201).json({
   message: "user id has been created" ,
   user ,
   token
    })
})

module.exports = authRouter