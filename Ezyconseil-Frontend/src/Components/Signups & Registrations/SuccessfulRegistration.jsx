import React from 'react'
import { useNavigate } from 'react-router-dom'


const Success = () => {

    const navigate = useNavigate()

    setTimeout(()=>{
        navigate('/login')
    },5000)
       




  return (
    <div className='min-h-screen bg-purple-200 text-gray-600 text-2xl flex items-center justify-center'>
        <h2>You have registered successfully you will be redirected to the login page shortly !!!</h2>
      
    </div>
  )
}

export default Success
