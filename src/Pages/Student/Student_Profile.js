import React,{useEffect, useState} from 'react';
import { authFetch } from '../../Middleware/axios/intance';
import { Route,Routes,useNavigate,useLocation} from 'react-router-dom';
import StudentPrivateRoute from '../../Middleware/Private Route/PrivateRoute';
import { Breathing } from 'react-shimmer';
import CompleteProject from '../../Components/Student/Student_profile/New_Profile/CompleteProject'
import PersonalInformation from '../../Components/Student/Student_profile/New_Profile/PersonalInformation';
import Education from "../../Components/Student/Student_profile/New_Profile/Education"; 
import Specialization from "../../Components/Student/Student_profile/New_Profile/Specialization"; 
import Sidebar from "../../Components/Student/Student_profile/New_Profile/Sidebar"
import ProfilePicture from '../../Components/Student/Student_profile/New_Profile/ProfilePicture';

const Student_Profile = () => {
    const loction = useLocation()
    const navigate = useNavigate()
    const [profileData,setProfileData]=useState()


    const GetProfileDatas = async ()=>{
        try {
        const resp = await authFetch.get('/api/student/profile');
        setProfileData(resp.data.data)
        } catch (error) {
        console.log(error)
        }
    }

    useEffect(() => {
       if(loction.pathname=="/auth/student/profile"){
        navigate('profile-picture')
       }
    })

    useEffect(() => {
        GetProfileDatas()
     },[])
    
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
            <Sidebar profileData={profileData} />
            {/*---------right---------*/}
            {/* <Routes path="/auth/student/NewNav"> */}
            <Routes >
            <Route path='personal-information' element={<React.Suspense fallback={<><Breathing width={1200} height={1000} /></>}>
                        <StudentPrivateRoute>
                          <PersonalInformation Data={GetProfileDatas} />
                        </StudentPrivateRoute>
                  </React.Suspense>}/>
                  <Route path='education' element={<React.Suspense fallback={<><Breathing width={1200} height={1000} /></>}>
                        <StudentPrivateRoute>
                          <Education Data={GetProfileDatas} />
                        </StudentPrivateRoute>
                  </React.Suspense>}/>
                  <Route path='specialization' element={<React.Suspense fallback={<><Breathing width={1200} height={1000} /></>}>
                        <StudentPrivateRoute>
                          <Specialization Data={GetProfileDatas} />
                        </StudentPrivateRoute>
                  </React.Suspense>}/>
                  <Route path='profile-picture' element={<React.Suspense fallback={<><Breathing width={1200} height={1000} /></>}>
                        <StudentPrivateRoute>
                          <ProfilePicture Data={GetProfileDatas} />
                        </StudentPrivateRoute>
                  </React.Suspense>}/>
                  <Route path='achievements' element={<React.Suspense fallback={<><Breathing width={1200} height={1000} /></>}>
                        <StudentPrivateRoute>
                          <CompleteProject Data={GetProfileDatas} />
                        </StudentPrivateRoute>
                  </React.Suspense>}/>  
            </Routes>      
            {/*--------Right END-----------*/}
        </div>
        {/*-------------------------------------------3rd section*/}
            {/* < Copyright /> */}
        </div>
    </>
  )
}

export default Student_Profile;

