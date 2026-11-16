import React, { useEffect, useState } from 'react'
import RequestInfoCard from '../Infocards/RequestInfoCard'
import { useParams } from 'react-router-dom'
import fetch_url from '../../api'


const RequestInfo = () => {

    const [request,setRequest] = useState(null)

    const {id} = useParams()
    
        const getUserApplications = async()=>{
    
           try{
             const response = await fetch(`${fetch_url}/application/project/${id}`)
    
           const data = await response.json()
    
          console.log("Response for Project:",data)

          console.log("Requests:",data.requests)

          const requests = data.requests 


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
         <h1 className=' flex justify-center font-bold text-blue-700 bg-blue-200 p-3 mb-3'> Applicant Information</h1> 
      { request !==  null && request.map((application)=> <RequestInfoCard key= {application.projectId}
      id ={application.projectId} 
      userid = {application.userid} 
      username = {application.username}
      status = {application.status}
      time = {application.appliedAt}
      applicationid = {application.applicationid}

      
      
      />)}
      
    </div>
  )
}

export default RequestInfo
