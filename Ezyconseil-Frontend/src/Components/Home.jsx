import React from 'react'
import Consulting from '../assets/Consulting.jpg'

const Home = () => {
  return (
    <div  className = 'h-[calc(100vh-48px)] bg-cover bg-center'
         style={{backgroundImage : `url(${Consulting})`}}>
    
    </div>
  )
}

export default Home
