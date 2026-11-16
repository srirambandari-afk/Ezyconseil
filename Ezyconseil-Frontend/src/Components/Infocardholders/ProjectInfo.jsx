import React, { useEffect } from 'react'
import { FormContextConsume } from '../../Context/FormContext'
import ProjectInfoCard from '../Infocards/ProjectInfoCard'
import fetch_url from '../../api'


const ProjectInfo = () => {

    const {ProjectState,ProjectDispatch} = FormContextConsume()

    const getProjects = async()=>{

        const response = await fetch(fetch_url+'/Company/Project')

        const data = await response.json()

        console.log(data.Projects)

        const Projects = data.Projects || []

        ProjectDispatch({type:'getAllProjects',payload:Projects})

    }

    useEffect(()=>{

        getProjects()
    },[])

    console.log("Project State:",ProjectState)



  return (



    <div>

         <h1 className=' flex justify-center font-bold text-blue-700 bg-blue-200 p-3 mb-3'> Project Information</h1> 

     { ProjectState.length>0 && ProjectState.map((project)=><ProjectInfoCard key={project.id}
     id = {project.id} ID = {project.ID} companyname = {project.CompanyName}
     title ={project.projectTitle} date1= {project.startDate} date2={project.completionDate}
    />) || <ProjectInfoCard/> } 

      
    </div>
  )
}

export default ProjectInfo
