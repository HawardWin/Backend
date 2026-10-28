const express = require('express')
const cookieParser = require('cookie-parser') 
const userModel = require('./models/user.models.js')
const authRouter = require('./routes/Auth.routes.js')

const App = express()
App.use(express.json()) ;
App.use(cookieParser())

App.use('/api/auth' , authRouter)


module.exports = App