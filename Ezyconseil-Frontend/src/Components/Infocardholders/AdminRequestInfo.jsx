import React, { useEffect, useState } from 'react'
import AdminRequestInfoCard from '../Infocards/AdminRequestInfoCard'
import fetch_url from '../../api'





const AdminRequestInfo = () => {

    const [request,setRequest] = useState(null)

    
    
        const getUserApplications = async()=>{
    
           try{
             const response = await fetch(fetch_url+`/application/`)
    
           const data = await response.json()
    
          console.log("Response for Project:",data)

          console.log("Requests:",data.requests)

          const requests = data.Applications


          setRequest(requests)
           }catch(error){

            console.log("Applications for Projects  error:",error)
           }
    
          


    
    
        }
    
       useEffect(()=>{
    
        
        getUserApplications()
    
        
       },[])
    
       console.log("Request:",request)
  return (
    <div>
         <h1 className=' flex justify-center font-bold text-blue-700 bg-blue-200 p-3 mb-3'> Admin View of Application Information</h1> 
      { request !==  null && request.map((application)=> <AdminRequestInfoCard key= {application.applicationid}
      id = {application.applicationid}
      projectId = {application.projectId}
      projectTitle= {application.projectTitle}
      companyname = {application.companyname}
      userid = {application.userid}
      taskStatus = {application.taskStatus}
      username = {application.username}
      status = {application.status}
      time = {application.appliedAt}

      


      
      />)}
      
    </div>
  )
}


export default AdminRequestInfo
