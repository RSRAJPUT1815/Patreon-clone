"use client"

import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { useSession } from 'next-auth/react'
import { fetchData } from 'next-auth/client/_utils'
import { fetchUser, fetchPayment, initiate } from '@/Actions/useractions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify'
import { useRouter, useSearchParams } from 'next/navigation'




const Paymentpage = ({ username }) => {
    const [paymentform, setpaymentform] = useState({ name: "", massage: "", amount: "" })
    const [currentuser, setcurrentuser] = useState({})
    const [payments, setpayments] = useState([])
    const SearchParams= useSearchParams()
    const router = useRouter()

    useEffect(() => {
        getdata(username)
    }, [])
    useEffect(() => {
        if (SearchParams.get("paymentdone") == "true" ) {
            toast('Payment is done', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            
        }
        router.push(`/${username}`)
  
    }, [])
    


    const handleChange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }
    const getdata = async () => {
        let u = await fetchUser(username)
        setcurrentuser(u)
        let dbpayments = await fetchPayment(username)
        setpayments(dbpayments)

    }

    const pay = async (amount) => {
        //get the order id
        let a = await initiate(amount, username, paymentform)
        let order_id = a.id
        var options = {
            "key": currentuser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Get Me a Chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();


    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
            {/* Same as */}
            <ToastContainer />
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className='cover w-full relative' >
                <img className='object-cover w-full h-[220px] md:h-[350px]' src={currentuser.coverpic} alt="" />
                <div className='absolute -bottom-14 w-full flex justify-center items-center  rounded-xl '>
                    <img className='rounded-xl border border-white ' width={140} height={120} src={currentuser.profilpic} alt="" />
                </div>
            </div>
            <div className='info flex justify-center items-center my-24 flex-col gap-2'>
                <div className='font-bold text-3xl'>
                    {username}
                </div>
                <div className='text-slate-300'>
                   Lets help {username} to get a chai
                </div>
                <div className='text-slate-400'>
                    {payments.length} payments received .  ₹{payments.reduce((acc, curr) => acc + curr.amount, 0) / 100} rasied
                </div>
                <div className="payment flex w-[90%] md:w-[80%] gap-3 mt-11">
                    <div className="supporters w-1/2 bg-slate-900 md:p-10 rounded-lg text-white">
                        {/* show the supporters list */}
                        <h2 className="md:text-2xl font-bold my-5 ">Top 5 Supporters</h2>
                        <ul className='mx-5 text-lg'>
                            {payments.length == 0 && <li>No payments yet</li>}
                            {payments.map((p, index) => {
                                return <li className='my-3 overflow-hidden flex gap-2 items-center'>
                                    <img width={33} src="avatar.gif" alt="user-avtar" />
                                    <span className='text-[8px] md:text-xl'>

                                        {p.name} donated <span className='font-bold'>₹{p.amount / 100}</span>  with a massage "{p.massage}"
                                    </span>
                                </li>
                            })}


                        </ul>

                    </div>
                    <div className="makePayment w-1/2 bg-slate-900 md:p-10 rounded-lg text-white">
                        <h2 className="md:text-2xl font-bold my-5">Make a Payment</h2>
                        <div className="flex gap-2 flex-col">
                            {/* input for name and massage */}
                            <div>
                                <input onChange={handleChange} name='name' value={paymentform.name} type="text" className='w-full p-1.5 md:p-3  rounded-lg bg-slate-800' placeholder='Enter Name' />
                            </div>
                            <input onChange={handleChange} name='massage' value={paymentform.massage} type="text" className='w-full p-3 md:p-3 rounded-lg bg-slate-800' placeholder='Enter Massage' maxLength={50} />




                            <input onChange={handleChange} name='amount' value={paymentform.amount} type="number" className='w-full p-1.5 md:p-3  rounded-lg bg-slate-800 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ' placeholder='Enter Amount' />


                            <button onClick={() => pay(Number.parseInt(paymentform.amount * 100))} type="button" className="text-white  bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 md:px-6 py-1.5 md:py-2.5 text-center me-2 mb-2 disabled:bg-slate-600" disabled={paymentform.name.length < 3 || paymentform.massage.length < 2 || paymentform.amount.length < 1}>Pay</button>

                        </div>
                        <div className='flex flex-col md:flex-row gap-0.5 md:gap-2 md:mt-5'>
                            <button className='bg-slate-800 p-0.5 md:p-3 rounded-lg' onClick={() => pay(1000)}>Pay ₹10</button>
                            <button className='bg-slate-800 p-0.5 md:p-3 rounded-lg' onClick={() => pay(2000)}>Pay ₹20</button>
                            <button className='bg-slate-800 p-0.5 md:p-3 rounded-lg' onClick={() => pay(3000)}>Pay ₹30</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )


}

export default Paymentpage
