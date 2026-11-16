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
const upload = require('./upload')
const extractResume = require('./extractResume')
const extractKeywords = require('./keywordExtractor')
const { extractPhrase, pipeline1 } = require('./matchProfiles')


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

app.post('/upload-resume', upload.single('resume'), (req, res) => {


  res.json({
    message: 'Resume uploaded successfully',
    filename: req.file.filename,
    path: req.file.path
  });
});


app.use('/uploads', express.static('uploads'));

app.post('/read-resume/', async (req, res) => {
  try {

    const resume = req.body.resume

   

    const projectDescription = req.body.projectDescription

    const text = resume.includes('uploads\\')
    ? await extractResume(resume.replaceAll('\\', '/'))
    : resume;

   

    const resumeKeywords = await extractKeywords(text)

    const phrases =  extractPhrase(projectDescription)

   

    const result = await pipeline1(resumeKeywords,phrases)

    

    res.json({ message:"Text extracted",result });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});




const PORT = 3456 

app.listen(PORT,()=>{
    console.log(`Server is up !!! connect to http://localhost:${PORT}`)
})