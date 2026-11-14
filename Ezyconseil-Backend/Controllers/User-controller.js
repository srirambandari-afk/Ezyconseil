const XLSX = require("xlsx")

const getAllUsers = (req,res)=>{

    const workbook = XLSX.readFile("Database/EzyconseilDatabase.xlsx")
    
       
    
        const sheet = workbook.Sheets["Users"]
    
        const data = XLSX.utils.sheet_to_json(sheet)
        if(!data){
            res.status(404).json({message:"No Users Present !!!"})
        }

    
        res.status(200).json({message:"The Users are present !!!",data})


}

const getSingleUser = (req,res)=>{

    const{id} = req.params

    const workbook = XLSX.readFile("Database/EzyconseilDatabase.xlsx")
    
       
    
        const sheet = workbook.Sheets["Users"]
    
        const data = XLSX.utils.sheet_to_json(sheet)
        if(!data){
            res.status(404).json({message:"No Users Present !!!"})
        }

        const user = data.find((element)=>element.id == id)

        if(!user){
            res.status(404).json({message:"We could not find the user"})
        }

        res.status(200).json({message:"Found the user!!1",user})



}








module.exports = {getAllUsers,getSingleUser}