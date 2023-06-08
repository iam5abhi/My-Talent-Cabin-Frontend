import * as yup from 'yup';
const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .required('Email is required')
      .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Invalid Email Format"),
    password: yup
      .string('Enter your password')
      .required('Password is required'),
});

export default validationSchema
