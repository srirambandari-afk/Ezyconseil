import React, { useEffect, useState } from 'react'
import ApplicationInfoCard from '../Infocards/ApplicationInfoCard'
import fetch_url from '../../api'


const ApplicationInfo = () => {

    

    const [request,setRequest] = useState(null)

    const getUserApplications = async()=>{

        const User = JSON.parse(localStorage.getItem("UserDetails"))

        const {id} = User

       const response = await fetch(`${fetch_url}/application/${id}`)

       const data = await response.json()

       const data1 = data.requests 

       setRequest(data1)


    }

   useEffect(()=>{

    
    getUserApplications()

    
   },[])

   console.log("Request:",request)

   

    

   

    

  return (
    <div>
       <h1 className=' flex justify-center font-bold text-blue-700 bg-blue-200 p-3 mb-3'> Application Information</h1> 
      { request !==  null && request.map((application)=> <ApplicationInfoCard 
      key={application.applicationid}
      applicationId= {application.applicationid}
      id = {application.projectId}
      companyname = {application.companyname}
      status = {application.status}
      userid = {application.userid}
      time = {application.appliedAt}
      taskStatus = {application.taskStatus}

      
      
      />) || <ApplicationInfoCard/>}
    </div>
  )
}

export default ApplicationInfo
