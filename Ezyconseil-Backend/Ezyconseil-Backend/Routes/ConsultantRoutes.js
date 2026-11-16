const express = require('express')
const {createConsultants,getConsultant,ConsultantSignup, getSingleConsultant} = require('../Controllers/index')


const ConsultantRouter = express.Router()

ConsultantRouter.post('/',createConsultants)
ConsultantRouter.get('/',getConsultant)
ConsultantRouter.post('/signup',ConsultantSignup)
ConsultantRouter.get('/:id',getSingleConsultant)





module.exports = ConsultantRouter