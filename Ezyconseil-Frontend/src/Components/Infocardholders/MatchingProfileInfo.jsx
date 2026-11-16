import React, { useEffect, useState } from 'react'
import MatchingProfiles from '../Infocards/MatchingProfileCards'
import fetch_url from '../../api'
import { useParams } from 'react-router-dom'




const MatchingProfileInfo = () => {

     const {id} = useParams()
   
     const [state,setState] = useState(null)

     const [show,setShow] = useState(false)

     const [name,setName] = useState(null)

    const getResponse = async()=>{
      // getting project descrition
      const response = await fetch(`${fetch_url}/Company/Project/${id}`)

     const response1 = await response.json()

     const description = response1.Project[0].description

     setName(response1.Project[0].projectTitle)

     // getting all consultant information 

     const response2 = await fetch(`${fetch_url}/Consultant`)

     const message = await response2.json()

     const users = message.data

     console.log(users)
       
     let result = null

     
      try {

           result = await Promise.all( users.map (async(user)=>{

      const resume = user.resume
      const projectDescription = description 

     

      const response = await fetch (`${fetch_url}/read-resume/`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({resume,projectDescription})
      })

      const message = await response.json()

      const result = message.result

      const {isMatch,strength} = result

      

      return {...user,isMatch,strength}

     }))

      }catch(error){
        console.log("Error:",error.message)
      }finally{
        alert("User information is finally gathered!!!")
        setShow(true)
        const filteredResult = result.filter((element)=>element.isMatch==true)
        setState(filteredResult)
        console.log("Result:",result)
      }
      
 


     

     



     



    
     

    }

    useEffect(()=>{

     getResponse()

    },[])



  return (
    <div className='bg-gray-100 min-h-screen p-5'>
  {show == false && <p className="text-blue-700 font-semibold">
    Finding matching profiles...
   </p>}
       
       <h1 className=' flex justify-center font-bold text-blue-700 bg-blue-200 p-3 mb-5 rounded-md'> Matching Profiles for {name}</h1> 
       {state?.map((element)=><MatchingProfiles key={element.id} ID = {element.id} Name = {element.name} Expertise = {element.expertise} Match = {element.isMatch} Strength = {element.strength}/>)}
       {state?.length ==0 && <div className=' text-center bg-purple-100 text-red-500 p-5'>No matching Profiles to display!!!</div>}
       
    </div>
  )
}

export default MatchingProfileInfo
