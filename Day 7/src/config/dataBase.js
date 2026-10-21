// connecting to dataBase ke function ka code yaha rhega , but call Server.js me hoga

// const dns = require('node:dns');
// dns.setDefaultResultOrder('ipv4first');// using to surpass my router DNS 

const mongoose = require('mongoose') ;
async function connectedToDB(){
   await mongoose.connect(process.env.MONGO_URI); 

     console.log('connected to dataBase')
}

module.exports = connectedToDB