import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { InstructorContext } from '../../../context/instructor-context/instructorContext.jsx'
import React, { useContext } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch.jsx'
import { Label } from '@/components/ui/label.jsx'
import { courseCurriculumInitialFormData } from '@/config/index.js'

function Curriculum() {

  const {

    courseCurriculumFormData,
    setCourseCurriculumFormData,

  } = useContext(InstructorContext)

  // console.log(courseCurriculumFormData);
  
  const handleNewLecture = () => {
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      {
        ...courseCurriculumInitialFormData[0]
      }
    ])
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Course Curriculum</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleNewLecture} >Add Lecture</Button>
        <div className='mt-4 space-y-4'>
          {
            courseCurriculumFormData.map(  (curriculumItem, index) => (
              <div key={index} className='border p-5 rounded-md'>

                <div className='flex items-center gap-5'>
                  <h3 className='font-semibold'>Lecture {index+1}</h3>
                  <Input 
                    name={`title-${index+1}`}
                    placeholder='Enter lecture title'
                    className='max-w-96'
                  />
                  <div className='flex items-center space-x-2'>
                    <Switch 
                      checked={true}
                      id={`freePreview-${index+1}`}
                    />
                    <Label htmlFor={`freePreview-${index+1}`}>Free Preview</Label>
                  </div>
                </div>

               <div className='mt-4'>
                <Input 
                      type='file'
                      accept='video/*'
                      className=''
                    />
               </div>

              </div>
            ))
          }
        </div>
      </CardContent>
    </Card>
  )
}

export default Curriculum