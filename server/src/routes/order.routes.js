import express from 'express';
import { createOrder, capturePayment } from '../controllers/order.controller.js'

const router = express.Router();

router.route('/create').post(createOrder)
router.route('/capture').post(capturePayment)

export default router