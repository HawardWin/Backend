// Server create karna aur config karna 

const express = require('express') ;
const usersModel = require('./models/users.model');

const App = express() ;

App.use(express.json())

App.post('/notes' , async (req,res)=>{
      const {userName , age , subscribed }= req.body  

 const user =  await   usesModel.create({
        userName , age , subscribed
      })
      
      res.status(201).json({
        message : "note created successfully" ,
        user
      })
})


App.get('/notes' , async (req,res)=>{

 const data =   await usersModel.find()

    res.status(200).json( {
      message : "data fetched successfully " ,
      data
    })
})


module.exports = App