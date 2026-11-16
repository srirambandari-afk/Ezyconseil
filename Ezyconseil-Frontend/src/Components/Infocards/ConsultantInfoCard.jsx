import React from 'react'

const ConsultantInfoCard = (props) => {
  return (
    <div>

        <div className='flex justify-evenly bg-gray-500 text-white mx-3 mb-3'>
        <div><h2 className='font-medium'>Name</h2><p>{props.name}</p></div>
        <div><h2 className='font-medium'>Email</h2><p>{props.email} </p> </div>
        <div><h2 className='font-medium'>Phone</h2><p>{props.number}</p></div>
        <div><h2 className='font-medium'>Years of Experience</h2> <p>{props.experience}</p> </div>
        <div><h2 className='font-medium'>Expertise</h2> <p>{props.expertise}</p> </div>
        <div><h2 className='font-medium'>Resume</h2> <p>{props.resume}</p> </div>
        </div>
        
      
      
      
      
      
      

    </div>
  )
}

export default ConsultantInfoCard
