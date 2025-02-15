import { courseCurriculumInitialFormData, courseLandingInitialFormData } from "@/config";
import { createContext, useState } from "react";


export const InstructorContext = createContext(null);

export default function InstructorProvider({children}) {

    const [courseLandingFormData, setCourseLandingFormData] = useState(courseLandingInitialFormData)

    const [courseCurriculumFormData, setCourseCurriculumFormData] = useState(courseCurriculumInitialFormData)

    const [mediaUploadProgress, setMediaUploadProgress] = useState(false)

    const [instructorCourseList, setInstructorCourseList] = useState([])

    const [currentEditCourseId, setCurrentEditCourseId] = useState(null)

    return (
        <InstructorContext.Provider
            value={{
                courseLandingFormData,
                setCourseLandingFormData,
                courseCurriculumFormData,
                setCourseCurriculumFormData,
                mediaUploadProgress,
                setMediaUploadProgress,
                setInstructorCourseList,
                instructorCourseList,
                setCurrentEditCourseId,
                currentEditCourseId
            }}
        >{children}</InstructorContext.Provider>
    )
}