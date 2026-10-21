// server start karna  aur dataBase se connect karna

require('dotenv').config()

const dns = require('node:dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);

const server = require('./src/App') ;
const connectToDB = require('./src/config/DataBase')

server.listen('4000' , ()=>{
    console.log('Server has been start at port 4000')
}) 

connectToDB() ;