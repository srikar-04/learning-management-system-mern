import { Button } from '@/components/ui/button'
import InstructorCourses from '../../components/instructor-view/InstructorCourses.jsx'
import InstructorViewDashboard from '../../components/instructor-view/InstructorViewDashboard.jsx'
import { BarChart, Book, LogOut } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { Tabs, TabsContent } from '@radix-ui/react-tabs'
import { AuthContext } from '../../context/auth-context/index.jsx'

function InstructorDashboard() {

  const { resetCredentials } = useContext(AuthContext)

  const menuItems = [
    {
      icon: BarChart,
      label: 'Dashboard',
      value: 'dashboard',
      component: <InstructorViewDashboard />
    },
    {
      icon: Book,
      label: 'Courses',
      value: 'courses',
      component:<InstructorCourses />
    }, 
    {
      icon: LogOut,
      label: 'Logout',
      value: 'logout',
      component: null
    }
  ]

  const handleLogout = () => {
    resetCredentials()
    sessionStorage.clear()
  }

  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className='flex h-full min-h-screen bg-gray-100'>

      <aside className='w-64 bg-white shadow-md hidden md:block'>
        <div className='p-4'>
          <h2 className='text-2xl font-bold mb-4'>InstructorDashboard</h2>
          <nav>
            {
              menuItems.map( item => (
              <Button
                // variant = {activeTab === item.value ? '' : 'ghost'}
                variant = {
                  item.value === 'logout' 
                  ? 'destructive'
                  : (activeTab === item.value ? '' : 'secondary')
                }
                className='w-full justify-start mb-2' 
                key={item.value}
                onClick = {item.value === 'logout'
                  ? handleLogout  : () => setActiveTab(item.value) }
              >

                <item.icon  className='mr-2 h-4 w-4'/>
                {item.label}

              </Button>))
            } 
          </nav>
        </div>
      </aside>
      
      <main className='flex-1 p-8 overflow-y-auto'>
        <div className='max-w-7xl mx-auto'>

          <h1 className='text-3xl font-bold mb-8'>
            Dashboard
          </h1>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {
              menuItems.map(item => (
                <TabsContent key={item.value} value={item.value}>
                  {
                    item.component !== null ? item.component : null
                  }
                </TabsContent>
              ) )
            }
          </Tabs>

        </div>
      </main>
    </div>
  )
}

export default InstructorDashboard