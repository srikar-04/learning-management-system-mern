import mongoose, {Schema} from 'mongoose';

const userSchema = new Schema({
    userName: String,
    password: String,
    userEmail: String,
    role: String
}, {timestamps: true})

export const User = mongoose.model('User', userSchema)