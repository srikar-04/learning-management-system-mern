import { createContext, useState } from "react";


export const studentContext = createContext(null);

export default function StudentProvider({children}) {
    const [studentCourseList, setStudentCourseList] = useState([])
    const [currentCourseId, setCurrentCourseId] = useState('')
    const [currentCourseDetails, setCurrentCourseDetails] = useState(null)

    return (
        <studentContext.Provider
            value={{
                studentCourseList,
                setStudentCourseList,
                currentCourseId, 
                setCurrentCourseId,
                currentCourseDetails, 
                setCurrentCourseDetails
            }}
        >
            {children}
        </studentContext.Provider>
    )
}