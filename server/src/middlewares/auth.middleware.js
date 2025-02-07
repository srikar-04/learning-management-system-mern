import jwt from 'jsonwebtoken';


const verifyToken = (token, jwtSecret) => {
    return jwt.verify(token, jwtSecret)
}

// THIS IS AUTH MIDDLEWARE USING "AUTHORIZATION HEADERS"
const authMiddleware = (req, res, next) => {

    // if the user is signed in then he gets the acessToken which is stored in session storage
    // if the acess token is present(means user is signed in) then authorization header is passed from axiosInstance
    // here in this code the authorization header is used to check whether the user is loggedIn or not
    // if loggedIn then req.user is appended

    //PROGRAM FLOW :
    // signIn from form -->> storing data in Db and returning acessToken(in session storage) -->> token sent to authorization headers -->> auth middleware using authorization header to check login status of user and appending req.user

    const authHeader = req.headers.authorization

    if(!authHeader) {
        return res.status(401).json({
            success: false,
            msg: 'user is not authenticated'
        })
    }

    const token = authHeader.split(' ')[1];

    const payload = verifyToken(token, process.env.JWT_SECRET)

    req.user = payload

    next()
}

export default authMiddleware