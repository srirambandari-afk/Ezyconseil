import React, { useEffect } from 'react'
import CompanyInfoCard from '../Infocards/CompanyInfoCard'
import { FormContextConsume } from '../../Context/FormContext'
import { useGetCompanies } from '../../hooks/useGetCompanies'





const CompanyInfo = () => {

  

    const {state,dispatch} = FormContextConsume()

    const getCompanies = async()=>{

      const CompanyInfo1 = await useGetCompanies()
       
      dispatch({type:'getAllCompanies',payload:CompanyInfo1})
      
    }

    useEffect(()=>{

       getCompanies()

        

    },[])

    
        
   

     
  return (
    <div>
      <h1 className=' flex justify-center font-bold text-blue-700 bg-blue-200 p-3 mb-3'>Company Information</h1> 
         
          {  state.length > 0 && state.map((element)=><CompanyInfoCard
          companyname= {element.companyname}
          website={element.companywebsite}
          industry = {element.industry}
          companySize={element.companysize}
          Contactperson={element.contactname}
          email = {element.workemail}
          phone={element.phone}
          role = {element.role}
          
          key = {element.id}/>) || <CompanyInfoCard/>}
     
   
    </div>
  )
}

export default CompanyInfo
