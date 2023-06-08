import React from 'react';
import { Breathing } from 'react-shimmer'
import { Route,Routes,Navigate} from 'react-router-dom';
import MentorHome from '../../Pages/Mentor/MentorHome';
import PrivateRoute from '../../Middleware/Private Route/PrivateRoute'
import MentorUploadProject from '../../Pages/Mentor/Mentor Upload Project/MentorUploadProject';
import Profile from '../../Pages/Mentor/Profile';
import Mentor_Request from '../../Pages/Mentor/Mentor_Request/Mentor_Request';
import AcceptedProject from '../../Pages/Mentor/Mentor_Request/AcceptedProject';
import MentorPublicProfile from '../../Pages/Mentor/Mentor_Request/MentorPublicProfile';
import ViewProjectDetail from '../../Pages/Mentor/Mentor Upload Project/ViewProjectDetail';
import AssignmentRequest from '../../Pages/Mentor/Assignment_Request/AssignmentRequest';

 const MentorRouting = () => {

 const Mentor = [
        {
            path: '/',
            component: MentorHome,
        },
        {
            path: 'upload-project',
            component: MentorUploadProject,
        },
        {
            path: 'profile/*',
            component: Profile,
        },
        {
            path: 'request',
            component:Mentor_Request,
        },
        {
            path: 'my-projects',
            component:AcceptedProject,
        },
        {
            path: 'assignment-request',
            component:AssignmentRequest,
        },
    ]

   return (
         <>
         <Routes>
            {
              Mentor.map((route) => (
                <Route
                path={route.path}
                element={<React.Suspense fallback={<><Breathing width={1200} height={1000} /></>}>
                <PrivateRoute> <route.component/> </PrivateRoute> </React.Suspense>}/>
            ))
            }    
            <Route path="view-profile/:id" element={<React.Suspense fallback={<><Breathing width={1200} height={1000} /></>}>
                    <MentorPublicProfile />
            </React.Suspense>}/>
            <Route path="view-project/:id" element={<React.Suspense fallback={<><Breathing width={1200} height={1000} /></>}>
                    <ViewProjectDetail />
            </React.Suspense>}/>
            <Route path="*" element={ < Navigate to="auth/mentor" />} ></Route>
         </Routes>
     </>
   )
 }

 export default MentorRouting

