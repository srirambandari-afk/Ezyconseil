
import React from "react";
import { useNavigate } from "react-router-dom";
import fetch_url from "../../api";


const CreateUser = () => {

    const Navigate = useNavigate()
     
    const handleClick = async(e)=>{
         e.preventDefault()
        
         const data =  Object.fromEntries(new FormData(e.target))


         const response = await fetch(fetch_url+'/SignUp',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
         })

         if(response.ok){
           const json = await response.json()

         alert(json.message)

        Navigate('/')

         }else{

        const json = await response.json()
        alert(json.message)
            
         }

        
    }



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-200 px-6 py-4 text-center">
        <h1 className="text-lg font-bold text-blue-700">
          Form for User Creation
        </h1>
      </div>

      {/* Form Container */}
      <div className="mx-auto mt-10 max-w-3xl px-4">
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">

          {/* Form Heading */}
          <div className="border-b border-gray-200 px-8 py-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Create User
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Enter the details below to create a new user.
            </p>
          </div>

          {/* Form Fields */}
          <form className="space-y-5 px-8 py-6" onSubmit ={handleClick}>

            <div>
              <label htmlFor="id" className="mb-2 block font-medium text-gray-700">
                User ID
              </label>
              <input
                type="text"
                id="id"
                name="id"
                placeholder="Enter user ID"
                required
                className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                value = {Date.now()}
              />
            </div>

            <div>
              <label htmlFor="name" className="mb-2 block font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter name"
                required
                className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email address"
                required
                className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label htmlFor="role" className="mb-2 block font-medium text-gray-700">
                Role
              </label>
              <select
                id="role"
                name="role"
                defaultValue=""
                required
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="" disabled>
                  Select a role
                </option>
                <option value="Company">Company</option>
                <option value="Consultant">Consultant</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                required
                className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 border-t border-gray-200 pt-5">
              <button
                type="button"
                className="rounded-md border border-gray-300 px-5 py-2.5 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-md bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
                
              >
                Create User
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
