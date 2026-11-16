const XLSX = require("xlsx")

const createBillStatement = (req,res)=>{

    const data = req.body

    


    const workbook = XLSX.readFile("Database/EzyconseilDatabase.xlsx");
    
        if(!workbook.Sheets["BillStatements"]){
          XLSX.utils.book_append_sheet(workbook,XLSX.utils.json_to_sheet([]),"BillStatements")
        }
    
        const sheet = workbook.Sheets["BillStatements"]
    
        let Bills = XLSX.utils.sheet_to_json(sheet)
    
        Bills = [...Bills,data]
    
        workbook.Sheets["BillStatements"] = XLSX.utils.json_to_sheet(Bills)
    
        XLSX.writeFile(workbook, "Database/EzyconseilDatabase.xlsx")
    
        res.status(201).json({message:"Bill had been successfully created"})
    


}


const getSingleBill = (req,res)=>{
       
    const{id} = req.params

    const workbook = XLSX.readFile("Database/EzyconseilDatabase.xlsx");

    const sheet = workbook.Sheets["BillStatements"]

    const Bills = XLSX.utils.sheet_to_json(sheet)

    const Bill = Bills.find((element)=>element.billNumber == id)

    if(!Bill){
        res.status(404).json({message:"We could not find this bill any where !!!"})    
    }

    res.status(200).json({message:"Found the bill statement!!!",Bill})


}

 const getBillStatements = (re,res)=>{

    const workbook = XLSX.readFile("Database/EzyconseilDatabase.xlsx");

    const sheet = workbook.Sheets["BillStatements"]

    const Bills = XLSX.utils.sheet_to_json(sheet)

    if(!Bills){
        res.status(404).json({message:"No Bills Found!!!"})
    }

    res.status(200).json({message:"Bills Found!!!",Bills})

 }

module.exports = {createBillStatement,getSingleBill,getBillStatements}