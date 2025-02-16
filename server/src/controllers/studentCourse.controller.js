import { Course } from "../models/course.models";

const getAllStudentCourses = async (req, res) => {
    try {

        const coursesList = await Course.find({});

        if(coursesList.length === 0) {
            return res.status(404).json({
                success: false, 
                msg: 'courses not found, in controller'
            })
        }

        return res.status(201).json({
            success: true,
            data: coursesList
        })
        
    } catch (error) {
        console.error('error while fetching student courses : ', error);
        res.status(500).json({
            success: false,
            msg: 'error while fetching student courses in controller',
            error: error.message
        })
    }
}

const getStudentCourseDetails = async(req, res) => {
    try {

        const { id } = req.params;

        const courseDetails = await Course.findById(id)

        if(!courseDetails) {
            res.status(404).json({
                success: false,
                msg: 'no course found with that id, in controller'
            })
        }

        res.status(201).json({
            success: true,
            data: courseDetails
        })
        
    } catch (error) {
        console.error('error while fetching student courses details : ', error);
        res.status(500).json({
            success: false,
            msg: 'error while fetching student courses details in controller',
            error: error.message
        })
    }
}

export {
    getAllStudentCourses,
    getStudentCourseDetails,
}