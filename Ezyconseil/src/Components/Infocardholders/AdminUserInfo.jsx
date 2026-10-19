import React, { useEffect, useState } from 'react'
import AdminUserInfoCard from '../Infocards/AdminUserInfoCard'
import { Link } from 'react-router-dom'
import fetch_url from '../../api'



const AdminUserInfo = () => {

    const [request,setRequest] = useState(null)

    
    
        const getUserDetails = async()=>{
    
           try{
             const response = await fetch(fetch_url+`/Users/`)
    
           const data1 = await response.json()
    
          console.log("Response for Users:",data1)


          const users = data1.data

          setRequest(users)

          


         
           }catch(error){

            console.log("Users information fetch error:",error)
           }
    
          


    
    
        }
    
       useEffect(()=>{
    
        
        getUserDetails()
    
        
       },[])
    
       console.log("Users:",request)
  return (
    <div>
         <h1 className=' flex justify-center font-bold text-blue-700 bg-blue-200 p-3 mb-3'> Admin View of Users and their Information</h1> 
         <div className="flex justify-end px-4 py-3">
  <Link to ='/CreateUser'>
  <button
    
    className="flex items-center gap-2 rounded-md
               bg-blue-600 px-4 py-2 text-white
               hover:bg-blue-700
               active:scale-95"
  >
    <span>+</span>
    Create User
  </button>
  </Link>
</div>
      { request !==  null && request.map((application)=> <AdminUserInfoCard key= {application.id}
      id  = {application.id}
      name = {application.name}
      email = {application.email}
      role = {application.role}
      />)}
      
    </div>
  )
}

export default AdminUserInfo
