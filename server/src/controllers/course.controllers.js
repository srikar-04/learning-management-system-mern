import { Course } from "../models/course.models";

const addNewCourse = async (req, res) => {
  try {
    const courseData = req.body;
    const savedCourse = await Course.create(courseData);

    // WE DONT NEED TO ADD IF BLOCK CHECK HERE TO CHECK WHETHER WE GOT COURSELIST OR NOT BECAUSE IF THE CREATION FAILED MINGOOSE THROWS AN ERROR WHICH AUTOMATICALLY TIGGERS THE CATCH BLOCK

    return res.status(201).json({
      success: true,
      msg: "course created successfuly",
      data: savedCourse,
    });

  } catch (error) {
    console.log(error, "erronr while adding new course, in controller");
    return res.status(500).json({
      success: false,
      msg: "error while adding new course",
    });
  }
};
const getAllCourses = async (req, res) => {
  try {

    const coursesList = await Course.find({});

    if(!coursesList.length) {
        return res.status(404).json({
            success: false,
            msg: 'course not found in DB'
        })
    }

    return res.status(200).json({
      success: true,
      data: coursesList,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "error while adding new course",
      error: error.message
    });
  }
};
const getCourseDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const courseDetails = await Course.findById(id);

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        msg: "course not found",
      });
    }

    return res.status(200).json({
    success: true,
    data: courseDetails,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      msg: "error while adding new course",
      error: error.message
    });
  }
};
const updateCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCourseData = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      updatedCourseData,
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(400).json({
        success: false,
        msg: "course not found",
      });
    }

    return res.status(200).json({
    success: true,
    data: updatedCourse,
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "error while adding new course",
      error: error.message
    });
  }
};

export { addNewCourse, getAllCourses, getCourseDetailsById, updateCourseById };
