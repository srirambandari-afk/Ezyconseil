const express = require('express')
const {getCompanies,CreateCompany, CompanySignup, getSingleCompany,createCompanyProject,getCompanyProject,getProjects,updateCompanyProject, updateProgressProject} = require('../Controllers/index')
const CompanyRouter = express.Router()


CompanyRouter.post('/',CreateCompany)
CompanyRouter.get('/',getCompanies)
CompanyRouter.post('/signup',CompanySignup)
CompanyRouter.get('/Project',getProjects)
CompanyRouter.get('/:id',getSingleCompany)
CompanyRouter.post('/Project',createCompanyProject)
CompanyRouter.put('/Project/progress/:id',updateProgressProject)
CompanyRouter.put('/Project/Update/:id',updateCompanyProject)
CompanyRouter.get('/Project/:id',getCompanyProject)



module.exports = CompanyRouter