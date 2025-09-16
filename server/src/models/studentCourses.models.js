import mongoose, {mongo, Schema} from 'mongoose'

const StudentCourseSchema = new Schema({
    userId: String,
    courses: [{
        courseId: String,
        title: String,
        instructorId: String,
        instructorName: String,
        dateOfPurchase: Date,
        courseImage: String
    }]
}, {timestamps: true})

export const StudentCourses = mongoose.model('StudentCourses', StudentCourseSchema)