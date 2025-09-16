import { Router } from "express";
import {getAllStudentCourses, getStudentCourseDetails} from '../controllers/studentCourse.controller.js'

const router = Router()

router.route('/get').get(getAllStudentCourses)
router.route('/get/details/:id/:studentId').get(getStudentCourseDetails)
// /student/course/get/details/67af45e6eefa4c82c0f901ae

export default router