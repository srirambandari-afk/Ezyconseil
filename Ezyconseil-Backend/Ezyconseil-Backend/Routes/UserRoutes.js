const express = require('express')
const { getAllUsers, getSingleUser } = require('../Controllers/User-controller')


const UserRouter = express.Router()




UserRouter.get('/',getAllUsers)
UserRouter.get('/:id',getSingleUser)









module.exports = UserRouter