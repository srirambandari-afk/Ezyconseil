import { useEffect, useState } from 'react'
import { BrowserRouter,Navigate,Route,Routes, } from 'react-router-dom'
import './App.css'
import { Banner,   ConsultantDetails,   Home, Login, Payment, UserProfile,  } from './Components'
import { AuthenticationContextConsume } from './Context/AuthenticationContext'
import { FormContextConsume } from './Context/FormContext'
import { Company, CompanySignup, ConsultantRegistration, ConsultantSignup, CreateUser, RegistrationChoice, Success } from './Components/Signups & Registrations'
import { AssignProject, CompanyProjectDetails, ProjectDetails } from './Components/ProjectDetails & Assign Projects'
import { AdminRequestInfo, AdminUserInfo, ApplicationInfo, BillInfo, CompanyInfo, CompanyProjectInfo, ConsultantInfo, ProjectInfo, RequestInfo } from './Components/Infocardholders'
import { AdminDashboard, CompanyDashboard, ConsultantDashboard } from './Components/Dashboards'









function App() {

  const User = JSON.parse(localStorage.getItem("UserDetails"))

  const {signIn,role,setRole} = AuthenticationContextConsume()
 

  console.log("Role from  App:",role)

  const roleRoutes = {
       Admin:'/admin',
       Consultant:'/Consultant',
       Company:'/Company'

}
useEffect(()=>{
    
  setRole(User?.role)

},[signIn])
 

  return (
   <>
   
   <BrowserRouter>
   <Banner/>
   <Routes>
    <Route path='/ConsultantRegistration' element = {<ConsultantRegistration/>}/>
    <Route path='/Consultantdetails' element = {<ConsultantInfo/>}/>
    <Route path='/CompanyInfo' element={(role == 'Admin')?<CompanyInfo/>:<Navigate to = '/'/>}/>
    <Route path='/'  element = {roleRoutes[role]?<Navigate to ={roleRoutes[role]}/>:<Home/>}/>
    <Route path='/CompanyRegistration' element={<Company/>}/>
    <Route path='/register' element={<RegistrationChoice/>}/>
    <Route path='/login' element={roleRoutes[role]?<Navigate to ={roleRoutes[role]}/>:<Login/>}/>
    <Route path='/consultantsignup' element={<ConsultantSignup/>}/>
    <Route path='/companysignup' element={<CompanySignup/>}/>
    <Route path='/success' element={<Success/>}/>
    <Route path = '/Consultant' element={(role == 'Consultant')?<ConsultantDashboard/>:<Navigate to = '/'/>}/>
    <Route path='/Company' element={(role == 'Company')?<CompanyDashboard/>:<Navigate to = '/'/>}/>
    <Route path = '/Assign' element = {<AssignProject/>}/>
    <Route path = '/CompanyProject' element = {(role == 'Company')?<CompanyProjectInfo/>:<Navigate to ='/'/>}/>
    <Route path = '/CompanyProjectDetails/:id' element = {(role == 'Company')?<CompanyProjectDetails/>:<Navigate to ='/'/>}/>
    <Route path = '/ProjectDetails/:id' element={(role == 'Consultant' || role == 'Admin')?<ProjectDetails/>:<Navigate to ='/'/>}/>
    <Route path = '/ProjectInfo' element={(role == 'Consultant'|| role == 'Admin')?<ProjectInfo/>:<Navigate to = '/'/>}/>
    <Route path = '/ApplicationInfo' element={(role == 'Consultant')?<ApplicationInfo/>:<Navigate to = '/'/>}/>
    <Route path = '/RequestInfo/:id' element={(role == 'Company'|| role == 'Admin')?<RequestInfo/>:<Navigate to = '/'/>}/> 
    <Route path = '/ConsultantDetails/:id' element ={(role == 'Company' || role == 'Admin')? <ConsultantDetails/>:<Navigate to = '/'/>}/>
    <Route path='/bill/:id' element={(role == 'Admin' || role == 'Company')?<Payment/>:<Navigate to='/'/>}/>
    <Route path='/admin' element = {(role == 'Admin')?<AdminDashboard/>:<Navigate to = '/'/>}/>
    <Route path = '/AdminRequestInfo' element = {(role == 'Admin')? <AdminRequestInfo/>:<Navigate to = '/'/>}/>
    <Route path = '/AdminUserInfo' element = {(role == 'Admin')?<AdminUserInfo/>:<Navigate to = '/'/>}/>
    <Route path='/bills' element={(role == 'Admin')?<BillInfo/>:<Navigate to = '/'/>}/>
    <Route path='/CreateUser' element={(role == 'Admin')?<CreateUser/>:<Navigate to ='/'/>}/>
    <Route path = '/Profile' element={(role == null || role == undefined)?<Navigate to='/'/>:<UserProfile/>}/>
    
   </Routes>
   </BrowserRouter>
   
   </>
  )
}

export default App
