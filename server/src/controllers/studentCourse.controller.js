import { Course } from "../models/course.models.js";

const getAllStudentCourses = async (req, res) => {
    try {
        const { category, level, primaryLanguage, sortBy='price-lowtohigh' } = req.query

        //  console.log('Received query params:', { category, level, primaryLanguage, sortBy });

        let filters = {};
    
        if(category) {
            const categoryArray = Array.isArray(category) ? category : category.split(',');
          filters.category = {$in : categoryArray}
        }
        if(level) {
            const levelArray = Array.isArray(level) ? level : level.split(',');
          filters.level = {$in : levelArray}
        }
        if(primaryLanguage) {
            const languageArray = Array.isArray(primaryLanguage) ? primaryLanguage : primaryLanguage.split(',');
          filters.primaryLanguage = {$in : languageArray}
        }
    
        let sortParam = {};
        switch (sortBy) {
          case 'price-lowtohigh':
            sortParam.pricing = 1
          break;
          case 'price-hightolow':
            sortParam.pricing = -1
          break;
          case 'title-atoz':
            sortParam.title = 1
          break;
          case 'title-ztoa':
            sortParam.title = -1
          break;
        
          default:
            sortParam.pricing = 1
          break;
        }
        
    
        const coursesList = await Course.find(filters).sort(sortParam)

        // console.log(coursesList, 'final courseList from database');
        
        return res.status(200).json({
          success: true,
          data: coursesList,
        });
        
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

        const {id} = req.params
        
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