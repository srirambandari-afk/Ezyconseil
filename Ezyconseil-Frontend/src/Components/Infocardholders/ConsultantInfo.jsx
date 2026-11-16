import React from 'react'
import ConsultantInfoCard from '../Infocards/ConsultantInfoCard'
import { FormContextConsume } from '../../Context/FormContext'
import { useGetConsultants } from '../../hooks/useGetConsultants'
import { useEffect } from 'react'



const ConsultantInfo = () => {
  const {consultantState,consultantDispatch} = FormContextConsume()

  const getConsultants = async()=>{
       
    const ConsultantInfo = await useGetConsultants()

    

    consultantDispatch({type:'getAllConsultants',payload:ConsultantInfo})

  }

  useEffect(()=>{
    getConsultants()
  },[])

  const Infos =JSON.parse(localStorage.getItem('Consultant-Info')) || []

  console.log(consultantState)
  console.log(consultantState.length)

  console.log(consultantState.length >0)

  return (
    <div>
     <h1 className=' flex justify-center font-bold text-blue-700 bg-blue-200 p-3 mb-3'>Consultant Information</h1> 

     { consultantState.length>0 && consultantState.map((consult)=><ConsultantInfoCard key={consult.id}
     name={consult.name} email= {consult.email} number={consult.phone}
     experience={consult.experience} expertise={consult.expertise} resume={consult.resume}/>) }

  
     
    </div>
  ) 
}

export default ConsultantInfo
