import React, { useEffect, useState } from 'react'
import BillInfoCard from '../Infocards/BillInfoCard'
import fetch_url from '../../api'


const BillInfo = () => {

    const [request,setRequest] = useState(null)

    
    
        const getBillDetails = async()=>{
    
           try{
             const response = await fetch(fetch_url+"/Bill/")
    
           const data1 = await response.json()
    
          console.log("Response for Bill Statements:",data1)


          const Bills = data1.Bills

          setRequest(Bills)


         
           }catch(error){

            console.log("Users information fetch error:",error)
           }
    
          


    
    
        }
    
       useEffect(()=>{
    
        
        getBillDetails()
    
        
       },[])
    
       console.log("Bills:",request)
  return (
    <div>
         <h1 className=' flex justify-center font-bold text-blue-700 bg-blue-200 p-3 mb-3'> Admin View of Bill Statements</h1> 
      { request !==  null && request.map((application)=> <BillInfoCard key= {application.billNumber}
      billNumber = {application.billNumber}
      projectID = {application.projectID}
      projectTitle = {application.projectTitle}
      CompanyName = {application.CompanyName}
      applicantName = {application.applicantName}
      ApprovedApplicationID = {application.ApprovedApplicationID}
      statementDate = {application.statementDate}
      
      />)}
      
    </div>
  )
}


export default BillInfo
