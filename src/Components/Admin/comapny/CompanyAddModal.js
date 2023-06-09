import React from 'react';
import { useFormik } from 'formik';
import  {authFetch}  from "../../../Middleware/axios/Interceptors";
import RegisterComponents from '../../ComanRegisterComponents/RegisterComponents'
import { ToastError,ToastSucess } from '../../../features/DisplayMessage';


export default function CompanyAddModal({setOpen,open,GetMentorData}) {

  const formik = useFormik({
    initialValues: { city:'' },
    onSubmit : async values => {
      try {
        const resp = await authFetch.post('/admin/company',{name:values.name,email: values.email,
        phoneNumber:values.phoneNumber});
        ToastSucess(resp.data.message)
          setOpen(false)
          GetMentorData()
      } catch (error) { ToastError(error) }
  },
  });

  return (
    <RegisterComponents formik={formik} open={open} setOpen={setOpen} />
  )
}
