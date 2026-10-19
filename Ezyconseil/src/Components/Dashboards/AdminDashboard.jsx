import React from 'react'
import {
    FolderKanban,
    Building2,
    Users,
    FileText,
   
} from "lucide-react"
import { Link } from 'react-router-dom'


const AdminDashboard = () => {
  return (
      <div className=' h-screen '>
        <div className='flex justify-center text-2xl font-bold text-purple-950'><h1>Dashboard</h1></div>
        <div className=' flex justify-center mt-4 h-full'>
             <div className='flex justify-center gap-4 mt-3 h-3/4 flex-wrap w-1/2 '>
  
          <Link to = '/AdminRequestInfo' className='flex'>
           <div className='flex flex-col items-center shadow-lg p-3 w-64 justify-center 
           bg-blue-100 hover:bg-blue-300 text-gray-700 hover:cursor-pointer active:scale-95'>
           
          <FileText size={20}/>
          <h1 className='font-semibold text-lg'>Applications</h1>
          </div>
          </Link>
                <Link to = '/ProjectInfo' className='flex'>
                <div className='flex flex-col items-center shadow-lg p-3 w-64 justify-center bg-green-100 hover:bg-green-300 text-gray-700 active:scale-95'>
                   <FolderKanban size={20}/>
               <h1 className='font-semibold text-lg' >Projects</h1>
              </div>
              </Link>
              <Link to='/CompanyInfo' className='flex'>
               <div className='flex flex-col items-center shadow-lg p-3 w-64 justify-center bg-orange-100 hover:bg-orange-300 text-gray-700 active:scale-95'>
                    <Building2 size={20}/>
              <h1 className='font-semibold text-lg'>Companies</h1>
              </div>
              </Link>
              <Link to='/AdminUserInfo' className='flex'>
               <div className='flex flex-col items-center shadow-lg p-3 w-64 justify-center bg-purple-100 hover:bg-purple-300 text-gray-700 active:scale-95'>
                <Users size={20}/>
              <h1 className='font-semibold text-lg'>Users</h1>
              </div>
              </Link>
        </div>
        </div>
       
      </div>
    )
}

export default AdminDashboard
