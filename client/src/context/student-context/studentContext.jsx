import { createContext, useState } from "react";


export const studentContext = createContext(null);

export default function StudentProvider({children}) {
    const [studentCourseList, setStudentCourseList] = useState([])

    return (
        <studentContext.Provider
            value={{
                studentCourseList,
                setStudentCourseList
            }}
        >
            {children}
        </studentContext.Provider>
    )
}