import mongoose, {Schema} from "mongoose";

const OrderSchema = new Schema({
    userId: String,
    userName: String,
    userEmail: String,
    orderStatus: String,
    paymentMethod: String,
    paymentStatus: String,
    orderDate: Date,
    paymentId: String,
    payerId: String,
    instructorId: String,
    instructorName: String,
    courseImage: String,
    courseTitle: String,
    courseId: String,
    coursePricing: String
}, {timestamps: true})

export const Order = mongoose.model('Order', OrderSchema)