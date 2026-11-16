import React from 'react'

const CompanyInfoCard = (props) => {
  return (
    <div>
        <div className='flex justify-evenly bg-white shadow-lg text-gray-500 mx-3 mb-3 [&_h2]:font-semibold'>
            <div className='w-34'><h2>Company Name:</h2><p>{props.companyname}</p></div>
            <div className='w-48'><h2>Company Website</h2><p>{props.website}</p></div>
            <div className='w-34'><h2>Industry:</h2><p>{props.industry}</p></div>
            <div className='w-34'><h2>Company Size:</h2><p>{props.companySize}</p></div>
            <div className='w-34'><h2>Contact Person:</h2><p>{props.Contactperson}</p></div>
            <div className='w-64'><h2>Work Email:</h2><p >{props.email}</p></div>
            <div className='w-34'><h2>Phone:</h2><p>{props.phone}</p></div>
            <div className='w-34'><h2>Job Role:</h2><p>{props.role}</p></div>
            

        </div>
      
    </div>
  )
}

export default CompanyInfoCard
