import React from 'react'
import { Link } from 'react-router-dom'


const ConsultantDashboard = () => {
  return (
    <div className='min-h-screen bg-gray-100 border'>
        <div className='text-center font-bold mb-2 text-2xl text-gray-700'><h1>Consultant Dashboard</h1></div>
    <div className='flex justify-center mt-3 h-64 gap-3'>
     
     <Link to = '/ProjectInfo' className='flex'><div className=' w-64 flex justify-center items-center shadow-lg font-semibold text-lg bg-blue-100 text-gray-700 hover:cursor-pointer hover:bg-blue-300 active:scale-95  active:shadow-sm'>Projects Available</div></Link>
     <Link to = '/ApplicationInfo'className='flex' ><div className=' w-64 flex justify-center items-center shadow-lg font-semibold text-lg bg-pink-100 text-gray-700 hover:cursor-pointer hover:bg-pink-300 active:scale-95  active:shadow-sm'>Projects Applied </div></Link>
    </div>
     
    </div>
  )
}

export default ConsultantDashboard
