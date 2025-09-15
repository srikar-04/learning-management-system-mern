import paypal from "../utils/paypal.js";
import { Order } from "../models/order.models.js";
import { StudentCourses } from "../models/studentCourses.models.js";
import { Course } from "../models/course.models.js";

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
    });
    await newlyCreatedCourseOrder.save();

    const create_payment_json = {
        intent: 'sale',
        payer: {
            payment_method: 'paypal'
        },
        redirect_urls: {
            return_url: `http://localhost:5173/payment-return?courseId=${courseId}&orderId=${newlyCreatedCourseOrder._id}`,
            cancel_url: `http://localhost:5173/payment-cancel?orderId=${newlyCreatedCourseOrder._id}`
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
            newlyCreatedCourseOrder.orderStatus = "failed";
            newlyCreatedCourseOrder.paymentStatus = "failed";
            await newlyCreatedCourseOrder.save();

            return res.status(500).json({
                success: false,
                error: error.message,
                msg: "error in the order controller while doing payment"
            })
        } else {

            // const approvedUrl = paymentInfo.links.find(link => link.rel == 'approval_url').href

            // res.status(201).json({
            //     success: true,
            //     data:  JSON.stringify(paymentInfo)
            // })

            const approvalUrl = paymentInfo.links.find(link => link.rel === 'approval_url').href;

            res.status(201).json({
                success: true,
                data: {
                    orderId: newlyCreatedCourseOrder?._id,
                    approvedUrl: approvalUrl
                }
            });
        }
    })

  } catch (error) {
    console.error(error, "error while creating order, in controller");
    res.status(500).json({
      success: false,
      error: error.message,
      msg: 'error while creating order, in controller '
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

    const studentCourses = await StudentCourses.findOne({
        userId: order.userId
    })

    if(studentCourses) {

        studentCourses.courses.push({
            courseId: order.courseId,
            title: order.courseTitle,
            instructorId: order.instructorId,
            instructorName: order.instructorName,
            dateOfPurchase: order.orderDate,
            courseImage: order.courseImage
        })

        await studentCourses.save()

        // UPDATING COURSESCHEMA STUDENTS

        await Course.findByIdAndUpdate(order.courseId, {
            $addToSet: {
                students: {
                    studentId : order.userId,
                    studentName: order.userName,
                    studentEmail: order.userEmail,
                    paidAmount: order.coursePricing
                }
            }
        })

        res.status(201).json({
            success: true,
            msg: 'order confirmed',
            data: order
        })

    } else {
        const newStudentCourses = new StudentCourses({
            userId: order.userId,
            courses : [
                {
                    courseId: order.courseId,
                    title: order.courseTitle,
                    instructorId: order.instructorId,
                    instructorName: order.instructorName,
                    dateOfPurchase: order.orderDate,
                    courseImage: order.courseImage
                }
            ]
        })

        await newStudentCourses.save()
    }

  } catch (error) {
    console.error(error, "error while capturing payment, in controller");
    res.status(500).json({
      success: false,
      error: error.message,
      msg: "error while capturing payment, in controller"
    });
  }
};

export { createOrder, capturePayment };
