
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import html2pdf from "html2pdf.js";
import fetch_url from '../api';


const Payment = () => {
    
    const [details,setDetails] = useState(null)

    const paymentRef = useRef();

   
   const {id} = useParams()

     const getBillStatement = async()=>{

      const  response = await fetch(`${fetch_url}/Bill/${id}`)

      const data = await response.json()

      const bill = data.Bill

      setDetails(bill)



     }
    
    useEffect(()=>{
        
        getBillStatement()

    },[])

    
    

    console.log("Details",details)

    const {CompanyName, billNumber, projectTitle,completionDate,budget,ApprovedApplicationID,applicantName,statementDate,projectID} = details || []

    const date = new Date(completionDate).toDateString()

    const date1 = new Date(statementDate).toDateString()

    

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-md" ref={paymentRef} >

        {/* Header */}
        <div className="mb-6 flex items-start justify-between border-b pb-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Payment Statement
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Consulting Project Payment
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">Statement ID</p>
            <p className="font-semibold text-gray-800">{id}</p>
          </div>
        </div>

        {/* Company and Consultant Details */}
        <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <h2 className="mb-2 text-sm font-semibold uppercase text-gray-500">
              Issued By
            </h2>
            <p className="font-semibold text-gray-800">{CompanyName}</p>
            {/* <p className="text-sm text-gray-600">Company Address</p>
            <p className="text-sm text-gray-600">company@email.com</p> */}
          </div>

          <div>
            <h2 className="mb-2 text-sm font-semibold uppercase text-gray-500">
              Payable To
            </h2>
            <p className="font-semibold text-gray-800">{applicantName}</p>
            {/* <p className="text-sm text-gray-600">Consultant Address</p>
            <p className="text-sm text-gray-600">consultant@email.com</p> */}
          </div>
        </div>

        {/* Project Details */}
        <div className="mb-6 rounded-lg bg-gray-50 p-4">
          <h2 className="mb-4 font-semibold text-gray-800">
            Project Details
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">Project ID</p>
              <p className="font-medium text-gray-800">{projectID}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Application ID</p>
              <p className="font-medium text-gray-800">{ApprovedApplicationID}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Project Title</p>
              <p className="font-medium text-gray-800">
                {projectTitle}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Completion Date</p>
              <p className="font-medium text-gray-800">{date}</p>
            </div>
          </div>
        </div>

        {/* Payment Breakdown */}
        <div className="mb-6">
          <h2 className="mb-4 font-semibold text-gray-800">
            Payment Breakdown
          </h2>

          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                  Description
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">
                  Amount
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="px-4 py-4 text-gray-700">
                  Project Completion Fee
                </td>
                <td className="px-4 py-4 text-right text-gray-800">
                  ₹{Number(budget)?.toLocaleString("en-IN")?? null}
                </td>
              </tr>

              <tr className="border-b">
                <td className="px-4 py-4 text-gray-700">
                  Deductions
                </td>
                <td className="px-4 py-4 text-right text-gray-800">
                  ₹0.00
                </td>
              </tr>

              <tr>
                <td className="px-4 py-4 font-semibold text-gray-800">
                  Net Amount Payable
                </td>
                <td className="px-4 py-4 text-right text-lg font-bold text-indigo-700">
                  ₹{Number(budget)?.toLocaleString("en-IN")?? null}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Payment Information */}
        <div className="mb-6 flex items-center justify-between rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <div>
            <p className="text-sm text-gray-500">Payment Status</p>
            <p className="font-semibold text-yellow-700">Pending</p>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">Statement Date</p>
            <p className="font-medium text-gray-800">{date1}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t pt-4">
          <h2 className="mb-2 font-semibold text-gray-800">
            Payment Terms
          </h2>

          <p className="text-sm text-gray-600">
            Payment will be processed according to the agreed terms
            between the company and the consultant.
          </p>

          <p className="mt-6 text-center text-xs text-gray-400">
            This statement records the amount payable for the completed project.
          </p>
        </div>

      </div>
      <div className=' flex justify-center mt-2'>  <button
  onClick={() => {
    html2pdf()
      .set({
        margin: 10,
        filename: "Payment-Statement.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
      })
      .from(paymentRef.current)
      .save();
  }}
  className="mb-4 rounded-lg bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700 active:scale-95"
>
  Generate PDF
</button></div>
    

    </div>
  )
}

export default Payment
