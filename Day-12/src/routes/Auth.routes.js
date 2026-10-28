const express = require('express')
const jwt = require('jsonwebtoken')
const jwtDecode =  require("jwt-decode");

const userModel = require('../models/user.models.js')
const authRouter = express.Router()

authRouter.post('/register' , async (req,res)=>{
    const {userName , email , password } = req.body
 
    const isUserAlreadyExist = await userModel.findOne({email})  

    if(isUserAlreadyExist){
        return res.status(400).json({
            message : `User with this email ${email} already exist` 
        })
    }   
 const user =  await  userModel.create({
    userName , email , password 
    })

    const token = jwt.sign(
        {
            id: user._id ,
            email: email 
        } ,
        process.env.JWT_SECRET
    )

    res.status(201).json({
        message : 'User registered' ,
        user, 
        token
    })

     console.log(jwtDecode(token))

})


 authRouter.get('/register' , async (req,res)=>{
    
      const users = await userModel.find()

      res.status(200).json({
        message :'Data Fetched successfully' ,
        users
      })
 })


authRouter.delete('/register/:id' , async (req,res)=>{
     const   id = req.params.id 
     await userModel.findByIdAndDelete(id)

    //   await userModel.deleteMany({email : "ram@r1.com"})
       // to delete many whose have something common like email

       res.status(202).json({
        message : "That Data deleted successfully"
       })
 })


  authRouter.patch('/register/:id' , async(req,res)=>{
     const id = req.params.id

   const updatedId = await userModel.findByIdAndUpdate(id , 
    {
       password : req.body.passwor
     } ,
    { new : true}
)
     res.status(200).json({
        message : "Password has been updated",
        updatedId
     })
 })



module.exports = authRouter