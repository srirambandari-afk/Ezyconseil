import fetch_url from "../api"



export const useGetCompanies = async()=>{

        try{

          const response = await fetch(fetch_url+'/Company')

      const json = await response.json()

      

      return json.data

        }catch(error){
          console.log("Error:",error.message)
        }

      

      


     }