import { GraduationCap, LogOut, TvMinimalPlay } from 'lucide-react'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { AuthContext } from '@/context/auth-context'

function StudentHeader() {

  const { resetCredentials } = useContext(AuthContext)

  const handleLogout = () => {
    resetCredentials()
    sessionStorage.clear()
  }

  return (
    <>
      <header className='flex items-center justify-between py-4 px-6 border-b relative'>
        <div className='flex items-center space-x-4'>

          <Link to='/home' className='flex items-center'>
            <GraduationCap className='h-8 w-8 mr-4 hover:text-black'/>
              <span className='font-extrabold md:text-xl text-[14px]'>
                LMS Learn
              </span>
          </Link>

          <div className='flex items-center space-x-1'>
            <Button variant='ghost' className='text-[14px] md:text-[15px] font-medium'>
              Explore Courses
            </Button>
          </div>

        </div>

        <div className='flex items-center space-x-4'>
          <div className='flex gap-4 items-center'>
            <div className='flex items-center gap-3 '>
              <span className='font-extrabold md:text-xl text-[14px]'>My Courses</span>
              <TvMinimalPlay className='w-8 h-8 cursor-pointer'/>
            </div>
          </div>

          <Button 
            variant='secondary' 
            className='hover:bg-red-600 hover:text-white'
            onClick={handleLogout} 
          >
          <LogOut  />
          <span>logout</span>
        </Button>

        </div>

      </header>
    </>
  )
}

export default StudentHeader