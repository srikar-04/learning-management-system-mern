import { Course } from "../models/course.models";

const addNewCourse = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'error while adding new course'
        })
    }
}
const getAllCourses = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'error while adding new course'
        })
    }
}
const getCourseDetails = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'error while adding new course'
        })
    }
}
const updateCourseById = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'error while adding new course'
        })
    }
}

export {
    addNewCourse,
    getAllCourses,
    getCourseDetails,
    updateCourseById 
}