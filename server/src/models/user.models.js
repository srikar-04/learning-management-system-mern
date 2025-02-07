import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    userName: String,
    password: String,
    userEmail: String,
    role: String
}, {timestamps: true})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return bcrypt.compare(password, this.password)
}

export const User = mongoose.model('User', userSchema)