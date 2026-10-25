const express = require('express')
const userModel = require('./models/user.models.jsx')
const App = express()


App.use(express.json()) ;

App.post('/api/register' , async (req,res)=>{
    const {userName , email , password } = req.body

 const user =  await  userModel.create({
        userName : userName , 
        email : email ,
        password : password 
    })

    res.status(201).json({
        message : 'User card created' ,
        user
    })

})

 App.get('/api/register/:id' , async (req,res)=>{
    const id = req.params.id
      const users = await userModel.findById(id)

      res.status(200).json({
        message :'Data Fetched successfuly' ,
        users
      })
 })

module.exports = App