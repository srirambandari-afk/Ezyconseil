<<<<<<< HEAD
import React, { useState } from 'react'
import { FormContextConsume } from '../../Context/FormContext'
import {useNavigate} from 'react-router-dom'
import { CheckCircle } from 'lucide-react';
=======
import React from 'react'
import { FormContextConsume } from '../../Context/FormContext'
import {useNavigate} from 'react-router-dom'
>>>>>>> 6f860581c5d5226f43cb82da34cb8e133493e9bf


const ConsultantRegistration = () => {
      
     const navigate = useNavigate()
<<<<<<< HEAD

     const [inputType, setInputType] = useState('text')

     const [fileSelected, setFileSelected] = useState(false)
=======
>>>>>>> 6f860581c5d5226f43cb82da34cb8e133493e9bf
      
     
     const{setConsultInfo} = FormContextConsume()

<<<<<<< HEAD
     const convertToBase64 = (file)=>{

      return new Promise ((resolve)=>{

              const reader = new FileReader()

      reader.readAsDataURL(file)

      reader.onload = ()=>{

        

        const base64 = reader.result.split(",")[1];

        resolve(base64)
        
      }


      })


     }

     

    const handleSubmit = async(e)=>{
=======
     

    const handleSubmit = (e)=>{
>>>>>>> 6f860581c5d5226f43cb82da34cb8e133493e9bf
        e.preventDefault()
       const data =  Object.fromEntries(new FormData(e.target))

       
<<<<<<< HEAD
       if (data.resume instanceof File){

        alert ("file has been uploaded!!!")

        


       }
=======

>>>>>>> 6f860581c5d5226f43cb82da34cb8e133493e9bf
       
       

       const Info1 = { id:Date.now(),...data}

       setConsultInfo(Info1)

       console.log("Consultant-info:",Info1)

      
       navigate('/consultantsignup')
      

      
    }

<<<<<<< HEAD
    const handleUpload = (e)=>{

      setInputType('file')

      setFileSelected(e.target.files.length > 0)

    }

=======
>>>>>>> 6f860581c5d5226f43cb82da34cb8e133493e9bf

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
<<<<<<< HEAD
        <label htmlfor='resume' onClick = {()=>setInputType('text')} >Proof of expertise/Resume:</label>
        <div className='flex flex-col gap-3 ' >
           <textarea name="resume" id="resume" name='resume' className='border h-32' disabled = {inputType == 'file'}  />
           <div className='text-center text-gray-500 font-semibold'>OR</div>

           <div className='flex flex-col justify-center items-center'>
             <label  className='bg-gray-200 p-2 rounded-lg text-center border w-25 active:scale-95 cursor-pointer' onClick = { ()=>setInputType('file')}>
          Choose File
          <input type='file' accept='.pdf,application/pdf ,.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document' name='resume' className='hidden'
          disabled = {inputType == 'text'} onChange = {handleUpload}/>
         

        </label>

         {
            fileSelected  && (
    <div className="text-green-600 flex items-center gap-2">
        <CheckCircle size={18} />
        Resume ready for submission
    </div>
)
          }

           </div>
       
          <div className='flex justify-center'><button className='border px-3 py-1 mt-5   bg-gray-200' type="submit">Submit</button></div>

        </div>
       
        
        
=======
        <label htmlfor='resume'>Proof of expertise/Resume:</label>
        <textarea name="resume" id="resume" name='resume' className='border h-32'/>
        <div className='col-span-2 flex justify-center'><button className='border px-3 bg-gray-200' type="submit">Submit</button></div>
>>>>>>> 6f860581c5d5226f43cb82da34cb8e133493e9bf
      </form>
        </div>
      
    </div>
  )
}

export default ConsultantRegistration
