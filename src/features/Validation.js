import * as yup from 'yup';


export const validationSchemas =()=>{
    return yup.object({
    name: yup
      .string('Enter Your First Name')
      .matches(/^[a-zA-Z ]{2,}$/,'Enter vaild first name')
      .required('Full Name is required'),
    email: yup
      .string('Enter your email')
      .required('Email is required')
      .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Invalid Email Format"),
    PhoneNumber: yup
    .number('Only Number Allowed')
    .required('Phone number is required'),
    password: yup
      .string('Enter your password')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"A minimum 8 characters password contains a combination of uppercase and lowercase letter and number are required.")
      .required('Password is required'),
    confirmpassword: yup
      .string('Enter your Confirm Password')
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  })
};

export const loginvalidationSchemas =()=>{
  return yup.object({
  email: yup
    .string('Enter your email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .required('Password is required'),
})
};