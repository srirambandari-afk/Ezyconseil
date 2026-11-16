import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FormContextProvider } from './Context/FormContext.jsx'
import { AuthenticationProvider } from './Context/AuthenticationContext.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthenticationProvider>
    <FormContextProvider>
    <App />
    </FormContextProvider>
    </AuthenticationProvider>
  </StrictMode>,
)
