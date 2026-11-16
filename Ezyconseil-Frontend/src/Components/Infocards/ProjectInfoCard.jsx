import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { nanoid} from 'nanoid'
import { AuthenticationContextConsume } from '../../Context/AuthenticationContext'
import fetch_url from '../../api'


const ProjectInfoCard = (props) => {

  const [apply,setapply] = useState(false)

  const  {role} = AuthenticationContextConsume()

  

  
  const checkApply = async()=>{
        
    const User = JSON.parse(localStorage.getItem("UserDetails"))

    const userid = User.id

    const projectId = props.id

    const data = { userid , projectId}

    try {

      const response = await fetch(fetch_url+"/application/check",{
        method:"PATCH",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
      })

      console.log("Response:",response)

    if(response.ok){
      setapply(true)
    }else{
      setapply(false)
    }

    }catch(error){

      console.log("Error:"+error)
    }

    

    

  }

  useEffect(()=>{

      checkApply()
      
      console.log("Useeffect is running")
      
    },[])
   
  const projectApply = async()=>{

    alert("You have successfully applied for the project!!!")

    const applicationid = nanoid(10)

    const User = JSON.parse(localStorage.getItem("UserDetails"))

    const username = User.name

    const userid = User.id

    const projectId = props.id

    const projectTitle = props.title

    const companyId = props.ID

    const companyname = props.companyname

     const appliedAt = Date.now()

    const applicationDetails = { applicationid,projectId,projectTitle,userid,username,companyId,companyname,status:false,appliedAt }

    try{

    const response = await fetch(fetch_url+"/application",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(applicationDetails)

    })

    
      if (response.ok){
         
        try{
             const projectId = props.id

         const response = await fetch(`${fetch_url}/Company/Project/Update/${projectId}`,{
          method:"PUT"
         })

         const json = await response.json()

         console.log("Ipdated Project:",json)

        }catch(error){
          console.log("Project Update Error:",error)
        }
        

      }

    

    const json = await response.json()

  }catch(error){
    console.log("Error:"+error)
  }



    

    setapply(!apply)

    
  }

  console.log(apply)

  return (
    <div>

         <div className='flex justify-evenly gap-2 bg-white shadow-lg text-gray-500 mx-3 mb-3'>
        <div><h2 className='font-medium'>Company ID</h2><p >{props.ID}</p></div>
        <div><h2 className='font-medium'>Company Name</h2><p >{props.companyname}</p></div>
        <div><h2 className='font-medium'>Project ID</h2><p >{props.id}</p></div>
        <div><h2 className='font-medium '>Project Title</h2><p className='w-54' >{props.title} </p> </div>
        <div><h2 className='font-medium '>Project Start Date</h2><p>{(new Date(props.date1)).toDateString()}</p></div>
        <div><h2 className='font-medium '>Project End Date</h2> <p>{(new Date(props.date2)).toDateString()}</p> </div>
        <div><h2 className='font-medium'>Details of Project</h2> <p className='text-blue-600 hover:underline'><Link to ={`/ProjectDetails/${props.id}`}>Link for details</Link></p> </div>
        
        { role == 'Consultant' &&  <div className='flex items-center px-2'><button className='bg-gray-100 border enabled:active:scale-95 text-gray-700 px-3 h-10 disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed disabled:border-0  ' disabled={apply}
         onClick={projectApply}> Apply</button></div>}
        
        
        </div>
      
    </div>
  )
}

export default ProjectInfoCard
