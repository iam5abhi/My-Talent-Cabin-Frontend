import React from 'react'
import Username_image from '../../Components/Mentor/Profile/user information/Username_image'
import Language from '../../Components/Mentor/Profile/Language/Language';
import Bio from '../../Components/Mentor/Profile/Bio/Bio';
import Skill from '../../Components/Mentor/Profile/Skill/Skill';
import Experience_Certificate from '../../Components/Mentor/Profile/Experience/Experience_Certificate';
import {useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import { authFetch } from '../../Middleware/axios/Interceptors';
import { ToastError } from '../../features/DisplayMessage';
import { ToastContainer } from 'react-toastify';

const Profile = () => {
  const token = window.localStorage.getItem('mentor-token')
  const navigate = useNavigate();
  const [getData,setGetData]=React.useState()

  const ProfileSubmit =async()=> {
    try {
      const res = await authFetch('/mentor');
      const profileData = res.data.reduce((acc, curr) => {
        acc["data"] = curr;
        return acc;
      }, {});
      setGetData(profileData.data)
      } catch (error) { ToastError(error.data.message) }
  }

  var jwtoken = window.localStorage.getItem('mentor-token');
  if (jwtoken) {
  var decoded = jwt_decode(jwtoken);
  if (decoded.exp * 1000 < Date.now()) {
      window.localStorage.removeItem('mentor-token')
      window.localStorage.removeItem('id')
      navigate('/login')
  }}

  React.useEffect(()=>{
    ProfileSubmit();
  },[window.localStorage.getItem('mentor-token')])

  return (
    <>
    {!token?navigate('/mentor-login'):
    <div className="bg-blue-100 py-8">
    {/* <!--------------------------profile-->  */}
    <Username_image data={getData} ProfileSubmit={ProfileSubmit} />
  <div>
    <div className="container w-11/15 mx-auto p-4 mt-4 border border-slate-300 bg-white rounded ">
    <div className=" grid grid-cols-3 gap-2 border-r">
    <Language data={getData?getData.language:null} ProfileSubmit={ProfileSubmit} />
    <Bio data={getData?getData.bio:null} ProfileSubmit={ProfileSubmit} />
    </div>
      <br />
      {/*------------------------------------------------------------ROW1*/}
      {/*------------------------------------------------------------ROW2*/}
      <div className=" grid grid-cols-3 gap-4 border-r">
      <Skill data={getData?getData.myskill:null} ProfileSubmit={ProfileSubmit} />
      <Experience_Certificate data={getData?getData.experience:null} ProfileSubmit={ProfileSubmit} />
      </div>
      <hr />
      <br />
      <br />
    </div>
  </div>
  </div>
  }   
  <ToastContainer />
    </>
  )
}
export default Profile
