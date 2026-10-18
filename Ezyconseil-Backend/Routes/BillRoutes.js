const express = require('express')
const { createBillStatement, getSingleBill } = require('../Controllers')
const { getBillStatements } = require('../Controllers/Bill-controller')



const  BillRouter = express.Router()


BillRouter.post('/',createBillStatement)
BillRouter.get('/',getBillStatements)
BillRouter.get('/:id',getSingleBill)







module.exports = BillRouter