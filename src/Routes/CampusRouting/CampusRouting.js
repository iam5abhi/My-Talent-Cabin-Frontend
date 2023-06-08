import React from 'react';
import { Breathing } from 'react-shimmer'
import { Route,Routes,Navigate} from 'react-router-dom';
import CampusHome from '../../Pages/Campus/CampusHome'
import PrivateRoute from '../../Middleware/Private Route/PrivateRoute'
import CompusPublicProfile from '../../Pages/Campus/CompusPublicProfile';
import AllStudent from '../../Pages/Campus/AllStudents';
import AllProjects from '../../Pages/Campus/AllProjects';
import Profile from '../../Pages/Campus/Profile/Profile';
import NoticeBoard from '../../Pages/Campus/Notice Board/NoticeBoard';
import ViewNoticeDetails from '../../Pages/Campus/View Notice/ViewNoticeDetails';

const CampusRouting = () => {
  return (
        <>
        <Routes>
            <Route index={true} element={<React.Suspense fallback={<><Breathing width={1200} height={1000} /></>}>
                <PrivateRoute>
                    <CampusHome />
                </PrivateRoute>
            </React.Suspense>}/>
            <Route path="view-profile/:id" element={<React.Suspense fallback={<><Breathing width={1200} height={1000} /></>}>
                    <CompusPublicProfile />
            </React.Suspense>}/>
            <Route path="students" element={<React.Suspense fallback={<><Breathing width={1200} height={1000} /></>}>
                <PrivateRoute>
                   <AllStudent />
                </PrivateRoute> 
            </React.Suspense>}/>
            <Route path="projects" element={<React.Suspense fallback={<><Breathing width={1200} height={1000} /></>}>
                <PrivateRoute>
                   <AllProjects />
                </PrivateRoute>  
            </React.Suspense>}/> 
            <Route path="Profile/*" element={<React.Suspense fallback={<><Breathing width={1200} height={1000} /></>}>
                <PrivateRoute>
                   <Profile />
                </PrivateRoute>
            </React.Suspense>}/> 
            <Route path="notice-board" element={<React.Suspense fallback={<><Breathing width={1200} height={1000} /></>}>
                <PrivateRoute>
                   <NoticeBoard />
                </PrivateRoute> 
            </React.Suspense>}/>
            <Route path="view-noticeboard/:id" element={<React.Suspense fallback={<><Breathing width={1200} height={1000} /></>}>
                <PrivateRoute>
                   <ViewNoticeDetails />
                </PrivateRoute>  
            </React.Suspense>}/>
            <Route path="*" element={ < Navigate to="/auth/campus" />} ></Route>
        </Routes>
    </>
  )
}

export default CampusRouting