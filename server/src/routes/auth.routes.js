import {Router} from 'express'
import { registerUser, loginUser } from '../controllers/auth.controllers.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();
// console.log('control is reching route');

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)

router.route('/check-auth').get(authMiddleware, (req, res) => {
    const user = req.user;
    // console.log(user, 'user in routes which is getting returned');
    // console.log('control is reaching route');
    
    res.status(200).json({
        success: true,
        msg: 'user authenticated',
        data: {
            user
        }
    })
})

export default router