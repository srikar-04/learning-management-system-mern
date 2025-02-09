import FormControls from '@/components/common-form/form-controls'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { courseLandingPageFormControls } from '../../../config/index.js'
import React, { useContext, useState } from 'react'
import { InstructorContext } from '@/context/instructor-context/instructorContext.jsx'

function CourseLandingPage() {

  const { 

    courseLandingFormData,
    setCourseLandingFormData,

   } = useContext(InstructorContext)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Landing Page</CardTitle>
      </CardHeader>

      <CardContent>
        <FormControls
          formControls={courseLandingPageFormControls}
          formData = {courseLandingFormData}
          setFormData = {setCourseLandingFormData}
        />
      </CardContent>

    </Card>
  )
}

export default CourseLandingPage