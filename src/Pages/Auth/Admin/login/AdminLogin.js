import React, { useState, useEffect } from 'react'
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { ToastContainer } from 'react-toastify';
import { AdminToken } from "../../../../features/Token"
import { authFetch } from '../../../../Middleware/axios/intance';
import { useNavigate } from 'react-router-dom';
import { ToastError, ToastSucess } from '../../../../features/DisplayMessage';
import validationSchema from '../../login/loginValidation';


const AdminLogin = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const eye_Password = () => {
    if (!showPassword) {
      setShowPassword(true)
    } else {
      setShowPassword(false)
    }
  }

  useEffect(() => {
    if (AdminToken()) {
      navigate('/auth/admin')
    }
  }, [AdminToken()])

  return (
    <>
      <div className="min-w-screen min-h-screen bg-gray-300 flex items-center justify-center">
        <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-96 h-80 overflow-hidden" style={{ maxWidth: 1000 }}>
          <div className="md:px-5">
            <div className="text-center mb-4 mt-4">
              <h3 className="customFont mb-1 text-2xl sm:text-3xl leading-normal font-bold tracking-tight text-gray-900 " >
                Admin Login
              </h3>
            </div>
            <div>
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                  try {
                    const res = await authFetch.post('/admin/login', values);
                    localStorage.setItem('admin-token', res.data.token, true)
                    ToastSucess(res.data.message)
                    setTimeout(() => {
                      navigate('/auth/admin')
                    }, 2000);
                  } catch (error) {
                    ToastError(error.data.message)
                  }
                }}>
                {({ errors }) => (
                  <Form>
                    <div className="flex -mx-3">
                      <div className="w-full px-3">
                        <label htmlFor="email" className="customFont mb-1 block text-sm font-medium text-black ">
                          Username
                        </label>
                        <div className="flex eyeButton ">
                          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg" /></div>
                          <Field type="text" name="email" className={`w-full -ml-10 pl-2 pr-3 py-2 text-sm rounded-lg border-2 border-gray-200 outline-none focus:border-blue-600 emailcase ${!errors.email ? " " : "border-red-500"}`}
                            placeholder="Enter Username" />{!errors.email ? '' : <span><i className="fa-solid fa-circle-exclamation text-red-500"></i></span>}
                        </div>
                        &nbsp; <ErrorMessage name="email" component="Field" className="text-red-500 font-bold text-xs" />
                      </div>
                    </div>
                    <div className="flex -mx-3">
                      <div className="w-full px-3">
                        <label htmlFor="date" className="customFont mb-1 block text-sm font-medium text-black ">
                          Password
                        </label>
                        <div className="flex eyeButton">
                          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg" /></div>
                          <Field type={!showPassword ? "password" : "text"} name="password" className={`w-full -ml-10 pl-2 pr-3 py-2 text-sm rounded-lg border-2 border-gray-200 outline-none focus:border-blue-600 ${!errors.password ? " " : "border-red-500"}`} placeholder="************" />
                          {!errors.password ? <span className="flex justify-end">{!showPassword ? <i onClick={eye_Password} className="fa-sharp fa-solid fa-eye-slash"></i> : <i onClick={eye_Password} className="fa-solid fa-eye"></i>}</span> : <span><i className="fa-solid fa-circle-exclamation text-red-500"></i></span>}
                        </div>
                        &nbsp; <ErrorMessage name="password" component="Field" className="text-red-500 font-bold text-xs" />
                      </div>
                    </div>
                    <div className="text-center mb-5 mt-2">
                      <button type='submit' className=" block w-full max-w-xs mx-auto bg-gray-800 hover:bg-gray-700 focus:bg-gray-900 text-white text-sm rounded-lg px-3 py-3 font-semibold">Login
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default AdminLogin;
