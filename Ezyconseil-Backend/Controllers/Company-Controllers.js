const XLSX = require("xlsx")
const validator = require('validator')
const bcrypt = require('bcrypt')

const getCompanies = (req,res)=>{
    const workbook = XLSX.readFile("Database/EzyconseilDatabase.xlsx")

   

    const sheet = workbook.Sheets["Companies"]

    const data = XLSX.utils.sheet_to_json(sheet)

    res.status(200).json({message:"The data is present!!!",data})
}

const CreateCompany = (req,res)=>{
    let array = []

      array.push(req.body)

      

      // Accessing the workbook 

const workbook = XLSX.readFile("Database/EzyconseilDatabase.xlsx");



// Accessing the sheet 

const sheet = workbook.Sheets["Companies"];

// accessing data from the sheet - sheet is converted to json format

const data = XLSX.utils.sheet_to_json(sheet);



// pushing the array into the data 

data.push(...array);



// feeding the data from sheet back to the workbooksheet, json to sheet format 

workbook.Sheets["Companies"] = XLSX.utils.json_to_sheet(data);

// finally writing to excel file 

XLSX.writeFile(workbook, "Database/EzyconseilDatabase.xlsx");

      res.status(201).json({message:"Successfully reached backend",array})

     
}

const CompanySignup = async(req,res)=>{

    const { id, name, email , password , number } = req.body

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

    const details = {id,name,email,password:hash,role:"Company",number}

    users=[...users,details]

    workbook.Sheets["Users"]= XLSX.utils.json_to_sheet(users)

    XLSX.writeFile(workbook,"Database/EzyconseilDatabase.xlsx")

    console.log("Users:",users)

   

    res.status(201).json({message:"You have signup",details})
}

const getSingleCompany = (req,res)=>{

  

    const  {id} = req.params 

    const workbook = XLSX.readFile("Database/EzyconseilDatabase.xlsx")

    const sheet = workbook.Sheets["Companies"]

    const  data = XLSX.utils.sheet_to_json(sheet)

    const company = data.find((element)=>element.id == id)

    if(!company){
        return res.status(404).json({message:"We couldn't find the company you were looking for!!!"})
    }
    
    const name = company.companyname
    res.status(200).json({message:"Found the requested company, here  is  the  company name",name})


}

const createCompanyProject = (req,res)=>{

    let data = req.body 

    data = {...data,applied:0,projectStatus:"Not Started",ApprovedApplicationID:null}

    const workbook = XLSX.readFile("Database/EzyconseilDatabase.xlsx")

    if(!workbook.Sheets["Projects"]){
            XLSX.utils.book_append_sheet(workbook,XLSX.utils.json_to_sheet([]),"Projects")
        }
    const sheet = workbook.Sheets["Projects"]

    let Projects = XLSX.utils.sheet_to_json(sheet)

    Projects = [...Projects,data]

    workbook.Sheets["Projects"] = XLSX.utils.json_to_sheet(Projects)

    XLSX.writeFile(workbook, "Database/EzyconseilDatabase.xlsx");

    res.status(201).json({message:"Project has been created successfully",Projects})

}

const getCompanyProject = (req,res)=>{

    const {id} = req.params

    const workbook = XLSX.readFile("Database/EzyconseilDatabase.xlsx")

    const sheet = workbook.Sheets["Projects"]

    const Projects = XLSX.utils.sheet_to_json(sheet)

    

    const Project = Projects.filter((element)=>element.ID == id)

    if (!Project){
        return res.status(404).json({message:"We could not find the requested Project!!!"})
    }

    res.status(200).json({message:"Found Project!!!",Project})

}

const getProjects = (req,res)=>{

    const workbook = XLSX.readFile("Database/EzyconseilDatabase.xlsx")

    const sheet = workbook.Sheets["Projects"]

    const Projects = XLSX.utils.sheet_to_json(sheet)

    

    if(!Projects){
        res.status(404).json({message:"No projects present here!!!"})
    }

    res.status(200).json({message:"List of  Projects",Projects})


}

const updateCompanyProject = (req,res)=>{
      
    
    const {id} = req.params
    

    
    const workbook = XLSX.readFile("Database/EzyconseilDatabase.xlsx")

    const sheet = workbook.Sheets["Projects"]

    const Projects = XLSX.utils.sheet_to_json(sheet)

    let Project = Projects.find((project)=>project.id == id)

    Project.applied = Project.applied + 1

    workbook.Sheets["Projects"] = XLSX.utils.json_to_sheet(Projects)

   XLSX.writeFile(workbook, "Database/EzyconseilDatabase.xlsx");


   res.status(201).json({message:"The Project has been updated!!!"})


}


const updateProgressProject = (req,res)=>{


    const {id} = req.params
    
    const {projectStatus,ApprovedApplicationID} = req.body
    
    const workbook = XLSX.readFile("Database/EzyconseilDatabase.xlsx")

    const sheet = workbook.Sheets["Projects"]

    const Projects = XLSX.utils.sheet_to_json(sheet)

    let Project = Projects.find((project)=>project.id == id)

    if(!Project){

        res.status(404).json({message:"No such Project found!!!"})
    }

    Project.projectStatus = projectStatus
    Project.ApprovedApplicationID = ApprovedApplicationID

    workbook.Sheets["Projects"] = XLSX.utils.json_to_sheet(Projects)

   XLSX.writeFile(workbook, "Database/EzyconseilDatabase.xlsx");


   res.status(201).json({message:"The Project has been progress updated!!!"})



}

module.exports ={getCompanies,CreateCompany,CompanySignup,getSingleCompany,createCompanyProject,getCompanyProject,getProjects,updateCompanyProject,updateProgressProject}