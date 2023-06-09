import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './Pages/Home/Home';
import AdminRouting from './Routes/AdminRouting/AdminRouting';
import StudentRouting from './Routes/StudentRouting/StudentRouting';
import Register from './Pages/Auth/register/Register'
import Login from './Pages/Auth/login/Login';
import Header from './Layouts/Header/Header';
import { Token } from './features/Token';
import jwtDecode from 'jwt-decode';
import { useLocation } from 'react-router-dom';
import ChangePassword from './Pages/Change-Password/ChangePassword';
import Footer from './Layouts/Footer/Footer';

const Main = () => {
  const location = useLocation()
  const [decode,setDecode]=useState()

  useEffect(()=>{
    if(Token()){
      let decode = jwtDecode(Token())
      setDecode(decode)
    }
  },[Token()])
  
  return (
    <>
      <div>{location.pathname.includes('/auth/admin')?null:
        <Header /> }</div>
      <Routes>
        <Route path="/" element={< Home />} />
        <Route path="/auth/admin/*" element={<AdminRouting />} />
        <Route path="/auth/student/*" element={<StudentRouting />} />
        {/* <Route path="/auth/enterprise/*" element={<EnterpriseRouting />} /> */}
        <Route path='/register' element={< Register />} />
        <Route path="login" element={< Login />} />
        <Route path="/change-password" element={<  ChangePassword />} />
       
        {!decode?null:decode.user.role=="student"?
          <Route path="*" element={ < Navigate to="/auth/student" />} ></Route>
          :decode.user.role=="mentor"?
          <Route path="*" element={ < Navigate to="/auth/mentor" />} ></Route>
          :decode.user.role=="campus"?
          <Route path="*" element={ < Navigate to="/auth/campus" />} ></Route>
          :decode.user.role=="enterprise"?
          <Route path="*" element={ < Navigate to="/auth/enterprise" />} ></Route>
          :null
        }
      </Routes>
      <div>{location.pathname.includes('/auth/admin')?null:
        <Footer />}</div>
    </>
  )
}

export default Main;