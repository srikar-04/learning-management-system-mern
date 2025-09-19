import { Card, CardFooter } from '@/components/ui/card'
import { AuthContext } from '@/context/auth-context'
import { studentContext } from '@/context/student-context/studentContext'
import { fetchMyCoursesService } from '@/services/services'
import React, { useContext, useEffect } from 'react'
import { CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Watch } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function MyCourses() {

    const {auth} = useContext(AuthContext)
    const {myCoursesList, setMyCoursesList} = useContext(studentContext)
    const navigate = useNavigate()

    async function fetchMyCourses() {
        const response = await fetchMyCoursesService(auth?.user?._id)

        if(response?.success) {
            setMyCoursesList(response.data)
        } else {
            console.log('error fetching my courses in my courses page');
            setMyCoursesList([])
        }

        console.log(response, 'response in my courses page');
    }

    useEffect(() => {
        fetchMyCourses()
    }, [])

  return (
    <div className='p-4 '>
        <h1 className='text-3xl font-bold mb-8'>My Courses</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {
                myCoursesList && myCoursesList.length > 0
                ? myCoursesList.map(course => (
                    <Card key={course._id} className="flex flex-col">
                        <CardContent className="p-4 flex-grow">
                            <img 
                                src={course?.courseImage} alt="Course Thumbnail" 
                                className='h-52 w-full object-cover mb-4 rounded-md'
                            />
                            <h3 className='font-bold mb-1'>{course.title}</h3>
                            <p className='text-sm text-gray-700'>{course.instructorName}</p>
                        </CardContent>
                        <CardFooter>
                            <Button  className="flex-1" >  
                                {/* onClick={() => navigate(`/course-progress/${course._id}`, {replace: true})} */}
                                {/* {onClick=() => navigate(`/course-progress/${course.courseId}`, {replace: true})} */}
                                {onclick=() => navigate(`/course-progress/${course.courseId}`)}
                                <Watch className='mr-2 h-4 w-4'/>
                                Start Watching
                            </Button>
                        </CardFooter>
                    </Card>
                ))
                : <div className='text-3xl font-bold'>No Courses Bought</div>
            }
        </div>
    </div>
  )
}

export default MyCourses