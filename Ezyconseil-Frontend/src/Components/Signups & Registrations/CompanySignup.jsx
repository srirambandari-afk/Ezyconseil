import { useRef, useState } from 'react'
import Consulting2 from '../../assets/Consulting2.jpg'
import { FormContextConsume } from '../../Context/FormContext'
import { useNavigate } from 'react-router-dom'
import fetch_url from '../../api'


const CompanySignup = () => {
     const {CompanyInfo} = FormContextConsume()
     const insert1 = useRef(false)
     const [error1,setError1] = useState(null)
     const navigate = useNavigate()
    const handleClick = async(e)=>{
       e.preventDefault()
        const password = e.target.elements.password.value
        const name = CompanyInfo.contactname 
        const email = CompanyInfo.workemail
        const id = CompanyInfo.id
        const number = CompanyInfo.phone

        const CompanyUser = { id, name, email, password,number}

              
              try{
                  const response = await fetch(fetch_url+'/Company/signup',{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(CompanyUser)}) 

                 if(response.ok){
                    const data = await response.json()
                    insert1.current = true
                }else{
                const json = await response.json()
               setError1(json.message)
              }                                   
               
            }catch(error){
                console.log("Error:",error)
            }
            if(insert1.current == true){

                try{
        const response = await fetch(fetch_url+"/Company",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(CompanyInfo)
       })

       const data1 = await response.json()
       console.log("Company Info:"+data1)

                }catch(error){
                    console.log("Error for Company creation",error)
                }
         
            }
        if(insert1.current == true){
             navigate('/success')
        }

}

  return (
    <div className='border min-h-screen flex'>
      <div className='border flex items-center  w-1/2 bg-cover bg-center'style={{backgroundImage : `url(${Consulting2})`}}><p className=' bg-black/60 text-white '>

<span className='font-semibold'>Welcome to Ezconseil!</span><br/> This is a platform where you can connect with skilled consultants, find the right expertise for your business, and create opportunities for growth.</p> </div>
      <div className=' w-1/2 flex flex-col justify-center items-center '><div className=' w-full flex flex-col items-center bg-purple-200 shadow-lg text-gray-700'>
        
        <p className='text-lg w-80 mb-4 font-semibold'>Please signup below by choosing an appropriate password</p><form className=' w-full grid grid-cols-[100px_250px] gap-x-4 gap-y-5 justify-center'onSubmit={handleClick}>
        <label htmlFor="">Email:</label><p>{CompanyInfo.workemail}</p><label htmlFor="password">Password:</label><input type="password" id="password" name="password" className='border w-48'/><div className=' col-span-2 flex justify-center'><button className='bg-gray-400 p-3 text-gray-800 border active:scale-95' type="submit" >Register</button></div></form>
        { error1 && <div className='text-red-700'>{error1}</div>}
        </div> </div>
        
    </div>
  )
}

export default CompanySignup
