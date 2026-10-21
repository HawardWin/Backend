const mongoose = require('mongoose') ;

const NoteSchema = mongoose.Schema({
    Title : String ,
    Description : String ,
    Color : String
})
 
const NoteModel = new mongoose.model('Notes' , NoteSchema) 

module.exports = NoteModel