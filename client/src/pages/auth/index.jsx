import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs.jsx'
import { GraduationCap } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function AuthPage() {
    
    const [activeTab, setActiveTab] = useState('signin')

    const handleTabChange = (value) => {
        setActiveTab(value)
    }

  return (
    <div className='flex flex-col h-screen w-full'>
        <header className='px-4 lg:px-6 h-14 flex items-center border-b'>
            <Link className='flex items-center justify-center' >
                <GraduationCap className='h-8 w-8 mr-4' />
                <span className='font-extrabold text-xl'>LMS Learn</span>
            </Link>
        </header>
        <div className='flex items-center justify-center min-h-screen bg-background'>
            <Tabs
                value={activeTab}
                defaultValue='signin'
                onValueChange={handleTabChange}
                className='w-full max-w-md'
            >
                <TabsList className='w-full border grid grid-cols-2'>
                    <TabsTrigger value='signin'>Sign In</TabsTrigger>
                    <TabsTrigger value='signup'>Sign Up</TabsTrigger>

                    <TabsContent value='signin' >signin</TabsContent>
                    <TabsContent value='signup' >signup</TabsContent>
                </TabsList>
            </Tabs>
        </div>
    </div>
  )
}

export default AuthPage