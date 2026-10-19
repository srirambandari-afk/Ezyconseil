import React from 'react'
import { Link } from 'react-router-dom'


const CompanyProjectInfocard = (props) => {
  return (
    <div>

        <div className='flex justify-evenly gap-1 bg-gray-500 text-white mx-3 mb-3'>
        <div className='w-48'><h2 className='font-medium'>Project ID</h2><p >{props.id}</p></div>
        <div className='w-64'><h2 className='font-medium'>Project Title</h2><p>{props.title} </p> </div>
        <div><h2 className='font-medium'>Project Start Date</h2><p>{(new Date(props.date1)).toDateString()}</p></div>
        <div><h2 className='font-medium'>Project End Date</h2> <p>{(new Date(props.date2)).toDateString()}</p> </div>
        <div><h2 className='font-medium'>Details of Project</h2> <p className='text-blue-600 hover:underline'><Link to ={`/CompanyProjectDetails/${props.id}`}>Link for details</Link></p> </div>
        
        
        </div>
      
    </div>
  )
}

export default CompanyProjectInfocard
