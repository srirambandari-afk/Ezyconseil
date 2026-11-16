const XLSX = require("xlsx")
const validator = require('validator')
const bcrypt = require('bcrypt')


const Login = async(req,res)=>{

    const { email , password } = req.body

    const workbook = XLSX.readFile("Database/EzyconseilDatabase.xlsx")

    const sheet = workbook.Sheets["Users"]

    const users = XLSX.utils.sheet_to_json(sheet)

   

    const user = users.find(user=>user.email == email)
    

    if(!user){
        return res.status(409).json({message:"Email does not exist!!!"})
    }

    if( !email || !password){
        return res.status(400).json({message:"Please enter all the details!!!"})
    }
    if(!validator.isEmail(email)){
           return res.status(400).json({message:"This is not a valid email!!!"})
        }
       

        const match = await bcrypt.compare(password,user.password)

        const password1 = user.password

        if(!match){
            return res.status(401).json({message:"Incorrect Password!!!!"})
        }

      const { id , name , role} = user

    const email1 = user.email

    const user1 = { id, name, email:email1,role}



    res.status(200).json({message:"You have successfully logged in !!!",details:user1})
}

const UpdatePassword = async(req,res)=>{

    const { email , password } = req.body

    const data = req.body

    const workbook = XLSX.readFile("Database/EzyconseilDatabase.xlsx")

    const sheet = workbook.Sheets["Users"]

    const users = XLSX.utils.sheet_to_json(sheet)

   

    const user = users.find(user=>user.email == email)
    

    if(!user){
        return res.status(409).json({message:"Email does not exist!!!"})
    }

    if( !email || !password){
        return res.status(400).json({message:"Please enter all the details!!!"})
    }
    if(!validator.isEmail(email)){
           return res.status(400).json({message:"This is not a valid email!!!"})
        }
       

        const match = await bcrypt.compare(password,user.password)

        const password1 = user.password

        if(!match){
            return res.status(401).json({message:"Incorrect Password!!!!"})
        }

        if(!validator.isStrongPassword(data.password1)){
                   return res.status(400).json({message:"Please enter a strong password!!!"})
                }

                const salt = await bcrypt.genSalt(10)
                const hash = await bcrypt.hash(data.password1,salt)

                user.password = hash

      
     XLSX.writeFile(workbook,"Database/EzyconseilDatabase.xlsx")


    res.status(200).json({message:"You have successfully Updated the  password !!!"})


}

module.exports = {Login,UpdatePassword}