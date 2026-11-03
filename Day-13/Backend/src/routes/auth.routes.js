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


authRouter.post('/protected' , async (req , res)=>{

   const data = req.headers.cookies
       console.log(data) 

    res.send('data has been protected')
})

authRouter.post('/login' ,async (req,res)=>{
     const {email , password } = req.body

    const  user = await userModel.findOne({email}) === email
    if(!user){
        return res.status(409).json({
            message : 'User not found with this email'
        })
    }
  
    if(password === user.password){
        res.send("done hai bhai")
    }

})

module.exports = authRouter