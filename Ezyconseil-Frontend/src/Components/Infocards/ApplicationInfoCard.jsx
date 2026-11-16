import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import fetch_url from '../../api'

const ApplicationInfoCard = (props) => {

  const [deactivate, setDeactivate] = useState(props.status)

  const finishTask = async()=>{

    

    try{
    const id = props.applicationId

    console.log("Application ID",props.applicationId)

  
    const taskStatus1 = {taskStatus:"Completed",ApprovedApplicationID:id}
   

    const response = await fetch(`${fetch_url}/application/request/${id}`,{method:"PATCH",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(taskStatus1)
    })

    if(response.ok){
       setDeactivate(!deactivate)
       const json = await response.json()
      alert(json.message)
    }else{
       
      const json = await response.json()

      console.log(json.message)

    }

    

    
    }catch(error){

      console.log("Request Update error:",error)
    }

    try {

      const id = props.id

      const projectStatus1 = {projectStatus:"Completed"} 

      const response = await fetch(`${fetch_url}/Company/Project/progress/${id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(projectStatus1)
      })
      if(response.ok){
        const json = await response.json()

        alert(json.message)
      }else{
        const json = await response.json()

        console.log("Error:",json.message)
      }
    }catch(error){
      console.log("Project Progress error:",error)
    }

    
  }

 


  return (
    <div>

           <div className='flex justify-evenly  bg-white shadow-lg text-gray-500 mx-3 mb-3'>
        <div ><h2 className='font-medium'>Application ID</h2><p >{props.applicationId}</p></div>
        <div className='w-24' ><h2 className='font-medium'>Project ID</h2><p >{props.id}</p></div>
        <div ><h2 className='font-medium'>User ID</h2><p >{props.userid}</p></div>
        <div ><h2 className='font-medium'>Company Name</h2><p >{props.companyname}</p></div>
        <div className='w-24' ><h2 className='font-medium'>Status</h2><p>{props.status == false ? <span className='inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700'><span className='h-2 w-2 rounded-full bg-amber-500'></span>Not Approved</span> : <span className='inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700'><span className='h-2 w-2 rounded-full bg-green-500'></span>Approved</span>} </p></div>
        <div  ><h2 className='font-medium '>Application Date and Time</h2><p>{new Date(props.time).toDateString()+" "+ new Date(props.time).toLocaleTimeString()}</p></div>
        <div><h2 className='font-medium'>Details of Project</h2> <p className='text-blue-600 hover:underline'><Link to ={`/ProjectDetails/${props.id}`}>Link for details</Link></p> </div>
        <div><h2 className='font-medium'>Task Status</h2><p>{props.taskStatus}</p></div>
        <div className='h-12 w-44 flex justify-center items-center'>{ props.status == true &&<button className='h-10 px-3 bg-gray-100 shadow-lg enabled:active:scale-95 enabled:active:shadow-sm  disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed' disabled = {!deactivate} onClick={finishTask}>Finish Task</button>}</div>
        
        
        </div>
        
      
    </div>
  )
}

export default ApplicationInfoCard
