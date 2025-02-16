import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { Button } from '../ui/button'
import { LogOut } from 'lucide-react'
import { AuthContext } from '@/context/auth-context'
import StudentHeader from './StudentHeader'

function StudentLayout() {

  const { resetCredentials } = useContext(AuthContext)

  const handleLogout = () => {
    resetCredentials()
    sessionStorage.clear()
  }

  return (
    <div>
        <StudentHeader />
        <Outlet />
        <Button variant="destructive" onClick={handleLogout} >
          <LogOut  />
          <span>logout</span>
        </Button>
    </div>
  )
}

export default StudentLayout