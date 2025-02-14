import mongoose, {Schema} from "mongoose";

const lectureSchema = new Schema({
    title: String,
    freePreview: String,
    videoUrl: String,
    public_id: String
})

const CourseSchema = new Schema({
    instructorId: String,
    instructorName: String,
    date: Date,
    title: String,
    category: String,
    level: String,
    primaryLanguage: String,
    subtitle: String,
    description: String,
    pricing: Number,
    objectives: String,
    welcomeMessage: String,
    image: String,
    students: [
        {
            studentId : String,
            studentName: String,
            studentEmail: String
        }
    ],
    curriculum: [lectureSchema],
    isPublished: Boolean
}, {timestamps: true})

const Course = mongoose.model("Course", CourseSchema)

export { Course }