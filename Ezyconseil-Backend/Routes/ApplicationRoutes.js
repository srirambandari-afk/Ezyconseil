const express = require('express')
const { getUserApplications, createApplication, checkApplication, getApplications, getCompanyProjectApplicants, updateApplication ,getSingleApplication } = require('../Controllers')



const ApplicationRouter = express.Router()

ApplicationRouter.post('/',createApplication)
ApplicationRouter.get('/',getApplications)
ApplicationRouter.get('/project/:id',getCompanyProjectApplicants)
ApplicationRouter.patch('/check',checkApplication)
ApplicationRouter.get('/request/:id',getSingleApplication)
ApplicationRouter.patch('/request/:id',updateApplication)

ApplicationRouter.get('/:id',getUserApplications)





module.exports = ApplicationRouter