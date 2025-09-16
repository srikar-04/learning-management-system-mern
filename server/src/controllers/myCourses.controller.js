import { StudentCourses } from "../models/studentCourses.models.js";

const getCoursesByStudentId = async (req, res) => {
    try {

        // get student id from req.params
        // fetch student courses (in array) from studentCourses collection using student id
        const {studentId} = req.params

        const boughtCourses = await StudentCourses.findOne({
            userId: studentId
        })

        // if(!boughtCourses) {
        //     res.status(200).json({
        //         success: true,
        //         data: boughtCourses.courses
        //     })
        // }

        res.status(200).json({
            success: true,
            data: boughtCourses.courses
        })
        
    } catch (error) {
        console.log(error, 'error while fetching student courses in myCourses controller')
        res.status(500).json({
            success: false,
            message: 'error while fetching student courses in myCourses controller',
        })
    }
}

export {
    getCoursesByStudentId
}