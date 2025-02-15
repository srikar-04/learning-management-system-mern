import CourseLandingPage from '@/components/instructor-view/new-course-components/CourseLandingPage'
import Curriculum from '@/components/instructor-view/new-course-components/Curriculum'
import Settings from '@/components/instructor-view/new-course-components/Settings'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger,  } from '@/components/ui/tabs'
import { courseCurriculumInitialFormData, courseLandingInitialFormData } from '@/config'
import { AuthContext } from '@/context/auth-context'
import { InstructorContext } from '@/context/instructor-context/instructorContext'
import { addNewCouseService, fetchInstructorCourseDetailsService } from '@/services/services'
import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function AddNewCoursePage() {

  const {
    courseLandingFormData,
    courseCurriculumFormData,
    setCourseCurriculumFormData,
    setCourseLandingFormData,
    currentEditCourseId,
    setCurrentEditCourseId
  } = useContext(InstructorContext)

  const params = useParams()
  console.log(params, 'params');
  

  const { auth } = useContext(AuthContext)

  const navigate = useNavigate()

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    }

    return value === "" || value === null || value === undefined;
  }

  function validateFormData() {
    for (const key in courseLandingFormData) {
      if (isEmpty(courseLandingFormData[key])) {
        return false;
      }
    }

    let hasFreePreview = false;

    for (const item of courseCurriculumFormData) {
      if (
        isEmpty(item.title) ||
        isEmpty(item.videoUrl) ||
        isEmpty(item.public_id)
      ) {
        return false;
      }

      if (item.freePreview) {
        hasFreePreview = true; //found at least one free preview
      }
    }

    return hasFreePreview;
  }

  const handleCourseSubmit = async () => {
    const finalFormData = {
      instructorId: auth?.user?._id,
      instructorName: auth?.user?.userName,
      date: new Date(),
      ...courseLandingFormData,
      students: [
       
      ],
      curriculum: courseCurriculumFormData,
      isPublished: true
    }

    const reponse = await addNewCouseService(finalFormData)

    if(reponse?.success) {
      setCourseCurriculumFormData(courseCurriculumInitialFormData)
      setCourseLandingFormData(courseLandingInitialFormData)
      navigate(-1)
    }
    
  }

  const fetchCurrentCourseDetails = async () => {
    const response  = await fetchInstructorCourseDetailsService(currentEditCourseId)

    if(response?.success) {
      const setCourseformData = Object.keys(courseLandingInitialFormData).reduce( (acc, key) => {
        acc[key] = response?.data[key] || courseLandingInitialFormData[key]

        return acc
      }, {})
      console.log(setCourseformData, 'setCourse form data');
      setCourseLandingFormData(setCourseformData)
      setCourseCurriculumFormData(response?.data?.curriculum)
    }
  }

  useEffect( () => {
    if(params) setCurrentEditCourseId(params.id)
  }, [params])

  useEffect( () => {
    if(currentEditCourseId !== null) fetchCurrentCourseDetails()
  }, [currentEditCourseId])

  return (
    <div className='container mx-auto p-4'>

      <div className='flex justify-between'>
        <h1 className='text-3xl font-extrabold mb-5'>Create New Course</h1>
        <Button 
          onClick = {handleCourseSubmit}
          disabled = {!validateFormData()}
          className="text-sm tracking-wider font-bold px-8"
        >
          SUBMIT
        </Button>
      </div>

      <Card>
        <CardContent>

          <div className='container mx-auto p-4'>
            <Tabs defaultValue='curriculum' className='space-y-4`'>

              <TabsList>
                <TabsTrigger value='curriculum'>
                  curriculum
                </TabsTrigger>
                <TabsTrigger value='course-landing-page'>
                  Course Landing Page
                </TabsTrigger>
                <TabsTrigger value='settings'>
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value='curriculum'>
                <Curriculum />
              </TabsContent>

              <TabsContent value='course-landing-page'>
                <CourseLandingPage />
              </TabsContent>

              <TabsContent value='settings'>
                <Settings />
              </TabsContent>

            </Tabs>
          </div>

        </CardContent>
      </Card>

    </div>
  )
}

export default AddNewCoursePage