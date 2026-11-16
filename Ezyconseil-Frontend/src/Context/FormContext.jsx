import { createContext, useContext, useReducer, useState } from "react";



const FormContext = createContext()

const FormContextConsume = ()=>{
    return(useContext(FormContext))
}

const Reducer = (state,action)=>{
     switch(action.type){
        case 'addCompany':
            return[action.payload, ...state]
        case 'getAllCompanies':
            return action.payload
     }

}

const ConsultReducer = (consultantState,action)=>{

    switch(action.type){

        case 'getAllConsultants':
            return action.payload
       
    }

}

const CompanyReducer = (CompanyProjectState,action)=>{

    switch(action.type){
        case 'getAllCompanyProjects':
            return action.payload
    }
}


const ProjectReducer = (ProjectState,action)=>{

    switch(action.type){
        case 'getAllProjects':
            return action.payload
    }
}

const FormContextProvider = (props)=>{

    const [ConsultInfo, setConsultInfo] = useState([])
    const [CompanyInfo , setCompanyInfo] = useState(null)
    const [state,dispatch] = useReducer(Reducer,[])
    const [consultantState,consultantDispatch] = useReducer(ConsultReducer,[])
    const [CompanyProjectState,CompanyProjectDispatch] = useReducer(CompanyReducer,[])
    const [ProjectState,ProjectDispatch] = useReducer(ProjectReducer,[])
      
    


    return(
        <FormContext.Provider value = {{ConsultInfo,setConsultInfo,dispatch,state,consultantState,
        consultantDispatch,CompanyInfo,setCompanyInfo,CompanyProjectState,CompanyProjectDispatch,ProjectState,ProjectDispatch }}>
            {props.children}
        </FormContext.Provider>
    )
}

export {FormContextProvider, FormContextConsume}