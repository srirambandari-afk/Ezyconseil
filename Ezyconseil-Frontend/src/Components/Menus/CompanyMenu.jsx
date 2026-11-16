import { Link } from "react-router-dom"
import { AuthenticationContextConsume } from "../../Context/AuthenticationContext"



const CompanyMenu = () => {
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
   
  <Link to = '/Company'> <button className=" w-full text-left px-4 py-2 hover:bg-gray-100">
        Company Dashboard
    </button></Link> 
    
    <button className="w-full text-left  px-4 py-2 text-red-600 hover:bg-red-50" onClick={handleLogout}>
         Logout
    </button>
      </div>
  )
}

export default CompanyMenu