const express = require('express')
const {Login} = require('../Controllers/index')
const { UpdatePassword } = require('../Controllers/Authentication-Controller')
const AuthenticationRouter = express.Router()


AuthenticationRouter.post('/',Login)

AuthenticationRouter.post('/UpdatePassword',UpdatePassword)


module.exports = AuthenticationRouter