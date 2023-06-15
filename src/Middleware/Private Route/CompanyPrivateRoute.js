import React from "react";
import { Navigate } from "react-router-dom";
import {CompanyToken} from '../../features/Token'
const CompanyPrivateRoute =({children})=>{
     return CompanyToken() ? children:<Navigate to='/company-login'/>
}
export default CompanyPrivateRoute