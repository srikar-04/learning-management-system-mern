import paypal from "../utils/paypal";
import { Order } from "../models/order.models";
import { StudentCourses } from "../models/studentCourses.models";
import { Course } from "../models/course.models";
import { payment } from "paypal-rest-sdk";

const createOrder = async (req, res) => {
  try {

    const {
      userId,
      userName,
      userEmail,
      orderStatus,
      paymentMethod,
      paymentStatus,
      orderDate,
      paymentId,
      payerId,
      instructorId,
      instructorName,
      courseImage,
      courseTitle,
      courseId,
      coursePricing,
    } = req.body;

    const create_payment_json = {
        intent: 'sale',
        payer: {
            payment_method: 'paypal'
        },
        redirect_urls: {
            return_url: 'http://localhost:5173/payment-return',
            cancel_url: 'http://localhost:5173/payment-cancel'
        },
        transactions: [
            {
                item_list: {
                    items: [
                        {
                            name: courseTitle,
                            sku: courseId,
                            price: coursePricing,
                            currency: 'USD',
                            quantity: 1
                        }
                    ]
                },
                amount: {
                    currency : "USD",
                    total: coursePricing.toFixed(2)
                },
                description: courseTitle
            }
        ]
    }

    paypal.payment.create(create_payment_json, async(error, paymentInfo) => {
        if(error) {
            console.log(error, 'error in the order controller while doing payment')
            return res.status(500).json({
                success: false,
                error: error.message
            })
        } else {
            //  WE CAN ALSO USE .CREATE METHOD FOR THIS
            const newlyCreatedCourseOrder = new Order({
                userId,
                userName,
                userEmail,
                orderStatus,
                paymentMethod,
                paymentStatus,
                orderDate,
                paymentId,
                payerId,
                instructorId,
                instructorName,
                courseImage,
                courseTitle,
                courseId,
                coursePricing,
            })
            await newlyCreatedCourseOrder.save()

            const approvedUrl = paymentInfo.links.find(link => link.rel == 'approval_url').href

            res.status(201).json({
                success: true,
                data: {
                    approvedUrl,
                    orderId: newlyCreatedCourseOrder._id
                }
            })
        }
    })

  } catch (error) {
    console.error(error, "error while creating order, in controller");
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
const capturePayment = async (req, res) => {
  try {

    const {paymentId, payerId, orderId} = req.body;

    let order = await Order.findById(orderId)

    if(!order) {
        return res.status(404).json({
            success: false,
            msg: 'order not found, in order.controller'
        })
    }

    order.paymentStatus = 'paid'
    order.orderStatus = 'confirmed'
    order.paymentId = paymentId
    order.payerId = payerId

    await order.save()

    // updating studentCorse model

    

  } catch (error) {
    console.error(error, "error while capturing payment, in controller");
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export { createOrder, capturePayment };
