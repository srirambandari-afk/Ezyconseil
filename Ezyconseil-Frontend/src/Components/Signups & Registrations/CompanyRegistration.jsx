import React, { useEffect } from 'react'

import {useNavigate} from 'react-router-dom'
import { FormContextConsume } from '../../Context/FormContext'
import { useGetCompanies } from '../../hooks/useGetCompanies'


const Company = () => {
      
     const navigate = useNavigate()
      
     const {setCompanyInfo} = FormContextConsume()

     

    const handleSubmit = async(e)=>{
        e.preventDefault()
    const data =  Object.fromEntries(new FormData(e.target))
    const Info = {id:Date.now(),...data}
    setCompanyInfo(Info)
    console.log("CompanyInfo:",Info)
    navigate('/companysignup')
      

      
    }



  return (

    

    <div>
        <h2 className='mb-3 ml-3 font-bold'>New Company</h2>
        <div className='container'>
       <form onSubmit={handleSubmit} className = 'grid grid-cols-[200px_400px] gap-y-15 gap-x-5 justify-center' >
        <label htmlFor="companyname">Company name:</label>
        <input type="text" id='companyname' name='companyname' className='border'/>
        <label htmlFor="companywebsite">Company Website:</label>
        <input type="text" id='companywebsite' name='companywebsite' className='border'/>
        <label htmlFor="industry">Industry:</label>
        <input type="text" id='industry' name='industry' className='border'/>
        <label htmlFor="companysize">Company size</label>
        <input type="text" id='companysize' name='companysize' className='border'/>
        <label htmlFor="contactname">Contact Person:</label>
        <input type="text" id='contactname' name='contactname' className='border'/>
        <label htmlFor="email">Work Email:</label>
        <input type="text" id = 'email'name='workemail' type='email' className='border' />
        <label htmlFor="phone">Phone:</label>
        <input type="text" id='phone'name='phone' type='tel' className='border' />
        <label htmlFor="role">Job Role:</label>
        <input type="text" id='role' name='role' className='border'/>
        
        <div className='col-span-2 flex justify-center'><button className='border px-3 bg-gray-200' type="submit">Submit</button></div>
      </form>
        </div>
      
    </div>
  )
}

export default Company
