import React, { useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios'
import BaseUrl from '../../config/BaseUrl';
import { ToastContainer } from 'react-toastify';
import {ToastSucess,ToastError} from '../../Feature/DisplayMessage'


const OtpPage = () => {
    const {id,date,time,number} = useParams()
    const navigate = useNavigate()
    const [otp,setOtp]=useState()


    const OtpSubmit = async ()=>{
        // axios({
        //   method: 'post',
        //   url: `${BaseUrl.url}/patient/api/verify/otp?PhoneNumber=${number}`,
        //   headers:{
        //     'Authorization':`Bearer ${Token()}`
        //   },
        //   data:{
        //     doctorId:id,
        //     slotTime:time,
        //     startDate:date,
        //     otp:otp,
        //   }
        // }).then((res)=>{
        //   navigate('/booking-confirm')
        //   ToastSucess(res.data.message);
        // })
        // .catch((err)=>{
        //   console.log(err,"err")
        //   ToastError(err.response.data.message);
        // })
        try {
            const res = await authFetch.post('/student/login', {
              email:values.email,
              password:encodedPassword
            });
            localStorage.setItem('token', res.data.token, true)
            ToastSucess(res.data.message)
            setTimeout(() => {
              navigate('/auth/student')
            }, 2000);
          } catch (error) {
            ToastError(error.data.message)
          }
      }

      const OtpResend =async()=>{
        try {
            const res = await authFetch(`/patient/api/resend/otp?PhoneNumber=${number}`, {
              email:values.email,
              password:encodedPassword
            });
            ToastSucess(res.data.message)
          } catch (error) {
            ToastError(error.data.message)
          }
      }

  return (
    <>
    <div className="h-screen bg-blue-100 py-20 px-3">
        <div className="container mx-auto">
         <div className="max-w-sm mx-auto md:max-w-lg">
            <div className="w-full">
            <div className="bg-white h-71 py-3 rounded-lg text-center shadow-sm">
                <h1 className="text-2xl font-bold">OTP Verification</h1>
                <div className="flex flex-col mt-4">
                <span>We have sent you an OTP on</span>
                <span className="font-bold">+91 *******{number.slice(7)}</span>
                </div>
                <div id="otp" className="flex flex-row justify-center text-center px-2 mt-5">
                <label>OTP<br/>
                <input onChange={(e)=>setOtp(e.target.value)} className="m-2 border border-t-0 border-l-0 border-r-0 border-b-1 h-10 w-100 text-center focus:border-slate-500 focus:ring-0" type="text" placeholder='Please enter 4 digit OTP here' />
                </label></div>
                <div className="flex justify-center text-center mt-5 ">
                <button type="button" onClick={OtpSubmit} className="px-3 py-1 md:px-20 md:py-2 ml-2 rounded-full focus:outline-none text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium  text-lg  mr-2 mb-2 dark:focus:ring-blue-700 button-tag-property">
                Continue to booking</button>
                </div>
                <div className="flex justify-center text-center mt-1">
                <button onClick={OtpResend} className="flex items-center text-blue-600 hover:text-blue-700 cursor-pointer"><span className="font-bold text-sm ">Resend OTP</span><i className="bx bx-caret-right ml-1" /></button>
                </div>
            </div>
            </div>
         </div>
        </div>
    </div>
    <ToastContainer />
    </>
  )
}

export default OtpPage;