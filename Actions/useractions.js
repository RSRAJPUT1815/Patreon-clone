"use server"
import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDB from "@/db/connectdb"
import User from "@/models/User"




export const initiate = async (amount, to_username, paymentform) => {
    await connectDB()
    let user = await User.findOne({username:to_username})
    const secret = user.razorpaysecret
    
    var instance = new Razorpay({
        key_id: user.razorpayid,
        key_secret: secret,
    })

    instance.orders.create({
        amount: amount * 100,
        currency: "INR",
        receipt: "receipt#1",
        notes: {
            key: "value3",
            key2: "value2",
        }
    })
    let option = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }
    let x = await instance.orders.create(option)

    //create a payment object which shows a panding payment in the database
    await Payment.create({
        order_id: x.id,
        amount: amount,
        to_user: to_username,
        name: paymentform.name,
        massage: paymentform.massage,
        status: "pending",
    })
    return x
}



export const fetchUser = async (username) => {
    await connectDB()
    let u = await User.findOne({ username: username })
    if (!u) return null
    
    let user = u.toObject({ flattenObjectIds: true })
    return user

}


export const fetchPayment = async (username) => {
    await connectDB()
    // find all payments sorted by decreasing order of amount flatten object ids
    let payments = await Payment.find({ to_user: username, done: true })
        .sort({ amount: -1 })
        .limit(5)
        .lean()
    
    return payments
}

export const updateprofile = async (data, oldusername) => {
    await connectDB()
    let ndata = Object.fromEntries(data)
    //if username is being updated , check if username is available
    if (ndata.username != oldusername) {
        let ou = await User.findOne({ username: ndata.username })
        if (ou) {
            return { message: "Username already taken" }
        }

        await User.updateOne({ email: ndata.email }, ndata)
        //now update the username in all the payments table
        await Payment.updateMany({ to_user: oldusername }, { to_user: ndata.username })

    }
    else{

        
        await User.updateOne({email: ndata.email}, ndata)
    }


}


