import { Router } from "express";
import { getCoursesByStudentId } from "../controllers/myCourses.controller.js";

const router = Router()

router.route('/my-courses/:studentId').get(getCoursesByStudentId)

export default router