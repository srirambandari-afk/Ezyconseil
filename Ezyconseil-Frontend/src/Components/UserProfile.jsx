
import { MicSignal } from "lucide-react";
import React, { useEffect, useState } from "react";
import fetch_url from "../api";


const UserProfile = () => {

 const[userDetails,setUserDetails] = useState(null)

  const User = JSON.parse(localStorage.getItem("UserDetails"))

  const id = User.id

    const getUserInfo = async()=>{

     const response =  await fetch(`${fetch_url}/Users/${id}`)

     const msg = await response.json()

    

     setUserDetails(msg.user)


    }

    console.log("User details",userDetails)

    useEffect(()=>{

        getUserInfo()
    },[])

    const handleSubmit = async(e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());

    if (user.newPassword !== user.confirmPassword) {
        alert("New password and confirm password do not match");
        return;
    }else {
        const password1 = user.confirmPassword
        const password = user.currentPassword
        const email = userDetails?.email

        const data = { email , password , password1}

        const response = await fetch(fetch_url+'/login/UpdatePassword',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        })

        if(response.ok){

            const json = await response.json()

        alert(json.message)

        e.target.reset()

        }else{
        const json = await response.json()

        alert(json.message)

        }
        
    }

    
    
}

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-blue-200 px-6 py-4 text-center">
        <h1 className="text-lg font-bold text-blue-700">
           User Profile View
        </h1>
      </div>

      {/* Profile Container */}
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">

          {/* Profile Heading */}
          <div className="border-b border-gray-200 px-8 py-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              User Profile
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              View your information and update your password.
            </p>
          </div>

          {/* Read-only User Information */}
          <div className="p-8">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 rounded-lg bg-blue-50 p-6 sm:grid-cols-2 lg:grid-cols-3">

              <div>
                <p className="text-sm text-gray-500">User ID</p>
                <p className="mt-1 font-medium text-gray-800">
                  {userDetails?.id}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="mt-1 font-medium text-gray-800">
                  {userDetails?.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="mt-1 break-words font-medium text-gray-800">
                  {userDetails?.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="mt-1 font-medium text-gray-800">
                  {userDetails?.number}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="mt-1 font-medium text-gray-800">
                  {userDetails?.role}
                </p>
              </div>

            </div>

            {/* Change Password Section */}
            <div className="mt-8 rounded-lg border border-gray-200 p-6">

              <h3 className="text-xl font-semibold text-gray-800">
                Change Password
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Enter your current password and choose a new password.
              </p>

              <form className="mt-6 space-y-5"onSubmit = {handleSubmit}>

                <div>
                  <label
                    htmlFor="currentPassword"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    placeholder="Enter current password"
                    required
                    autoComplete="current-password"
                    className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="newPassword"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    placeholder="Enter new password"
                    required
                    autoComplete="new-password"
                    className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm new password"
                    required
                    autoComplete="new-password"
                    className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Update Password Button */}
                <div className="flex justify-end border-t border-gray-200 pt-5">
                  <button
                    type="submit"
                    className="rounded-md bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
                  >
                    Update Password
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
