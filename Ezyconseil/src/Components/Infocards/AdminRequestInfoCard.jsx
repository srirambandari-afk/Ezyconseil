import React from 'react'
import { Link } from 'react-router-dom'


const AdminRequestInfoCard = (props) => {


    return(    <div className='flex justify-evenly bg-white shadow-lg text-gray-500 mx-3 mb-3'>
        <div className='w-44'><h2 className='font-medium'>Application ID</h2><p >{props.id}</p></div>
        <div className='w-44'><h2 className='font-medium'>Project ID</h2><p >{props.projectId}</p></div>
        <div className='w-44'><h2 className='font-medium'>Project Title</h2><p >{props.projectTitle}</p></div>
        <div className='w-44'><h2 className='font-medium'>Company Name</h2><p >{props.companyname}</p></div>
        <div className='w-44'><h2 className='font-medium'>Consultant ID</h2><p >{props.userid}</p></div>
        <div className='w-44'><h2 className='font-medium'>Consultant Name</h2><p >{props.username}</p></div>
        <div className='w-44 ml-2'><h2 className='font-medium'>Task Status</h2><p >{props.taskStatus}</p></div>
        <div className='w-44'><h2 className='font-medium'>Status</h2><p>{props.status == false ? <span className='inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700'><span className='h-2 w-2 rounded-full bg-amber-500'></span>Not Approved</span> : <span className='inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700'><span className='h-2 w-2 rounded-full bg-green-500'></span>Approved</span>}</p> </div>
        <div className='w-44'><h2 className='font-medium '>Application Date and Time</h2><p>{new Date(props.time).toDateString()+" "+ new Date(props.time).toLocaleTimeString()}</p></div>
        <div className='w-44'><h2 className='font-medium'>Details of Consultant</h2> <p className='text-blue-600 hover:underline'><Link to ={`/ConsultantDetails/${props.userid}`}>Link for details</Link></p> </div>
        
        
        </div>)
    

       
        
      
    
}

export default AdminRequestInfoCard
