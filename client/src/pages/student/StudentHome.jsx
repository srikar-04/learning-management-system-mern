import { Button } from '@/components/ui/button'
import { courseCategories } from '@/config'
import { studentContext } from '@/context/student-context/studentContext'
import React, { useContext } from 'react'

function StudentHome() {

  const {
    studentCourseList,
    setStudentCourseList
  } = useContext(studentContext)

  return (
    <div className='min-h-screen bg-white'>

      <section className='flex flex-col lg:flex-row items-center justify-between py-8 px-4 lg:px-8'>

        <div className='lg:w-1/2 lg:pr-12'>
          <h1 className='text-4xl font-bold mb-4'>Learning that gets you</h1>
          <p className='text-xl'>Skills for your present and your future. Get started with us</p>
        </div>

        <div className='lg:w-full mb-8 lg:mb-0'>
          <img 
            src='/banner.png'           
            width={600}
            height={600}
            className='w-full h-auto rounded-lg shadow-lg'
          />
        </div>

      </section>

      <section className='py-8 px-4 lg:px-8 bg-gray-100'>
        <h2 className='text-2xl font-bold mb-6'>Course Categories</h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
          {
            courseCategories.map( item => (
              <>
                <Button key={item.id} className='justify-start' variant='outline'>{item.label}</Button>
              </>
            ))
          }
        </div>
      </section>

    </div>
  )
}

export default StudentHome