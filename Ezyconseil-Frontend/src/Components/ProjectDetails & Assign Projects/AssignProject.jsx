import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetch_url from "../../api";



const AssignProject = () => {

  const [message, setMessage] = useState("");

   const navigate = useNavigate()
   const User = JSON.parse(localStorage.getItem("UserDetails"))
  
     console.log(User)
     const ID  = User?.id || null

     const runfetch = async()=>{
    const response = await fetch(`${fetch_url}/Company/${ID}`)

    const json = await response.json()

    console.log(json)

    const name = json.name

    return name

     }

     useEffect(()=>{
      runfetch()
     },[])
  
    const handleSubmit = async(e)=>{

      e.preventDefault()
      const name = await runfetch()
      const formData = new FormData(e.target)
      const Info = Object.fromEntries(formData)

      const id = crypto.randomUUID();

      const data = {ID,id,CompanyName:name,...Info}
      
      const response =  await fetch(fetch_url+"/Company/Project",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data),
       })

       const json = await response.json()

       console.log("Response",json)

       navigate('/CompanyProject')
      
    }

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const labelClass = "mb-2 block text-sm font-medium text-gray-700";

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-lg sm:p-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Assign Project
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Provide the project details for the consultant to review
            and accept.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Title */}
          <div>
            <label className={labelClass} htmlFor="projectTitle">
              Project Title *
            </label>
            <input
              id="projectTitle"
              name="projectTitle"
              type="text"
             
             
              className={inputClass}
              placeholder="e.g. Financial Reporting Automation"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className={labelClass} htmlFor="description">
              Project Description / Scope of Work *
            </label>
            <textarea
              id="description"
              name="description"
         
              
              className={inputClass}
              rows="5"
              placeholder="Describe the work the consultant needs to complete..."
              required
            />
          </div>

          {/* Required Skills */}
          <div>
            <label className={labelClass} htmlFor="requiredSkills">
              Required Skills *
            </label>
            <select
              id="requiredSkills"
              name="requiredSkills"
              // multiple
             
              
              className={inputClass}
              required
            >
              <option value="Business Analysis">Business Analysis</option>
              <option value="Financial Consulting">
                Financial Consulting
              </option>
              <option value="Project Management">
                Project Management
              </option>
              <option value="Data Analysis">Data Analysis</option>
              <option value="Software Development">
                Software Development
              </option>
              <option value="Marketing">Marketing</option>
              <option value="Strategy Consulting">
                Strategy Consulting
              </option>
              <option value="Other">Other</option>
            </select>
           
          </div>

          {/* Deliverables */}
          <div>
            <label className={labelClass} htmlFor="deliverables">
              Deliverables *
            </label>
            <textarea
              id="deliverables"
              name="deliverables"
             
             
              className={inputClass}
              rows="3"
              placeholder="List the expected outputs or results..."
              required
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="startDate">
                Start Date *
              </label>
              <input
                id="startDate"
                name="startDate"
                type="date"
               
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="completionDate">
                Expected Completion Date *
              </label>
              <input
                id="completionDate"
                name="completionDate"
                type="date"
               
              
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* Budget and Payment Type */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="budget">
                Proposed Budget (₹) *
              </label>
              <input
                id="budget"
                name="budget"
                type="number"
                min="1"
                step="0.01"
             
                className={inputClass}
                placeholder="e.g. 50000"
                required
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="paymentType">
                Payment Type *
              </label>
              <select
                id="paymentType"
                name="paymentType"
              
                className={inputClass}
                required
              >
                <option value="Fixed">Fixed Project Fee</option>
                <option value="Hourly">Hourly Payment</option>
                <option value="Milestone">Milestone-based Payment</option>
              </select>
            </div>
          </div>


          {/* Documents */}
          <div>
            <label className={labelClass} htmlFor="documents">
              Project Documents (Optional)
            </label>
            <input
              id="documents"
              name="documents"
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
          
              className={`${inputClass} file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-medium file:text-blue-700`}
            />
          </div>

          {/* Additional Instructions */}
          <div>
            <label className={labelClass} htmlFor="instructions">
              Additional Instructions (optional)
            </label>
            <textarea
              id="instructions"
              name="instructions"
              
             
              className={inputClass}
              rows="3"
              placeholder="Any additional requirements or expectations..."
            />
          </div>

          

          {/* Submit */}
          <div className="flex flex-col gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">
            <button
              type="reset"
           
               
              className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50"
            >
              Clear Form
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Publish Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AssignProject;