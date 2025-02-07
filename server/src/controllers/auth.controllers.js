import { User } from '../models/user.models.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const registerUser = asyncHandler( async (req, res) => {
    const {userName, userEmail, password, role} = req.body

    const exsistingUser = await User.findOne({
        $or: [{userName}, {userEmail}]
    })

    if(exsistingUser) {
        return res.status(400).json({
            success: false,
            error: 'username or email already exsists'
        })
    }

    const newUser = await User.create({
        userName,
        password,
        userEmail,
        role
    })

    if(!newUser) {
        return res.status(401).json({
            success: false,
            error: 'failed to create new user'
        })
    }

    return res.staus(201).json({
        success: true,
        msg: 'user registered sucesfully',
        newUser
    })
})


export {
    registerUser
}