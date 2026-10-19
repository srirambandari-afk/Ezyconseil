import React from 'react'
import { AuthenticationContextConsume } from "../../Context/AuthenticationContext"
import { Link } from 'react-router-dom'


const AdminMenu = () => {
   const {setSignIn} = AuthenticationContextConsume()
   const handleLogout = ()=>{

    localStorage.removeItem("UserDetails")
    localStorage.removeItem("Login")
    setSignIn(false)
    console.log("Logout  button pressed ")
   }

  

  return (
    <div className='absolute right-0 top-12  bg-white text-gray-500 rounded-lg border border-gray-200 py-2 w-40'>
      <Link to = '/Profile'>
      <button className=" w-full text-left px-4 py-2 hover:bg-gray-100">
        Profile
    </button>
    </Link>
   <Link to = '/admin'>
      <button className=" w-full text-left px-4 py-2 hover:bg-gray-100">
        Consultant Dashboard
    </button>
   </Link>
   <Link to ='/bills'>
    <button className=" w-full text-left px-4 py-2 hover:bg-gray-100">
        Bill Statements
    </button>
   </Link>
     <Link to = '/CreateUser'>
    <button className="w-full text-left  px-4 py-2 hover:bg-gray-100" >
         Create User
    </button>
    </Link>
    <button className="w-full text-left  px-4 py-2 text-red-600 hover:bg-red-50" onClick={handleLogout}>
         Logout
    </button>
      </div>
  )
}

export default AdminMenu
