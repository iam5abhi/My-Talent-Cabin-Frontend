import React, { createContext } from 'react';
import { Breathing } from 'react-shimmer'
import { Route,Routes,Navigate} from 'react-router-dom';
import MentorHome from '../../Pages/Mentor/MentorHome';
import MentorHeader from '../../Layouts/Header/MentorHeader'
import Profile from '../../Pages/Mentor/Profile';
import jwt_decode from "jwt-decode";
import { MentorToken } from '../../features/Token';
import MentorPrivateRoute from '../../Middleware/Private Route/MentorPrivateRoute';
import UploadInternship from '../../Pages/Mentor/Internship/UploadInternship';
import Internship from '../../Pages/Mentor/Internship/Internship';
import EditInternship from '../../Pages/Mentor/Internship/EditInternship';
import ViewProfile from '../../Pages/Mentor/ViewProfile';

export const MentorContext= createContext()
const MentorRouting = () => {
  const decode = jwt_decode(MentorToken())
    const Company = [
        {
            path: '/',
            component: MentorHome,
        },{
            path:'profile/*',
            component:Profile
        },{
          path:'internship',
          component:Internship
        },{
          path:'upload-internship',
          component:UploadInternship
        },{
          path:'edit-internship/:id',
          component:EditInternship
        }, 
    ]

  return (
        <>
        <MentorContext.Provider value={decode.user}>
        <MentorHeader />
         <Routes>
            {
              Company.map((route) => {
                return <Route
                path={route.path}
                element={<React.Suspense fallback={<><Breathing width={1200} height={1000} /></>}>
                <MentorPrivateRoute> <route.component/> </MentorPrivateRoute> </React.Suspense>}/>
              })
            }
            <Route path="view-profile/:id" element={<React.Suspense fallback={<><Breathing width={1200} height={1000} />
            </>}><ViewProfile /></React.Suspense>}/>
        </Routes>
        </MentorContext.Provider>
    </>
  )
}

export default MentorRouting