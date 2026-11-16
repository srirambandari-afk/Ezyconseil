const XLSX = require("xlsx")
const validator = require('validator')
const bcrypt = require('bcrypt')

const createConsultants =(req,res)=>{
    const workbook = XLSX.readFile("Database/EzyconseilDatabase.xlsx")

    if(!workbook.Sheets["Consultants"]){
        XLSX.utils.book_append_sheet(workbook,XLSX.utils.json_to_sheet([]),"Consultants")
    }
     

     data = req.body

     const sheet = workbook.Sheets["Consultants"]

     let users = XLSX.utils.sheet_to_json(sheet)

     users = [...users,data]

     workbook.Sheets["Consultants"] = XLSX.utils.json_to_sheet(users)

     XLSX.writeFile(workbook,"Database/EzyconseilDatabase.xlsx")

     res.status(201).json({message:"Consultant has been successfully created"})

}

const getConsultant = (req,res)=>{
    const workbook = XLSX.readFile("Database/EzyconseilDatabase.xlsx")

   

    const sheet = workbook.Sheets["Consultants"]

    const data = XLSX.utils.sheet_to_json(sheet)

    res.status(200).json({message:"The data is present!!!",data})
}


const ConsultantSignup = async(req,res)=>{

    const { id, name, email , password ,number} = req.body

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

    const details = {id,name,email,password:hash,role:"Consultant",number}

    users=[...users,details]

    workbook.Sheets["Users"]= XLSX.utils.json_to_sheet(users)

    XLSX.writeFile(workbook,"Database/EzyconseilDatabase.xlsx")

    console.log("Users:",users)

   

    res.status(201).json({message:"You have signup",details})
}


const getSingleConsultant = (req,res)=>{
    const workbook = XLSX.readFile("Database/EzyconseilDatabase.xlsx")

    const {id} = req.params

    const sheet = workbook.Sheets["Consultants"]

    const data = XLSX.utils.sheet_to_json(sheet)

    if(!data){

        res.status(404).json({message:"No Consultants registered yet"})
    }

    const Consultant = data.find((element)=>element.id == id)

    if(!Consultant){
        res.status(404).json({message:"Could not find consultant"})
    }



    res.status(200).json({message:"Consultant found",Consultant})
}

module.exports = {createConsultants,getConsultant,ConsultantSignup,getSingleConsultant}