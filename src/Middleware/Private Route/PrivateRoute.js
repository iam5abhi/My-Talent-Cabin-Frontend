import React from "react";
import { Navigate } from "react-router-dom";
import {Token} from '../../features/Token'
const PrivateRoute =({children})=>{
     return Token() ? children:<Navigate to='/login'/>
}
export default PrivateRoute