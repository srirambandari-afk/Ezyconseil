import React from 'react'
import { FormContextConsume } from '../../Context/FormContext'
import {useNavigate} from 'react-router-dom'


const ConsultantRegistration = () => {
      
     const navigate = useNavigate()
      
     
     const{setConsultInfo} = FormContextConsume()

     

    const handleSubmit = (e)=>{
        e.preventDefault()
       const data =  Object.fromEntries(new FormData(e.target))

       

       
       

       const Info1 = { id:Date.now(),...data}

       setConsultInfo(Info1)

       console.log("Consultant-info:",Info1)

      
       navigate('/consultantsignup')
      

      
    }


  return (

    

    <div>
        <h2 className='mb-3 ml-3 font-bold'>New Consultant</h2>
        <div className='container'>
       <form onSubmit={handleSubmit} className = 'grid grid-cols-[200px_400px] gap-y-15 gap-x-5 justify-center' >
        <label htmlFor="name">Name:</label>
        <input type="text" id='name' name='name' className='border'/>
        <label htmlFor="email">Email:</label>
        <input type="text" id = 'email'name='email' type='email' className='border' />
        <label htmlFor="phone">Phone:</label>
        <input type="text" id='phone'name='phone' type='tel' className='border' />
        <label htmlFor="exerience">Years of experience:</label>
        <input type="text" id='experience' name='experience' type='number' className='border' />
        <label htmlFor="expertise">Expertise:</label>
        <input type="text" id = 'expertise' name='expertise' className='border' />
        <label htmlfor='resume'>Proof of expertise/Resume:</label>
        <textarea name="resume" id="resume" name='resume' className='border h-32'/>
        <div className='col-span-2 flex justify-center'><button className='border px-3 bg-gray-200' type="submit">Submit</button></div>
      </form>
        </div>
      
    </div>
  )
}

export default ConsultantRegistration
