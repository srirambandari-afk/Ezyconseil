import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { FormContextConsume } from '../../Context/FormContext'
import { Pencil ,Save} from "lucide-react"
import fetch_url from '../../api'


const CompanyProjectDetails = () => {

  const navigate = useNavigate()
  
  const {CompanyProjectState,CompanyProjectDispatch} = FormContextConsume()
   
  const [details,setDetails] = useState(null)

 const  [applicationInfo , setApplicationInfo] = useState(null)

  const [edit, setEdit] = useState(false)

   const {id} = useParams()



   const editContent = ()=>{

    setEdit(!edit)

    // console.log(edit)
   }

   const getCompanyProjects = async()=>{
         
      const User = JSON.parse(localStorage.getItem("UserDetails"))
  
      
  
      const id = User.id
  
      const response = await fetch(`${fetch_url}/Company/Project/${id}`)
  
      const data = await response.json()
  
      const Project = data.Project

      
  
      
  
      CompanyProjectDispatch({type:'getAllCompanyProjects',payload:Project})
  
    }
  
    useEffect(()=>{
      getCompanyProjects()


      
    },[])

   

    const ProjectDetails = CompanyProjectState.find((element)=>element.id == id)

    

    useEffect(()=>{

      if(ProjectDetails){
         
        setDetails(ProjectDetails)
      }



    },[ProjectDetails])

    
     

     const { projectTitle , description, requiredSkills , deliverables, startDate, completionDate, budget, paymentType, instructions,applied,projectStatus,ApprovedApplicationID} = details || {}
    
    
    const date1 = new Date (startDate)

    const Date1 = date1.toDateString()

    const date2 = new Date (completionDate)

    const Date2 = date2.toDateString()

    
    

    const paymentStatement = async()=>{
      alert("Generating the payment statement")

      const Id = ApprovedApplicationID

      console.log("Application ID:",Id)

      try{  const response = await fetch(`${fetch_url}/application/request/${Id}`)

      const json = await response.json()

      

      const request = json.request

      const applicantName = request.username

      const CompanyName = request.companyname
        
      setApplicationInfo([applicantName,CompanyName])
    
    }
      catch(error){

        console.log("Application response error:",error)
      }



    

      const PN = Date.now()

      const billNumber = "PS" + PN

    

      
      
      
      const applicantName = applicationInfo[0]

      const CompanyName = applicationInfo[1]

      const statementDate = Date.now()

      const bill = {billNumber,CompanyName,projectID:id, projectTitle,completionDate,budget,ApprovedApplicationID,applicantName,statementDate }
         
      try {
        const response1 = await fetch(fetch_url+"/Bill",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(bill)
      })

      

      const json1 = await response1.json()

      console.log("Bill response",json1)


      

     

      

      }catch(error){

        console.log("Bill creation error:",error)

        console.log(error.stack);
      }
         
      console.log(billNumber)

       navigate(`/bill/${billNumber}`)

    }
    

    

  return (
    <div className='min-h-screen bg-gray-100 flex justify-center  text-gray-700'>
        <div className='h-full  w-1/2 shadow-lg bg-purple-100 mb-3 '>
        <h2 className='text-xl font-semibold text-center '>Your Project Details</h2>
        
       
      
      <hr className='mt-5 text-purple-500'/>
      <div className=' flex flex-col gap-3  mt-5 [&_h2]:font-semibold pl-4 '>
        <div><h2>Project ID:</h2><p>{id}</p></div>
        <div><h2>Project Status:</h2><p>{projectStatus}</p></div>
        <div><h2>Project Title:</h2><p>{projectTitle}</p></div>
        <div><h2>Description:</h2><p>{description}</p></div>
        <div><h2>Required Skills:</h2><p>{requiredSkills}</p></div>
        <div><h2>Deliverables:</h2><p>{deliverables}</p></div>
        <div><h2>Start Date:</h2><p>{Date1}</p></div>
        <div><h2>Completion Date:</h2><p>{Date2}</p></div>
        <div><h2>Budget:</h2><p>{budget}</p></div>
        <div><h2>Payment Type:</h2><p>{paymentType}</p></div>
        <div><h2>Instructions:</h2><p>{instructions}</p></div>
        <div><h2>Number of people applied:</h2><p>{applied}</p></div>
        <div><h2>Details of people applied:</h2><p className='text-blue-600 hover:underline'><Link to = {`/RequestInfo/${id}`}>Link</Link></p></div>
        <div><h2>Approved Application ID:</h2><p>{ApprovedApplicationID}</p></div>
        { projectStatus == "Completed" && <button className='bg-gray-200 text-gray-700 shadow-lg active:scale-95 active:shadow-sm' onClick={paymentStatement}>Generate Payment Statement</button>}
        
        
        
        
        
        
        
        
      </div>
      </div>
    </div>
  )
}

export default CompanyProjectDetails
