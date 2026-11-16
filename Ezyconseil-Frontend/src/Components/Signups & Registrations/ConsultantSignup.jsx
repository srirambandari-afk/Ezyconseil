import React, { useRef, useState } from 'react'
import Consulting2 from '../../assets/Consulting2.jpg'
import { FormContextConsume } from '../../Context/FormContext'
import { useNavigate } from 'react-router-dom'
import fetch_url from '../../api'


const ConsultantSignup = () => {
    const {ConsultInfo} = FormContextConsume()
    const navigate = useNavigate()
    const [error1,setError1] = useState(null)
    const insert1 = useRef(0)
    const handleClick = async(e)=>{
       e.preventDefault()

       
       const password = e.target.elements.password.value
       const name = ConsultInfo.name
       const email = ConsultInfo.email
       const id = ConsultInfo.id
       const number = ConsultInfo.phone
       const ConsultUser = { id , name,email, password,number}
        try{

        const response1 = await fetch(fetch_url+'/Consultant/signup',{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(ConsultUser)
            })

            if(response1.ok){
                
                insert1.current = insert1.current + 1
                console.log("response ok reached!!!")
                console.log(insert1.current)
            }else{
                const json = await response1.json()
               setError1(json.message)
            }
            
            


        }catch(error){
            console.log("Error:",error)
        }
          
        if(insert1.current>0){

            

            try{

        const response = await fetch(fetch_url+'/Consultant',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(ConsultInfo)
      })

      const Info = await response.json()

      console.log("Consultant Info response:"+Info)

       }catch(error){

        console.log("Error:"+error)
       }

        }

        

       console.log("Register clicked!!!")

       if(insert1.current>0){
        navigate('/success')
       }
    }
  return (
    <div className='border min-h-screen flex'>
      <div className='border flex items-center  w-1/2 bg-cover bg-center'style={{backgroundImage : `url(${Consulting2})`}}><p className=' bg-black/60 text-white '>

Welcome to Ezconseil!<br/> This is a platform where you can connect with companies, grow your consulting business, and create opportunities to earn.</p> </div>
      <div className=' w-1/2 flex flex-col justify-center items-center '><div className=' w-full flex flex-col items-center bg-purple-200 shadow-lg text-gray-700'>
        
        <p className='text-lg w-80 mb-4 font-semibold'>Please signup below by choosing an appropriate password</p><form className=' w-full grid grid-cols-[100px_250px] gap-x-4 gap-y-5 justify-center'onSubmit={handleClick}>
        <label htmlFor="">Email:</label><p>{ConsultInfo.email}</p><label htmlFor="password">Password:</label><input type="password" id="password" name="password" className='border w-48'/><div className=' col-span-2 flex justify-center'><button className='bg-gray-400 p-3 text-gray-800 border active:scale-95' type="submit" >Register</button></div></form>
        { error1 && <div className='text-red-700'>{error1}</div>}
        </div> </div>
    </div>
  )
}

export default ConsultantSignup
