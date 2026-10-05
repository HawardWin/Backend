const mongoose = require('mongoose') ;


const userSchema = new mongoose.Schema({
    userName : String ,
    age : Number , 
    subscribed : Boolean 

})

const usersModel = mongoose.model('users' , userSchema) ;

module.exports = usersModel ;