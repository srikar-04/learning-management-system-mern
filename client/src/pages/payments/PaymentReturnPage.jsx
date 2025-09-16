import { capturePaymentService } from '@/services/services';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

function PaymentReturnPage() {

    console.log('INSIDE PAYMENT RETURN PAGE');
    

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('Processing Payment...')

    const confirmPayment = async ({paymentId, payerId, orderId, courseId}) => {
        try {
            const response = await capturePaymentService({paymentId, payerId, orderId, courseId});

            if(response?.success) {
                setStatus("✅ Payment successful! Redirecting to your course...");
                // navigating to student cousrse page after timeout
                setTimeout(() => {
                    navigate('/my-courses')
                }, 2000)
            } else {
                setStatus("❌ Payment failed. Please try again.");
            }
        } catch (error) {
            console.error("Error confirming payment:", error);
            setStatus("⚠️ Something went wrong while confirming payment.");
        }
    }

    async function handlePaymentReturn() {
        
    }

    useEffect(() => {
        const handlePaymentReturn = async () => {
            const paymentId = searchParams.get("paymentId");
            const payerId = searchParams.get("PayerID");
            const orderId = searchParams.get("orderId");
            const courseId = searchParams.get("courseId");

            if (!paymentId || !payerId || !orderId) {
                setStatus("Invalid payment details. Please try again.");
                return;
            }

            await confirmPayment({paymentId, payerId, orderId, courseId});
        }

        handlePaymentReturn();
    }, [searchParams, navigate])

  return (
    <div className='w-full h-screen flex justify-center items-center text-3xl font-semibold'>
        <p className="text-xl font-semibold">{status}</p>
    </div>
  )
}

export default PaymentReturnPage