import React,{useEffect} from 'react';
import { Route,Routes,useNavigate,useLocation} from 'react-router-dom';
import PrivateRoute from '../../../Middleware/Private Route/PrivateRoute';
import { Breathing } from 'react-shimmer';
import PersonalInformation from "../../../Components/Campus/Profile/PersonalInformation"; 
import Specialization from "../../../Components/Campus/Profile/Specialization"; 
import Sidebar from "../../../Components/Campus/Profile/Sidebar"
import ProfilePicture from '../../../Components/Campus/Profile/ProfilePicture'
const Profile = () => {
    const loction = useLocation()
    const navigate = useNavigate()
    
    useEffect(() => {
       if(loction.pathname=="/auth/campus/profile"){
        navigate('profile-picture')
       }
    })
    
  return (
        <>
        <div>
        {/*------------------------------------First Section*/}
        <div className="bg-white shadow-md p-4 w-[90%] mx-auto my-8 rounded">
            <h2 className="text-xl font-bold mb-4">Complete Your Profile</h2>
            <p>To successfully register your profile as an Expert and to you availablein search results:</p>
            <p>1. Profile needs to be at least 80% completed</p>
            <p>2. You have to complete at least one verification step (we prefer you verify a bank account).
            <a href="#" className="learn text-orange-500 font-medium">Learn Why</a>
            </p>
        </div>
        {/*---------------------------------------------------2nd main section*/}
        <div className="lg:flex gap-x-4 w-[90%] mx-auto">
            <Sidebar />
            {/*---------right---------*/}
            {/* <Routes path="/auth/student/NewNav"> */}
            <Routes >
            <Route path='campus-information' element={<React.Suspense fallback={<><Breathing width={1200} height={1000} /></>}>
                        <PrivateRoute>
                          <PersonalInformation />
                        </PrivateRoute>
                  </React.Suspense>}/>
                  <Route path='others' element={<React.Suspense fallback={<><Breathing width={1200} height={1000} /></>}>
                        <PrivateRoute>
                          <Specialization />
                        </PrivateRoute>
                  </React.Suspense>}/>
                  <Route path='profile-picture' element={<React.Suspense fallback={<><Breathing width={1200} height={1000} /></>}>
                        <PrivateRoute>
                          <ProfilePicture />
                        </PrivateRoute>
                  </React.Suspense>}/>
            </Routes>      
            {/*--------Right END-----------*/}
        </div>
        {/*-------------------------------------------3rd section*/}
        </div>
    </>
  )
}

export default Profile;