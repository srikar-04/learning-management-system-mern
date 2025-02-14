import express, { Router } from 'express'
import {
    addNewCourse,
    getAllCourses,
    getCourseDetailsById,
    updateCourseById
} from '../controllers/course.controllers.js'

const router = Router()

router.route('/add').post(addNewCourse)
router.route('/get').get(getAllCourses)
router.route('/get/details/:id').get(getCourseDetailsById)
router.route('/update/:id').put(updateCourseById)

export default router