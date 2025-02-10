import { Label } from '../../../components/ui/label.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card.jsx'
import React, { useContext } from 'react'
import { Input } from '../../../components/ui/input.jsx'
import { InstructorContext } from '@/context/instructor-context/instructorContext.jsx'
import { mediaUploadService } from '../../../services/services.js'

function Settings() {

  const {
    courseLandingFormData,
    setCourseLandingFormData
  } = useContext(InstructorContext)

  const handleImageUploadChange = async (e) => {
    const selectedImage = e.target.files[0]

    if(selectedImage) {
      const imageFormData = new FormData();
      imageFormData.append('file', selectedImage)
      try {
        const response = await mediaUploadService(imageFormData)
        console.log(response);

        if(response.success) {
          setCourseLandingFormData({
            ...courseLandingFormData,
            image: response.data.url
          })
        }
      } catch (error) {
        console.log('error while uploading image, in settings.jsx file', error);
      }
    }
  }
  console.log(courseLandingFormData);
  

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Settings</CardTitle>
      </CardHeader>
      <CardContent>
        {
          courseLandingFormData?.image 
          ? <img src={courseLandingFormData.image} /> 
          : (
            <div className='flex flex-col gap-3'>
            <Label>Upload Course Image</Label>
            <Input 
              type='file'
              accept='image/*'
              onChange = {(e) => handleImageUploadChange(e)}
            />
           </div>
          )
        }
      </CardContent>
    </Card>
  )
}

export default Settings