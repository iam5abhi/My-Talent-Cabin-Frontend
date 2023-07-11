import React, { useState,useEffect } from 'react' 
import {Field, Form, Formik } from 'formik';
import {encode as base64_encode} from 'base-64';
import { ToastContainer } from 'react-toastify';
import '../../../App.css';
import { NavLink,useNavigate } from 'react-router-dom';
import { authFetch } from '../../../Middleware/axios/Interceptors';
import { ToastError,ToastSucess } from '../../../features/DisplayMessage';


const LoginWithOtp = () =>{
  const navigate=useNavigate()
  const [formData,setFormData]=useState(null)
  const generate_otp = window.localStorage.getItem("generate_otp")
  let phoneNumber = JSON.parse(generate_otp)
  
  const LoginSubmit =async(event)=>{
    event.preventDefault()
    try {
      const res = await authFetch.post('/student/login-with-otp',{PhoneNumber:formData})
      localStorage.setItem('generate_otp',JSON.stringify(res), true) 
      setFormData("")
      ToastSucess(res.data.message)
      setTimeout(() => {
        navigate('/login')
      }, 2000);
    } catch (error) {
      ToastError(error.data.message)
    }
  }

  const VerfiyOtpSubmit =async(event)=>{
    event.preventDefault()
    try {
      const res = await authFetch.patch(`/student/verify-otp?PhoneNumber=${phoneNumber.data.PhoneNumber}`,{otp:formData})
      localStorage.removeItem('generate_otp')
      localStorage.setItem('token', res.data.token, true)
      ToastSucess(res.data.message)
      setTimeout(() => {
        navigate('/auth/student')
      }, 2000);
    } catch (error) {
      ToastError(error)
    }
  }

  useEffect(() => {
    let login = localStorage.getItem('token');
    if(login){
      navigate(`/auth/student`)
    }
  })

return (
  <>
   {/* ------------------------------------registeration form */}
  <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div className="w-full max-w-md space-y-8">
    <div>
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Login</h2>
    </div>
      <form onSubmit={generate_otp?VerfiyOtpSubmit:LoginSubmit} className="mt-8 space-y-4 ">
      <div className="mt-8 space-y-4 rounded-md shadow-sm">
        <div>
          <label htmlFor="email-address" className="sr-only">Phone Number</label>
          <input id="email-address" value={formData} onChange={(event)=>setFormData(event.target.value)} type="number" style={{textTransform:'lowercase'}} autoComplete="off" 
          className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder={generate_otp?"Verify OTP":"Phone Number"} />
        </div>
      </div>
      <div>
        <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black-500 focus:ring-offset-2">
          { generate_otp?"Verify OTP":"Login" }
        </button>
        <ToastContainer />
      </div>
      { generate_otp?null:
        <div className="flex items-center justify-center">
          <div className="text-sm">
            Don't have account?&nbsp;<NavLink to="/register" className="font-medium text-black hover:text-gray-600">Register</NavLink>
          </div>
        </div>
      }
    </form>
  </div>
</div>
</>
)
}
export default LoginWithOtp
