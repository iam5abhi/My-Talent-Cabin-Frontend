import React, { useState } from 'react';
import { AdminToken } from '../../../features/Token';
import AdminHeader from '../../../Layouts/Header/AdminHeader';
// import jwt_decode from "jwt-decode";
// import { GetRequset } from '../../Feature/Axios';
// import { ToastError } from '../../Feature/DisplayMessage';


const Home = () => {
  // const [studentData,setStudentData]=useState()
  // const [hrsData,setHrsData]=useState()

  // const GetStudentData =()=> {
  //   GetRequset('user/accounts/getAlluser')
  //   .then((res)=>{ setStudentData(res.data.candidate); })
  //   .catch((err)=>{ ToastError(err.message) })
  // }

  // const GetHrsData =()=> {
  //   GetRequset('company/accounts/api/v1/all-company-registerd-data')
  //   .then((res)=>{ setHrsData(res.data.data) })
  //   .catch((err)=>{ ToastError(err.message) })
  // }

  // if (AuthToken()) {
  //   let decoded = jwt_decode(AuthToken());
  //   const expirationTime = (decoded.exp * 1000) - 60000
  //   if (Date.now() >= expirationTime) {
  //     localStorage.clear();
  //     window.location.reload()
  //   }}
  
  // React.useEffect(()=>{
  //   GetStudentData();
  //   GetHrsData();
  // },[])

  return (
        <>
        <div className='container mt-10'>
        <div className='flex justify-around text-lg gap-20 px-10 ml-14'>
              <div className='bg-stone-100 px-6 w-full border border-stone-100 py-8 font-semibold flex justify-around gap-12 rounded shadow-2xl'>
                <span><i className="fa-sharp fa-solid fa-user-graduate fa-5x text-cyan-400"></i></span>
              <div>
                  <h1 className='mb-4 text-gray-600'>Student's</h1>
                  {/* <p className='text-cyan-400'>{!studentData?null:studentData.length}</p> */}
                  <p className='text-cyan-400'>hello</p>

              </div>
              </div>
              <div className='bg-stone-100 px-6 w-full border border-stone-100 py-8 font-semibold flex justify-around gap-12 rounded shadow-2xl'>
                <span><i className="fa-solid fa-users fa-5x text-cyan-400"></i></span>
              <div>
                  <h1 className='mb-4 text-gray-600'>Hr's</h1>
                  <p className='text-cyan-400'>Hr's</p>
                  {/* <p className='text-cyan-400'>{!hrsData?null:hrsData.length} </p> */}
              </div>
              </div>
          </div></div>
    </>
  )
}

export default Home;