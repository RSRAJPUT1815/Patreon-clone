import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import connectDB from "@/db/connectdb";
import User from "@/models/User";



export const POST = async (req) => {
    await connectDB()
    let form = await req.formData()  
    const body = Object.fromEntries(form)

    // check if razorpayOrderId is present on the server
    let paymentOk = await Payment.findOne({ order_id: body.razorpay_order_id })
    if (!paymentOk) {
        return NextResponse.json({succes:false , message: "Invalid Order ID" })
    }
    //feach the secret of the user who is getting the payment
    let user = await User.findOne({username:paymentOk.to_user})
    const secret = user.razorpaysecret
    
    // check if the payment is verified
    let xy =  validatePaymentVerification({"order_id":body.razorpay_order_id, "payment_id": body.razorpay_payment_id}, body.razorpay_signature,secret)

    if(xy) {
        const Updatepayment = await Payment.findOneAndUpdate(
            { order_id: body.razorpay_order_id },
            { done: true },
            { new: true }

        )
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${Updatepayment.to_user}?payment=success`)
    }
    else {
        return NextResponse.json({succes:false , message: "Invalid Signature" }, { status: 400 })
}}




