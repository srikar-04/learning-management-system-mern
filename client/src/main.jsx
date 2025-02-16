import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/auth-context'
import InstructorProvider from './context/instructor-context/instructorContext'
import StudentProvider from './context/student-context/studentContext'

createRoot(document.getElementById('root')).render(
  
  // BrowserRouter enables routing inside app
  // it allows app to use routing functionalities like useNavigate, Link etc..
  // it listens to all the rote urls and mantains a history stack

  <BrowserRouter >
    <AuthProvider>
      <InstructorProvider>
        <StudentProvider>
          <App />
        </StudentProvider>
      </InstructorProvider>
    </AuthProvider>
  </BrowserRouter>
  
)
