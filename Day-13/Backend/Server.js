require('dotenv').config()

const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const server =  require('./src/App')
const connectToDB = require('./src/config/dataBase')

server.listen(3000 , ()=>{
    console.log('server has been started at port 3000')
})

connectToDB()