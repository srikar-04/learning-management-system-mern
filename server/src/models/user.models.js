import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

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

userSchema.methods.generateAcessToken = async function() {
    return jwt.sign({
        _id: this._id,
        userEmail: this.userEmail,
        userName: this.userName,
        role: this.role
    },
    process.env.JWT_SECRET, 
    {
        expiresIn: process.env.JWT_EXPIRY
    }
    )
}

export const User = mongoose.model('User', userSchema)