import express, {Router} from 'express'
import { registerUser } from '../controllers/auth.controllers.js';

const router = Router();
console.log('control is reching route');

router.route('/register').post(registerUser)

export default router