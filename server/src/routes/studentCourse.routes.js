import { Router } from "express";
import {getAllStudentCourses, getStudentCourseDetails} from '../controllers/studentCourse.controller.js'

const router = Router()

router.route('/get').get(getAllStudentCourses)
router.route('/get/details/:id/').get(getStudentCourseDetails)
// /student/course/get/details/67b1d372436398c9336e1b69

export default router