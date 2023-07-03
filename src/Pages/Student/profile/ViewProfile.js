import React from 'react'
import Username_image from '../../../Components/Student/Profile/user information/Username_image'
import Language from '../../../Components/Student/Profile/Language/Language';
import Bio from '../../../Components/Student/Profile/Bio/Bio';
import Skill from '../../../Components/Student/Profile/Skill/Skill';
import Education from '../../../Components/Student/Profile/Education/Education';
import Experience_Certificate from '../../../Components/Student/Profile/Experience/Experience_Certificate';
import {useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import { authFetch } from '../../../Middleware/axios/Interceptors';
import { ToastError } from '../../../features/DisplayMessage';
import { ToastContainer } from 'react-toastify';
import Certificate from '../../../Components/Student/Profile/Certificate/Certificate';

const ViewProfile = () => {
  const token = window.localStorage.getItem('token')
  const navigate = useNavigate();
  const [getData,setGetData]=React.useState()

  const ProfileSubmit =async()=> {
    try {
      const res = await authFetch('/student');
      const profileData = res.data.reduce((acc, curr) => {
        acc["data"] = curr;
        return acc;
      }, {});
      setGetData(profileData.data)
      } catch (error) { ToastError(error.data.message) }
  }

  var jwtoken = window.localStorage.getItem('token');
  if (jwtoken) {
  var decoded = jwt_decode(jwtoken);
  if (decoded.exp * 1000 < Date.now()) {
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('id')
      navigate('/login')
  }}

  React.useEffect(()=>{
    ProfileSubmit();
  },[window.localStorage.getItem('token')])

  return (
    <>
    {!token?navigate('/login'):
    <div className="bg-blue-100 py-8">
    {/* <!-----------------------HEADER-->
    
    <!--------------------------profile--> */}
    <Username_image data={getData} ProfileSubmit={ProfileSubmit} />
  <div>
    <div className="container w-11/15 mx-auto p-4 mt-4 border border-slate-300 bg-white rounded ">
    <div className=" grid grid-cols-3 gap-4 border-r">
    <Language data={getData?getData.language:null} ProfileSubmit={ProfileSubmit} />
    <Bio data={getData?getData.bio:null} ProfileSubmit={ProfileSubmit} />
    </div>
      <br />
      {/*------------------------------------------------------------ROW1*/}
      {/*------------------------------------------------------------ROW2*/}
      <div className=" grid grid-cols-3 gap-4 border-r">
      <Skill data={getData?getData.myskill:null} ProfileSubmit={ProfileSubmit} />
      <Education data={getData?getData.education:null} ProfileSubmit={ProfileSubmit} />
      </div>
      <hr />
      <br />
      <br />
    </div>
      {/*------------------------------------------------------------ROW2*/}
      {/*------------------------------------------------------------ROW3*/}
      <div className="container w-11/15 mx-auto p-4 mt-4 border border-slate-300 bg-white rounded "> 
        <Experience_Certificate data={getData?getData.experience:null} ProfileSubmit={ProfileSubmit} />
      </div>
      <div className="container w-11/15 mx-auto p-4 mt-4 border border-slate-300 bg-white rounded "> 
        <Certificate data={getData?getData:null} />
      </div>
  </div>
    {/* <!-----------------------------------Experience--> */}
  </div>
  }   
  <ToastContainer />
    </>
  )
}
export default ViewProfile
