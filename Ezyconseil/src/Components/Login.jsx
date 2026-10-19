import React from 'react'
import { useState } from 'react'
import { AuthenticationContextConsume } from '../Context/AuthenticationContext'
import fetch_url from '../api'


const Login = () => {

    const {signIn,setSignIn} = AuthenticationContextConsume()
    const [Error,setError] = useState('')
    const [show,setShow] = useState(false)

    const  handleSubmit = async(e)=>{
      e.preventDefault()
        const  email = e.target.elements.username.value
        const password = e.target.elements.password.value

        const data = {email,password }
             try{
        const response = await fetch(fetch_url+"/login",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(data)
        })
           if (response.ok){

            const Info = await response.json()
             
            const UserDetails = Info.details

            localStorage.setItem("UserDetails",JSON.stringify(UserDetails))
            localStorage.setItem("Login",JSON.stringify(true))
            setSignIn(JSON.parse(localStorage.getItem("Login")))

            



           
       
           }else{
               const Info = await response.json() 

               const message = Info.message 

               setShow(true)
               setError(message)

           }
        



      }catch(error){

        console.log("Error:",error)
      }
      

    }


  return (
    <form onSubmit = {handleSubmit} method="POST" className = 'flex justify-center items-center min-h-screen'>
       <div className='flex flex-col items-center border bg-slate-300 w-100 h-60 justify-center '>
        
      <h1 className='font-bold'>Login User</h1>
      <div className='mt-4'>
        <div className='flex flex-col'>
         <label htmlFor="username">Username/Email</label>
        <input type="text" id='username' name='username' className='border w-64 bg-white' />
        </div>
       <div className='flex flex-col'>
         <label htmlFor="password">Password</label>
        <input type="password" id='password' name='password' className='border w-64 bg-white mb-3' />
        </div>
        <div className=' flex justify-center'>
       <button type= "submit"   className='border bg-gray-400 px-2 mb-2 enabled:active:scale-95 disabled:cursor-not-allowed '>Submit</button>
        </div>
       
       { show && (<div className=' text-center text-red-600'>{Error}</div>)}
        
        
      </div>
    </div>  
    </form>
      
    
  )
}

export default Login
