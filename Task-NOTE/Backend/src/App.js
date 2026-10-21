// server create karna  aur config karna 

const express = require('express') ;
const NoteModel = require('./models/NoteModel')
const cors = require('cors')  //  installing 
const path =require('path')


const App = express();
App.use(cors())     //     used to allow cross-origin request
App.use(express.json())
App.use(express.static('./public'))


App.post('/api/notes' , async (req,res)=>{
   
 const { Title , Description , Color } =  req.body

  const note = await NoteModel.create({    
       Title,
      Description , // it (create) is used to create new data on dataBase according to specific models 
      Color 
   })  

   res.status(201).json({
    message : 'Note created successfully' ,
    note
   })
})


App.get('/api/notes' , async (req,res)=>{

   const notes = await NoteModel.find()  // to get all data from database of that specific model

   res.status(200).json({
      nessage : 'fetched notes successfully' ,
      notes
   })
})

App.delete('/api/notes/:id' , async (req,res)=>{

   const id = req.params.id

  await NoteModel.findByIdAndDelete(id)  //  // findByIdAndDelete - find note by its id on database and then delete it .

   res.status(200).json({
      message : `Note (${id}) successfully deleted ` ,
      
   })
})

App.patch('/api/notes/:id' , async (req , res)=>{
     const {Description } = req.body
      const id = req.params.id ;

  await  NoteModel.findByIdAndUpdate(id , {Description})  // findByIdAndUpdate - find note by id and then update it on database

      res.status(200).json({
         message : "Note updated successfully"

      })
 
})


App.use('*mama', (req,res)=>{
   res.sendFile(path.join(__dirname , ".." , "/public/index.html"))

})



module.exports = App 