import { User } from '../models/user.models.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const registerUser = asyncHandler( async (req, res) => {
    console.log('control is reching register user in controller');
    
    const {userName, userEmail, password, role} = req.body

    console.log(userName, 'username from formdata given by user');
    

    const exsistingUser = await User.findOne({
        $or: [{userName}, {userEmail}]
    })

    console.log(exsistingUser, 'value of exsisting user');
    

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

    console.log(newUser, 'value of newly created user');
    

    if(!newUser) {
        return res.status(401).json({
            success: false,
            error: 'failed to create new user'
        })
    }

    return res.status(201).json({
        success: true,
        msg: 'user registered sucesfully',
        newUser
    })
})


export {
    registerUser
}