import React, { useEffect } from 'react'
import CompanyProjectInfocard from '../Infocards/CompanyProjectInfocard'
import { FormContextConsume } from '../../Context/FormContext'
import fetch_url from '../../api'



const CompanyProjectInfo = () => {
 const {CompanyProjectState,CompanyProjectDispatch} = FormContextConsume()

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

 


  return (
    <div>
     <h1 className=' flex justify-center font-bold text-blue-700 bg-blue-200 p-3 mb-3'>Company Project Information</h1> 

     { CompanyProjectState.length>0 && CompanyProjectState.map((project)=><CompanyProjectInfocard key={project.id}
     id = {project.id}
     title ={project.projectTitle} date1= {project.startDate} date2={project.completionDate}
    />) }

  
     
    </div>
  ) 
}

export default CompanyProjectInfo
