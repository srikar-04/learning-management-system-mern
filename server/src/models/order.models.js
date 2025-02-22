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
    instrucorName: String,
    courseImage: String,
    courseTitle: String,
    courseId: String,
    coursePricing: Number
}, {timestamps: true})

export const Order = mongoose.model('Order', OrderSchema)