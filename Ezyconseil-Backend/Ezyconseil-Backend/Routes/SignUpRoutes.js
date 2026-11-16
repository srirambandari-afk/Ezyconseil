const express = require('express')
const { RegisterUser, preventGet } = require('../Controllers/Signup-Controllers')
const SignUpRouter = express.Router()





SignUpRouter.post('/',RegisterUser)

SignUpRouter.get('/',preventGet)

module.exports = SignUpRouter