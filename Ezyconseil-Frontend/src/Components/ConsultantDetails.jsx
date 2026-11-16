import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthenticationContextConsume } from '../Context/AuthenticationContext'
import fetch_url from '../api'

const ConsultantDetails = () => {

    const {id} = useParams()

    const{role} = AuthenticationContextConsume()

    const [consultant , setConsultant] = useState(null)

    const getConsultant = async()=>{

      try{
        const response =  await fetch(`${fetch_url}/Consultant/${id}`)

       const json = await response.json()

       const User = json.Consultant

       setConsultant(User ?? null)

     

      }catch(error){
        console.log("Getting Consultants error:",error)
      }
            




    }

    useEffect(()=>{

      getConsultant()
    },[])

    const download = async()=>{
      alert("File download initiated!!!")

      const ID = consultant?.resume.split("\\")[1]

      

       const response = await fetch(fetch_url + "/uploads/"+ID)

       if(response.ok){

        const resumeURL = response.url


       window.open(resumeURL, "_blank")

       }else{
        alert("Download Failed!!!")
        console.log(response)
       }

       

    }



  return (
       <div className='min-h-screen bg-gray-100 flex justify-center  text-gray-700'>
        <div className='h-full  w-1/2 shadow-lg bg-purple-100 mb-3 '>
        <h2 className='text-xl font-semibold text-center '>Consultant Details</h2>
        
       
      
      <hr className='mt-5 text-purple-500'/>
      <div className=' flex flex-col gap-3  mt-5 [&_h2]:font-semibold pl-4 '>
        <div><h2>Consultant ID:</h2><p>{consultant?.id ?? null }</p></div>
        <div><h2>Consultant Name: </h2><p>{consultant?.name ?? null }</p></div>
        { role =='Admin' &&  <div><h2>Consultant Email:</h2><p>{consultant?.email ?? null }</p></div>  }
        { role =='Admin' &&  <div><h2>Consultant Phone:</h2><p>{consultant?.phone ?? null }</p></div>  }
        <div><h2>Consultant Expertise :</h2><p>{consultant?.expertise ?? null }</p></div>
        <div><h2>Consultant Resume:</h2><p>{consultant?.resume ?? null }</p></div>
        { consultant?.resume.includes("uploads\\") && <button className='bg-purple-500 text-gray-200 active:scale-95 cursor-pointer' onClick = {download}>DownLoad Resume</button>}
       
        
        
        
        
        
        
        
        
        
        
        
        
        
      </div>
      </div>
    </div>
  )
}

export default ConsultantDetails
