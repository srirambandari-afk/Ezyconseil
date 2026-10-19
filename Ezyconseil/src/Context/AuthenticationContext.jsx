import { createContext, useContext, useState } from "react";


const AuthenticationContext = createContext()

const AuthenticationContextConsume = ()=>{
   return useContext(AuthenticationContext)
}

const AuthenticationProvider = (props)=>{
    
    const User = JSON.parse(localStorage.getItem("UserDetails"))
    
    const [role,setRole] = useState(User?.role)

   const [signIn , setSignIn] =useState(JSON.parse(localStorage.getItem("Login")))

    return(
        <AuthenticationContext.Provider value = {{signIn,setSignIn,role,setRole}}>
         {props.children}
        </AuthenticationContext.Provider>
    )

}

export {AuthenticationContextConsume,AuthenticationProvider}