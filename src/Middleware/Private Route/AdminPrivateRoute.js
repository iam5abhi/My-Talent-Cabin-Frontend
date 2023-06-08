import React from "react";
import { Navigate } from "react-router-dom";
import {AdminToken} from '../../features/Token'
const AdminPrivateRoute =({children})=>{
     return AdminToken() ? children:<Navigate to='/auth/admin/login'/>
}
export default AdminPrivateRoute;