import React from 'react'
import ProjectCreation from '../../assets/ProjectCreation.svg'
import Catalog from '../../assets/Catalog.svg'
import { Link } from 'react-router-dom'


const CompanyDashboard = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
     <div className='text-center font-bold mb-2 text-2xl text-gray-700'><h1>Company  Dashboard</h1></div>
     <div className='flex justify-center mt-3 h-64 gap-3'>
     
   <Link to='/Assign' className='flex'><div className=' w-64 flex flex-col justify-center items-center shadow-lg font-semibold text-lg bg-blue-100 text-gray-700 hover:cursor-pointer hover:bg-blue-300 active:scale-95  active:shadow-sm'><img src={ProjectCreation} width="60"/>Projects Creation</div></Link> 
    <Link to= '/CompanyProject' className='flex'><div className=' w-64 flex flex-col justify-center items-center shadow-lg font-semibold text-lg bg-pink-100 text-gray-700 hover:cursor-pointer hover:bg-pink-300 active:scale-95  active:shadow-sm'><img src={Catalog} width="60"/>Project Catalog</div></Link> 
      
    </div>
    </div>
  )
}

export default CompanyDashboard
