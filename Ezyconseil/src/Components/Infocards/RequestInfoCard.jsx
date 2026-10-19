import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthenticationContextConsume } from '../../Context/AuthenticationContext'
import fetch_url from '../../api'


const RequestInfoCard = (props) => {

  const [deactivate, setDeactivate] = useState(props.status)

  const {role} = AuthenticationContextConsume()

  const approveFunction = async()=>{

    alert("You have approved  the request")

    try{
    const id = props.applicationid

  
    const taskStatus1 = {taskStatus:"In Progress"}
   

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

      const projectStatus1 = {projectStatus:"In Progress"} 

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
        <div ><h2 className='font-medium'>Project ID</h2><p >{props.id}</p></div>
        <div ><h2 className='font-medium'>User ID</h2><p >{props.userid}</p></div>
        <div ><h2 className='font-medium'>Consultant Name</h2><p >{props.username}</p></div>
        <div ><h2 className='font-medium'>Status</h2><p>{props.status == false ? <span className='inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700'><span className='h-2 w-2 rounded-full bg-amber-500'></span>Not Approved</span> : <span className='inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700'><span className='h-2 w-2 rounded-full bg-green-500'></span>Approved</span>}</p> </div>
        <div  ><h2 className='font-medium '>Application Date and Time</h2><p>{new Date(props.time).toDateString()+" "+ new Date(props.time).toLocaleTimeString()}</p></div>
        <div><h2 className='font-medium'>Details of Consultant</h2> <p className='text-blue-600 hover:underline'><Link to ={`/ConsultantDetails/${props.userid}`}>Link for details</Link></p> </div>
        { role == 'Company' && <button className='bg-gray-200 border text-gray-700 enabled:active:scale-95 h-10 px-3 items-center disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed' disabled = {deactivate} onClick={approveFunction} >Approve</button> }
        
        </div>
        
      
    </div>
  )
}

export default RequestInfoCard
