const XLSX = require("xlsx")
const validator = require('validator')
const bcrypt = require('bcrypt')


const RegisterUser = async(req,res)=>{
         
    if(req.body == undefined){
            res.status(400).json({message:"Please enter something into the request body"})
        }
    

        const { id, name, email , password , role , number } = req.body

        
        

     
    

    if(!id || !name || !email || !password || !role || !number){

    res.status(400).json({message:"Please enter all the fields"})
   }

    const workbook = XLSX.readFile("Database/EzyconseilDatabase.xlsx")
     if(!workbook.Sheets["Users"]) {
        XLSX.utils.book_append_sheet(workbook,XLSX.utils.json_to_sheet([]),"Users")
     }
       
     const sheet = workbook.Sheets["Users"]
     let users = XLSX.utils.sheet_to_json(sheet)
     

     

     

    

    const exists = users.find(user=>user.email == email)

    if(exists){
        return res.status(409).json({message:"Email already exists!!!"})
    }

    if( !email || !password){
       return res.status(400).json({message:"Please enter all the details!!!"})
    }
    if(!validator.isEmail(email)){
          return  res.status(400).json({message:"This is not a valid email!!!"})
        }
        if(!validator.isStrongPassword(password)){
           return res.status(400).json({message:"Please enter a strong password!!!"})
        }
           const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password,salt)

    const details = {id,name,email,password:hash,role}

    users=[...users,details]

    workbook.Sheets["Users"]= XLSX.utils.json_to_sheet(users)

    XLSX.writeFile(workbook,"Database/EzyconseilDatabase.xlsx")

   

   

    res.status(201).json({message:"You have signedup",details})

  


    }

    const preventGet = (req,res)=>{

   res.status(400).json({message:"Get request is not allowed here!!!"})


}

module.exports = {RegisterUser,preventGet}