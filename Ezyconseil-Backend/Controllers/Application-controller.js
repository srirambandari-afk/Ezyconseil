const XLSX = require("xlsx")



const createApplication = (req,res)=>{

    const data = req.body 

    const workbook = XLSX.readFile("Database/EzyconseilDatabase.xlsx");

    if(!workbook.Sheets["Applications"]){
      XLSX.utils.book_append_sheet(workbook,XLSX.utils.json_to_sheet([]),"Applications")
    }

    const sheet = workbook.Sheets["Applications"]

    let Applications = XLSX.utils.sheet_to_json(sheet)

    Applications = [...Applications,data]

    workbook.Sheets["Applications"] = XLSX.utils.json_to_sheet(Applications)

    XLSX.writeFile(workbook, "Database/EzyconseilDatabase.xlsx")

    res.status(201).json({message:"Applications have been successfully created"})

    


}

const getUserApplications = (req,res)=>{

    const { id} = req.params

    const workbook = XLSX.readFile("Database/EzyconseilDatabase.xlsx");

    const sheet = workbook.Sheets["Applications"]

    const Applications = XLSX.utils.sheet_to_json(sheet)

    if(!Applications){
        res.status(404).json({message:"No applications found!!!"})
    }

    const requests = Applications.filter((element)=>element.userid == id)

    if(!requests){
        res.status(404).json({message:"We could not find any applications  done by this user!!!"})
    }

    res.status(200).json({message:"Records found!!!!",requests})



}

const checkApplication = (req,res)=>{

    const { userid , projectId } = req.body


    const workbook = XLSX.readFile("Database/EzyconseilDatabase.xlsx");

    const sheet = workbook.Sheets["Applications"]

    const Applications = XLSX.utils.sheet_to_json(sheet)

    if(!Applications){
        res.status(404).json({message:"No applications found!!!"})
    }

    const matchingRequest = Applications.find((request)=>
      request.userid == userid && request.projectId == projectId
    )

    if(!matchingRequest){

        res.status(404).json({message:"Not yet applied"})
    }

    res.status(200).json({message:"Already applied to this!!!"})



}

const getApplications = (req,res)=>{

     const workbook = XLSX.readFile("Database/EzyconseilDatabase.xlsx");

    const sheet = workbook.Sheets["Applications"]

    const Applications = XLSX.utils.sheet_to_json(sheet)

    if(!Applications){
        res.status(404).json({message:"No applications present yet!!"})
    }

    res.status(200).json({message:"Applications found!!!",Applications})


}

const getCompanyProjectApplicants = (req,res)=>{

     const { id} = req.params

    const workbook = XLSX.readFile("Database/EzyconseilDatabase.xlsx");

    const sheet = workbook.Sheets["Applications"]

    const Applications = XLSX.utils.sheet_to_json(sheet)

    if(!Applications){
        res.status(404).json({message:"No applications found!!!"})
    }

    const requests = Applications.filter((element)=>element.projectId == id)

    if(!requests){
        res.status(404).json({message:"We could not find any applicants to the Project!!!"})
    }

    res.status(200).json({message:"Records found!!!!",requests})


}

const updateApplication = (req,res)=>{

    const {id} = req.params

    const {taskStatus} = req.body


    const workbook = XLSX.readFile("Database/EzyconseilDatabase.xlsx");

    const sheet = workbook.Sheets["Applications"]

    const Applications = XLSX.utils.sheet_to_json(sheet)

    const Request = Applications.find((element)=>element.applicationid == id)

    if(!Request){
        res.status(404).json({message:"No such application present!!!"})
    }
    Request.status = true
    Request.taskStatus = taskStatus

    workbook.Sheets["Applications"] = XLSX.utils.json_to_sheet(Applications)

    XLSX.writeFile(workbook, "Database/EzyconseilDatabase.xlsx")

    res.status(200).json({message:"The approval status  is successfully updated"})


}

const getSingleApplication = (req,res)=>{

    const { id} = req.params

    const workbook = XLSX.readFile("Database/EzyconseilDatabase.xlsx");

    const sheet = workbook.Sheets["Applications"]

    const Applications = XLSX.utils.sheet_to_json(sheet)

    if(!Applications){
        res.status(404).json({message:"No applications found!!!"})
    }

    const request = Applications.find((element)=>element.applicationid == id)

    if(!request){
        res.status(404).json({message:"We could not the requested  application r!!!"})
    }

    res.status(200).json({message:"Record found!!!!",request})



}

module.exports = {createApplication , getUserApplications , checkApplication , getApplications , getCompanyProjectApplicants,updateApplication,getSingleApplication}