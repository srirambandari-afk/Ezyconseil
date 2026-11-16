import React from 'react'
import { Link } from 'react-router-dom'

const RegistrationChoice = () => {
  return (
    <div className=' min-h-screen flex justify-center items-center'>
        <div className='flex h-[400px] w-[800px]'>
            
      <Link to='/ConsultantRegistration'className='flex w-1/2'><div className='shadow-lg bg-gray-100 w-full flex justify-center items-center  text-2xl font-bold text-gray-700 m-1 cursor-pointer hover:bg-gray-200 hover:text-gray-500 active:scale-95  active:shadow-none transition-all'>Register as consultant</div></Link>
      <Link to='/CompanyRegistration' className='flex w-1/2'><div className='shadow-lg bg-red-100 w-full flex justify-center items-center  text-2xl font-bold text-gray-700 m-1 cursor-pointer hover:bg-red-200 hover:text-gray-500 active:scale-95  active:shadow-none transition-all'> Register as company</div></Link>
        </div>
      
    </div>
  )
}

export default RegistrationChoice
