import React,{useEffect} from 'react';
import { Route,Routes,useNavigate,useLocation} from 'react-router-dom';
import PrivateRoute from '../../Middleware/Private Route/PrivateRoute';
import { Breathing } from 'react-shimmer';
import PersonalInformation from "../../Components/Mentor/Profile/PersonalInformation"; 
import Education from "../../Components/Mentor/Profile/Education"; 
import Specialization from "../../Components/Mentor/Profile/Specialization"; 
import Copyright from "../../Components/Mentor/Profile/Copyright"
import Sidebar from "../../Components/Mentor/Profile/Sidebar"
import ProfilePicture from '../../Components/Mentor/Profile/ProfilePicture';

const Profile = () => {
    const loction = useLocation()
    const navigate = useNavigate()
    
    useEffect(() => {
       if(loction.pathname=="/auth/mentor/profile"){
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
            <Route path='personal-information' element={<React.Suspense fallback={<><Breathing width={1200} height={1000} /></>}>
                        <PrivateRoute>
                          <PersonalInformation />
                        </PrivateRoute>
                  </React.Suspense>}/>
                  <Route path='education' element={<React.Suspense fallback={<><Breathing width={1200} height={1000} /></>}>
                        <PrivateRoute>
                          <Education />
                        </PrivateRoute>
                  </React.Suspense>}/>
                  <Route path='specialization' element={<React.Suspense fallback={<><Breathing width={1200} height={1000} /></>}>
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