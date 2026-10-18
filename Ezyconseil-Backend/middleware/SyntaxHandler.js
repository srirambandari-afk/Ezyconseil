const SyntaxHandler = (err,req,res,next)=>{

    

   
if (err.type === "entity.parse.failed") {
    return res.status(400).json({
        error: "Invalid JSON format"
    })
}

console.log(err)

next(err)
}



module.exports = { SyntaxHandler}