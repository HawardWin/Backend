// server ko start karna aur database se connect karna

const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();

const server = require('./src/App') ;
const connectedToDB = require('./src/config/dataBase')

server.listen('4000' , ()=>{
    console.log('server has been started at port 4000')
})

connectedToDB()