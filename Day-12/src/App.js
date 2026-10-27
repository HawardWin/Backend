const express = require('express')

const userModel = require('./models/user.models.js')
const authRouter = require('./routes/Auth.routes.js')

const App = express()
App.use(express.json()) ;

 App.get('/api/register' , async (req,res)=>{
    
      const users = await userModel.find()

      res.status(200).json({
        message :'Data Fetched successfully' ,
        users
      })
 })

 App.delete('/api/register/:id' , async (req,res)=>{
     const   id = req.params.id 
     await userModel.findByIdAndDelete(id)

    //   await userModel.deleteMany({email : "ram@r1.com"})
       // to delete many whose have something common like email

       res.status(202).json({
        message : "That Data deleted successfully"
       })
 })

 App.patch('/api/register/:id' , async(req,res)=>{
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

module.exports = App