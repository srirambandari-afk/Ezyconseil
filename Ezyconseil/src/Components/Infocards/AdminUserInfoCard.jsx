import React from 'react'

const AdminUserInfoCard = (props) => {
  return(    <div className='flex justify-evenly bg-white shadow-lg text-gray-500 mx-3 mb-3'>
        <div className='w-44'><h2 className='font-medium'>User ID</h2><p >{props.id}</p></div>
        <div className='w-44'><h2 className='font-medium'>User Name</h2><p >{props.name}</p></div>
        <div className='w-44'><h2 className='font-medium'>Email</h2><p >{props.email}</p></div>
        <div className='w-44'><h2 className='font-medium'>Role</h2><p >{props.role}</p></div>
       
        
        
        </div>)
}

export default AdminUserInfoCard
