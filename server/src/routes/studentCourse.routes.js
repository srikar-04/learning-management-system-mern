import { Router } from "express";
import {getAllStudentCourses, getStudentCourseDetails} from '../controllers/studentCourse.controller'

const router = Router()

router.route('/get').get(getAllStudentCourses)
router.route('/get/details/:id').get(getStudentCourseDetails)

export default router