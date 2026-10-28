const express = require('express')

const userModel = require('./models/user.models.js')
const authRouter = require('./routes/Auth.routes.js')

const App = express()
App.use(express.json()) ;

App.use('/api/auth' , authRouter)


module.exports = App