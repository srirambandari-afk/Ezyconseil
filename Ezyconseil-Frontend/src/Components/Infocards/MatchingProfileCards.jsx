import React from 'react'
import { useNavigate } from 'react-router-dom';


const MatchingProfiles = (props) => {

    const navigate = useNavigate()
    return (
        <div className='flex justify-evenly  bg-white shadow-lg text-gray-500 mx-3 mb-4 py-1'>
        <div className='w-44'><h2 className='font-bold text-blue-700 text-center'>Consultant ID</h2><p className='font-semibold text-center ' >{props.ID}</p></div>
        <div className='w-44'><h2 className='font-bold text-blue-700 text-center'>Consultant Name</h2><p className='font-semibold text-center ' >{props.Name}</p></div>
        <div className='w-44'><h2 className='font-bold text-blue-700 text-center'>Consultant Expertise</h2><p className='font-semibold text-center ' >{props.Expertise}</p></div>
        <div className='w-44'><h2 className='font-bold text-blue-700  text-center'>Match</h2><p className='text-green-700 font-semibold text-center ' >{props.Match ?  "Yes":<span className="text-red-600">No</span>}</p></div>
        <div className='w-44'><h2 className='font-bold text-blue-700 text-center'>Strength</h2><p className='text-green-700 font-semibold text-center' >{((props.Strength*100))>50?(props.Strength*100).toFixed(2) : <span className='text-red-600'>{props.Strength}</span>} </p></div>
        <div ><button className='bg-gray-300 rounded-md p-2 text-gray-700 mt-2 active:scale-95' onClick={()=>navigate(`/ConsultantDetails/${props.ID}`)}>View Profile</button></div>
        <div ><button className='bg-gray-300 rounded-md p-2 text-gray-700 mt-2 active:scale-95'>Assign</button></div>
       
        
        
        </div>
    );
};

export default MatchingProfiles;