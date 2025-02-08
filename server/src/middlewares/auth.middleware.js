import jwt from 'jsonwebtoken';


const verifyToken =  (token, jwtSecret) => {
    let res
    // console.log('response in verify token');
    
    try {
        res =  jwt.verify(token, jwtSecret);
    } catch (error) {
        if(error.name === 'TokenExpiredError') {
            // sessionStorage.clear()
            throw new Error('TokenExpiredError')
        }
        // console.log(error, 'error in auth middleware');
        // throw new Error(error)
    }
    console.log(res, 'response in verify token');
    
    return res
}

// THIS IS AUTH MIDDLEWARE USING "AUTHORIZATION HEADERS"
const authMiddleware = async (req, res, next) => {

    // if the user is signed in then he gets the acessToken which is stored in session storage
    // if the acess token is present(means user is signed in) then authorization header is passed from axiosInstance
    // here in this code the authorization header is used to check whether the user is loggedIn or not
    // if loggedIn then req.user is appended

    //PROGRAM FLOW :
    // signIn from form -->> storing data in Db and returning acessToken(in session storage) -->> token sent to authorization headers -->> auth middleware using authorization header to check login status of user and appending req.user

    const authHeader = req.headers.authorization
    // console.log(authHeader, 'auth header');
    // console.log('control in auth middleware');
    
    

    if(!authHeader) {
        return res.status(401).json({
            success: false,
            msg: 'user is not authenticated'
        })
    }

    const token = authHeader.split(' ')[1];
    // console.log(token, 'token after split');
    
    // console.log(process.env.JWT_SECRET, 'this is secret');
    // console.log(typeof(process.env.JWT_SECRET), 'this is type of secret');
    
    const payload = verifyToken(token, process.env.JWT_SECRET)

    console.log(payload, 'payload after token verification');
    

    req.user = payload

    next()
}

export default authMiddleware