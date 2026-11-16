import fetch_url from "../api"


export const useGetConsultants = async()=>{

        try{

          const response = await fetch(fetch_url+'/Consultant')

      const json = await response.json()

      

      return json.data

        }catch(error){
          console.log("Error:",error.message)
        }
    }