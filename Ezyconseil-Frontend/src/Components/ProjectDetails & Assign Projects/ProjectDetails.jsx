import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { FormContextConsume } from '../../Context/FormContext'
import fetch_url from '../../api'


const ProjectDetails = () => {
     
      const {ProjectState,ProjectDispatch} = FormContextConsume()
       
      const [details,setDetails] = useState(null)

      const {id} = useParams()

        const getProjects = async()=>{
      
              const response = await fetch(fetch_url+'/Company/Project')
      
              const data = await response.json()
      
              console.log(data.Projects)
      
              const Projects = data.Projects
      
              ProjectDispatch({type:'getAllProjects',payload:Projects})
      
          }
      
          useEffect(()=>{
      
              getProjects()
          },[])

          const ProjectDetails = ProjectState.find((element)=>element.id == id)

           useEffect(()=>{
          
                if(ProjectDetails){
                   
                  setDetails(ProjectDetails)
                }
          
          
          
              },[ProjectDetails])


              const { projectTitle , description, requiredSkills , deliverables, startDate, completionDate, budget, paymentType, instructions,applied,projectStatus} = details || {}


              const date1 = new Date (startDate)

              const Date1 = date1.toDateString()

              const date2 = new Date (completionDate)

              const Date2 = date2.toDateString()
      


  return (
     <div className='min-h-screen bg-gray-100 flex justify-center  text-gray-700'>
        <div className='h-full  w-1/2 shadow-lg bg-purple-100 mb-3 '>
        <h2 className='text-xl font-semibold text-center '>Project Details</h2>
        
       
      
      <hr className='mt-5 text-purple-500'/>
      <div className=' flex flex-col gap-3  mt-5 [&_h2]:font-semibold pl-4 '>
        <div><h2>Project ID:</h2><p>{id}</p></div>
        <div><h2>Project Status</h2><p>{projectStatus}</p></div>
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
        
        
        
        
        
        
        
        
        
        
      </div>
      </div>
    </div>
  )
}

export default ProjectDetails
