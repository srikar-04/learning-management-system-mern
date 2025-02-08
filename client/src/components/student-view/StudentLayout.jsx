import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { Button } from '../ui/button'
import { LogOut } from 'lucide-react'
import { AuthContext } from '@/context/auth-context'

function StudentLayout() {

  const { resetCredentials } = useContext(AuthContext)

  const handleLogout = () => {
    resetCredentials()
    sessionStorage.clear()
  }

  return (
    <div>
        StudentLayout
        <Outlet />
        <Button onClick={handleLogout} >
          <LogOut />
          <span>logout</span>
        </Button>
    </div>
  )
}

export default StudentLayout