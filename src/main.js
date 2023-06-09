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
import AdminHeader from './Layouts/Header/AdminHeader';
import AdminLogin from './Pages/Auth/Admin/login/AdminLogin';
import Test from './TestHandler/Test';

const Main = () => {
  const location = useLocation()
  const [decode, setDecode] = useState()

  useEffect(() => {
    if (Token()) {
      let decode = jwtDecode(Token())
      setDecode(decode)
    }
  }, [Token()])

  return (
    <>
      <Routes>
        <Route path="/" element={< Home />} />
        <Route path='/register' element={< Register />} />
        <Route path="login" element={< Login />} />
        <Route path="/change-password" element={<  ChangePassword />} />
        <Route path="/auth/admin/login" element={<AdminLogin />} />
        <Route path="/auth/admin/*" element={<AdminRouting />} />
        <Route path="/auth/student/*" element={<StudentRouting />} />
        <Route path="/Test" element={<Test />} />
      </Routes>
    </>
  )
}

export default Main;