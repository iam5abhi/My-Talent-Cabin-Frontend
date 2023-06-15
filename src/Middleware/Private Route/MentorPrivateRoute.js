import React from "react";
import { Navigate } from "react-router-dom";
import {MentorToken} from '../../features/Token'
const MentorPrivateRoute =({children})=>{
     return MentorToken() ? children:<Navigate to='/mentor-login'/>
}
export default MentorPrivateRoute