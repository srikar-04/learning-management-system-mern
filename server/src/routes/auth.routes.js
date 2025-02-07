import {Router} from 'express'
import { registerUser, loginUser } from '../controllers/auth.controllers.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();
// console.log('control is reching route');

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)

router.route('/check-auth').post(authMiddleware, (req, res) => {
    const user = req.user;

    res.status(200).json({
        success: true,
        msg: 'authenticated user',
        data: {
            user
        }
    })
})

export default router