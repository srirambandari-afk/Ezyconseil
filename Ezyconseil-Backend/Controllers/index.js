const {getCompanies,CreateCompany, CompanySignup, getSingleCompany, createCompanyProject,getCompanyProject,getProjects,updateCompanyProject,updateProgressProject} = require('./Company-Controllers')
const {createConsultants,getConsultant,ConsultantSignup, getSingleConsultant} = require('./Consultant-Controllers')
const {Login} = require('../Controllers/Authentication-Controller')
const { createApplication, getUserApplications, checkApplication, getApplications, getCompanyProjectApplicants, updateApplication, getSingleApplication } = require('./Application-controller')
const { createBillStatement, getSingleBill } = require('./Bill-controller')



module.exports = {getCompanies,CreateCompany,createConsultants,getConsultant,ConsultantSignup,Login,CompanySignup,
    getSingleCompany,createCompanyProject,
    getCompanyProject,getProjects,createApplication, 
    getUserApplications,checkApplication,updateCompanyProject,getApplications,getCompanyProjectApplicants,getSingleConsultant,updateApplication,
    updateProgressProject,getSingleApplication ,createBillStatement,getSingleBill
}