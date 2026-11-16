import React from 'react'
import { Link } from 'react-router-dom'

const BillInfoCard = (props) => {
 return(    <div className='flex justify-evenly bg-white shadow-lg text-gray-500 mx-3 mb-3'>
        <div className='w-44'><h2 className='font-medium'>Bill Number</h2><p >{props.billNumber}</p></div>
        <div className='w-44'><h2 className='font-medium'>Project ID</h2><p >{props.projectID}</p></div>
        <div className='w-44'><h2 className='font-medium'>Project Title</h2><p >{props.projectTitle}</p></div>
        <div className='w-44'><h2 className='font-medium'>Company Name</h2><p >{props.CompanyName}</p></div>
        <div className='w-44'><h2 className='font-medium'>Consultant Name</h2><p >{props.applicantName}</p></div>
        <div className='w-44'><h2 className='font-medium'>Approved Application ID</h2><p >{props.ApprovedApplicationID}</p></div>
        <div className='w-44'><h2 className='font-medium '>Statement Date</h2><p>{new Date(props.statementDate).toDateString()}</p></div>
        <div className='w-44'><h2 className='font-medium'>Details of Bill</h2> <p className='text-blue-600 hover:underline'><Link to ={`/bill/${props.billNumber}`}>Link for details</Link></p> </div>
        
        
        </div>)
}

export default BillInfoCard
