import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import AdminRouting from './Routes/AdminRouting/AdminRouting';
import StudentRouting from './Routes/StudentRouting/StudentRouting';
import Register from './Pages/Auth/register/Register'
import Login from './Pages/Auth/login/Login';
import ChangePassword from './Pages/Change-Password/ChangePassword';
import AdminLogin from './Pages/Auth/Admin/login/AdminLogin';
import CompanyLogin from './Pages/Auth/login/CompanyLogin';
import CompanyRegister from './Pages/Auth/register/CompanyRegister';
import CompanyRouting from './Routes/CompanyRouting/CompanyRouting';
import MentorRouting from './Routes/MentorRouting/MentorRouting';
import MentorLogin from './Pages/Auth/login/MentorLogin';
import MentorRegister from './Pages/Auth/register/MentorRegister';
import LoginWithOtp from './Pages/Auth/login/LoginWithOtp';

const Main = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={< Home />} />
        <Route path='/register' element={< Register />} />
        {/* <Route path="login" element={< Login />} /> */}
        <Route path="login" element={< LoginWithOtp />} /> {/* path name "login-withotp" */} 
        <Route path="/change-password" element={< ChangePassword />} />
        <Route path="/auth/admin/login" element={<AdminLogin />} />
        <Route path='/company-register' element={< CompanyRegister />} />
        <Route path="/company-login" element={< CompanyLogin />} />
        <Route path='/mentor-register' element={< MentorRegister />} />
        <Route path="/mentor-login" element={< MentorLogin />} />
        <Route path="/auth/admin/*" element={<AdminRouting />} />
        <Route path="/auth/student/*" element={<StudentRouting />} />
        <Route path="/auth/company/*" element={<CompanyRouting />} />
        <Route path="/auth/mentor/*" element={<MentorRouting />} />
      </Routes>
    </>
  )
}

export default Main;