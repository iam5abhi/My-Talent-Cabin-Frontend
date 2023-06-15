import React,{useState,useEffect} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ToastError, ToastSucess } from '../../../features/DisplayMessage';
import {Field, Form, Formik } from 'formik';
import { authFetch } from '../../../Middleware/axios/intance';
import validationSchema from './RegisterValidation'
import {encode as base64_encode} from 'base-64';


const CompanyRegister = () =>{
  const navigate=useNavigate()
  const [btndisabled,setBtnDisable]=useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword,setShowPassword]=useState(false)
  const [showConfirmpassowrd,setShowConfirmpassowrd]=useState(false)

const eye_Password=()=>{
  if(!showPassword){
    setShowPassword(true)
  }else{
    setShowPassword(false)
  }
}
const eye_Confirmpassowrd=()=>{
  if(!showConfirmpassowrd){
    setShowConfirmpassowrd(true)
  }else{
    setShowConfirmpassowrd(false)
  }
}
useEffect(() => {
  let login = window.localStorage.getItem('company-token');
  if(login){
    navigate(`/auth/company`)
  }
})
return (
  <>
   {/* ------------------------------------registeration form */}
  <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div className="w-full max-w-md space-y-8">
    <div>
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Register</h2>
    </div>
      <Formik
      initialValues={{ name:'', email:'', PhoneNumber:'',  password:'',confirmPassword: '' }}
      validationSchema={validationSchema}
      onSubmit={async(values) => {
        let encodedPassword = base64_encode(values.password);
        let encodedconfirmpass = base64_encode(values.confirmPassword);
        try {
          const res = await authFetch.post("/company/signup",{
            name:values.name,
            email:values.email,
            PhoneNumber:values.PhoneNumber,
            password:encodedPassword,
            confirmPassword:encodedconfirmpass,
          });
          ToastSucess(res.data.message);
          setTimeout(() => {
            setIsLoading(true)
            setBtnDisable(true)
            navigate('/company-login')
          },3000);
          }catch (err) {
            setIsLoading(true)
            setBtnDisable(true)
            setTimeout(() => {
              setIsLoading(false)
              setBtnDisable(false)
            },3000);
            ToastError(err.response.data.message);
          }
      }}
      >
      {({ errors, touched }) => (
      <Form className="mt-8 space-y-4 ">
      <div className="mt-8 space-y-4 rounded-md shadow-sm">
        <div>
          <label htmlFor="name" className="sr-only">First Name</label>
          <Field id="name" name='name' type="text" autoComplete="off" 
            className={`relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${!errors.name ? " " : "border-red-500"}`} 
            placeholder="Name" />
            {errors.name && touched.name ? (
            <div className='text-red-700 text-xs font-bold'>{errors.name}</div>
            ) : null}
        </div>
        <div>
          <label htmlFor="email-address" className="sr-only">Email address</label>
          <Field id="email-address" name="email" type="email" style={{textTransform:'lowercase'}} autoComplete="email" className={`relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${!errors.email ? " " : "border-red-500"}`} 
           placeholder="Email address" />
          {errors.email && touched.email ? (
            <div className='text-red-700 text-xs font-bold'>{errors.email}</div>
            ) : null}
        </div>
        <div>
          <label htmlFor="PhoneNumber" className="sr-only">Phone Number</label>
          <Field id="PhoneNumber" name="PhoneNumber" type="text" maxLength="10" autoComplete="off" className={`relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${!errors.PhoneNumber ? " " : "border-red-500"}`} 
           placeholder="Phone Number" />
          {errors.PhoneNumber && touched.PhoneNumber ? (
            <div className='text-red-700 text-xs font-bold'>{errors.PhoneNumber}</div>
            ) : null}
        </div>
        <div className='password-eye'>
          <label htmlFor="password" className="sr-only">Password</label>
          <Field id="password" name="password" type={!showPassword ? "password" : "text"}  autoComplete="current-password" className={`relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${!errors.password ? " " : "border-red-500"}`} 
           placeholder="Password" />
           <span className="flex justify-end">{!showPassword ? <i onClick={eye_Password} className="fa-sharp fa-solid fa-eye-slash"></i> : <i onClick={eye_Password} className="fa-solid fa-eye"></i>}</span>
          {errors.password && touched.password ? (
            <div className='text-red-700 text-xs font-bold'>{errors.password}</div>
            ) : null}
        </div>
        <div className='password-eye'>
          <label htmlFor="password" className="sr-only">Confirm Password</label>
          <Field id="confirm-password" name="confirmPassword"  type={!showConfirmpassowrd ? "password" : "text"} autoComplete="current-password" className={`relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${!errors.confirmpassword ? " " : "border-red-500"}`}
           placeholder="Confrm Password" />
           <span className="flex justify-end">{!showConfirmpassowrd ? <i onClick={eye_Confirmpassowrd} className="fa-sharp fa-solid fa-eye-slash"></i> : <i onClick={eye_Confirmpassowrd} className="fa-solid fa-eye"></i>}</span>
          {errors.confirmPassword && touched.confirmPassword ? (
            <div className='text-red-700 text-xs font-bold'>{errors.confirmPassword}</div>
            ) : null}
        </div>
      </div>
      <br />
      <div>
        <button type="submit" disabled={btndisabled} className="group relative flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        {isLoading ? 'Loading...' : <> Register </>}
        </button>
        <ToastContainer />
      </div>
      <div className="flex items-center justify-center">
      <div className="text-sm">
        Allready have a account?&nbsp;<NavLink to="/company-login" className="font-medium text-black hover:text-gray-600">Login</NavLink>
      </div>
    </div>
    </Form>
     )}
    </Formik>
  </div>
</div>
</>
)
}
export default CompanyRegister
