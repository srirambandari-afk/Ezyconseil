// import area

const express = require('express')
const cors = require('cors')
const CompanyRouter = require('./Routes/CompanyRoutes')
const  ConsultantRouter = require('./Routes/ConsultantRoutes')
const AuthenticationRouter= require('./Routes/AuthenticationRoutes')
const ApplicationRouter = require('./Routes/ApplicationRoutes')
const BillRouter = require('./Routes/BillRoutes')
const {SyntaxHandler} = require('./middleware/SyntaxHandler')
const SignUpRouter = require('./Routes/SignUpRoutes')
const UserRouter = require('./Routes/UserRoutes')


const app = express()

// middleware
app.use(cors())
app.use(express.json())

// routes 

app.use((err,req,res,next)=>{

   console.log("From the app",err)
})


app.use(SyntaxHandler)


app.use('/Company',CompanyRouter)



app.use('/Consultant',ConsultantRouter)

app.use('/login',AuthenticationRouter)

app.use('/application',ApplicationRouter)

app.use('/Bill',BillRouter)

app.use('/SignUp',SignUpRouter)

app.use('/Users',UserRouter)




const PORT = 3456 

app.listen(PORT,()=>{
    console.log(`Server is up !!! connect to http://localhost:${PORT}`)
})