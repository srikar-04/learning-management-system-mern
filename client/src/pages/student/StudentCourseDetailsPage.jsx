import { studentContext } from '@/context/student-context/studentContext';
import { fetchStudentCourseDetailsService } from '@/services/services';
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function StudentCourseDetailsPage() {

    const {
        currentCourseId, 
        setCurrentCouseId,
        currentCourseDetails, 
        setCurrentCourseDetails
    } = useContext(studentContext)

    const {id} = useParams()

   useEffect( () => {
    // console.log('updating id state');
    
    if(id) {
        setCurrentCouseId(()=>id)
    }
   }, [id])

   const fetchCurrentCourseDetails = async () => {
    // console.log('fetching data using id');
    try {

        const response = await fetchStudentCourseDetailsService(id)

        // console.log(response, 'reponse in useEffect');
        
        if(response?.success) {
            setCurrentCourseDetails(response.data)
        } else {
            console.error('data not found for specific course')
        }
        
    } catch (error) {
        console.log('error while fetching course details, in studentCourseDetailsPage', error);
    }
   }

   useEffect(() => {
    fetchCurrentCourseDetails()
   }, [currentCourseId])

    console.log(currentCourseDetails, 'current course details');
   
  return (
    <div>StudentCourseDetailsPage</div>
  )
}

export default StudentCourseDetailsPage