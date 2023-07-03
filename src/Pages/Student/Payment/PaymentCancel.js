import React from 'react'
import { NavLink } from 'react-router-dom'

const PaymentCancel = () => {
    return (
        <>
            <div className="py-20">
                <div className="bg-white p-6 md:mx-auto text-center">
                    <i className=" bg-red-100 rounded-full fa-solid fa-xmark text-red-600 w-14 h-14 mx-auto py-7 fa-2xl" ></i>
                    <div className="text-center">
                        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Failed!</h3>
                        <p className="text-red-600 my-2 font-bold"> Oops! Something went wrong.</p>
                        <p className="text-red-400" > While trying to reserve money from your account.</p>
                        <div className="py-10 text-center">
                            <NavLink to="/auth/student" className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                                GO BACK
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentCancel