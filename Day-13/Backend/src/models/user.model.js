const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email : {
        type : String ,
        unique : true
    } ,
    userName : String ,
    password : String
}) 

const userModel = mongoose.model("customers" , userSchema)

module.exports = userModel