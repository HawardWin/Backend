const express = require('express')
const userModel = require('../models/user.model')
const authRouter = express.Router()
const jwt = require('jsonwebtoken')
 const crypto = require('crypto')


authRouter.post('/register' , async(req,res)=>{
    const {userName ,email, password} = req.body

    const isUserAlreadyExist = await userModel.findOne({email})
    if(isUserAlreadyExist){
        return res.status(409).json({
            message : `Customers with -> ${email} is already exists`
        })
    }
    const hashPassword = await crypto.createHash('md5').update(password).digest('hex')
   const user = await userModel.create({
        email ,
        userName ,
        password : hashPassword
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


authRouter.post('/protected' , async (req , res)=>{

   const data = req.cookies
       console.log(data) 

    res.send('data has been protected')
})

authRouter.post('/login' ,async (req,res)=>{
     const {email , password } = req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(409).json({
            message : "user don't exist with this email "
        })
    }
     
    isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest('hex')
    if(!isPasswordMatched){
        res.status(404).json({
            message : "Invalid password , Try again"
        })
    }
    const token = jwt.sign({
        id:user._id
    },
     process.env.JWT_SECRET
)
    res.cookie("jwt_signIn" , token)
    res.status(200).json({
        message: "Log in successful" ,
        token
    })

})

module.exports = authRouter