require('dotenv').config()

const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const server = require('./src/App')
const connectToDB = require('./src/config/dataBase')

server.listen(4000 , ()=>{
     console.log('Server has been started at port 4000')
})

connectToDB()