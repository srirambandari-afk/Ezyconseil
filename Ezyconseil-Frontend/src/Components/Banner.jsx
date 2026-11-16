import React, { useEffect, useState } from 'react'
import {Link,useLocation} from 'react-router-dom'
import ConsultantMenu from './Menus/ConsultantMenu'
import CompanyMenu from './Menus/CompanyMenu'
import {AuthenticationContextConsume} from '../Context/AuthenticationContext'
import AdminMenu from './Menus/AdminMenu'


const Banner = () => {

   const location = useLocation()

    const User = JSON.parse(localStorage.getItem("UserDetails"))
    
    const {role,setRole} = AuthenticationContextConsume()
     const [ showMenu, setShowMenu] = useState(false)

      useEffect(()=>{
     
         setShowMenu(false)
       },[location.pathname])

       console.log("Show Menu from  Banner:",showMenu)

  return (
    <div className=' bg-blue-700 p-3 text-white font-serif flex items-center justify-between'>
    
     <Link to='/'><h2 >Ezyconseil</h2></Link>
      <nav className='flex'>
        {(location.pathname == '/') && <div className='flex'><Link to='/register'><div className='cursor-pointer hover:bg-blue-500 '>Register</div></Link><Link to='/login'><div className='ml-2 cursor-pointer hover:bg-blue-500 '>Login</div></Link></div>
      }
      { (User !== null) && <div className='font-sans font-semibold cursor-pointer' onClick = {()=>{setShowMenu(!showMenu)}}>Welcome {User.name} </div>}
      {(role == 'Consultant')  && showMenu && <ConsultantMenu/> }
      {(role == 'Company')  && showMenu && <CompanyMenu/> }
      {(role == 'Admin') && showMenu && <AdminMenu/>}
     
      </nav>
      
    </div>
  )
}

export default Banner
