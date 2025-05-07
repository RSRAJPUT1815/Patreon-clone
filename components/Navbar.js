"use client"
import React, { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'

const Navbar = () => {
    const [showDropdown, setshowDropdown] = useState(false)
    const { data: session } = useSession()
    // if (session) {
    //     return <>
    //         Signed in as {session.user.email} <br />
    //         <button onClick={() => signOut()}>Sign out</button>
    //     </>
    // }
    return (
        <nav className='bg-gray-900 text-white flex md:flex-row flex-col justify-between px-4 md:h-16 items-center'>
            <div >
                <Link className="logo font-bold text-lg flex justify-center items-center" href={"/"}>
                    <img className='invertimg' src="tea.gif" width={44} alt="" />
                    <span>Get me a chai</span>
                </Link>
            </div>
            <ul className='flex justify-between gap-4'>

                <div className='relative flex md:block items-center'>
                    {session && <> <button onClick={() => { setshowDropdown(!showDropdown) }} onBlur={() => {
                        setTimeout(() => {
                            setshowDropdown(false)
                        }, 300);
                    }} id="multiLevelDropdownButton" data-dropdown-toggle="multi-dropdown" className="text-white mx-2 md:mx-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 md:py-2.5 mb-1 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Welcome {session.user.email}<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>


                        <div id="multi-dropdown" className={`z-10 ${showDropdown ? "" : "hidden"} bg-white divide-y absolute left-[125px] divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}>
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="multiLevelDropdownButton">
                                <li>
                                    <Link href="/deshboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                                </li>

                                <li>
                                    <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your page</Link>
                                </li>
                                <li>
                                    <Link onClick={() => signOut()} href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
                                </li>
                            </ul>
                        </div></>}

                    {session && <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => { signOut() }}>Logout</button>}
                    {!session && <Link href={"/login"}>
                        <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" >Login</button></Link>}
                </div>
            </ul>
        </nav>
    )
}

export default Navbar
