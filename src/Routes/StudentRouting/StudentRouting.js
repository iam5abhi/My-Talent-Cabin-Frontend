import React from 'react';
import { Breathing } from 'react-shimmer'
import { Route,Routes,Navigate} from 'react-router-dom';
import StudentHome from '../../Pages/Student/StudentHome';
import PrivateRoute from '../../Middleware/Private Route/PrivateRoute'
import Header from '../../Layouts/Header/Header';
import Footer from '../../Layouts/Footer/Footer';
import ViewProfile from '../../Pages/Student/profile/ViewProfile';
import ChangePassword from '../../Pages/Change-Password/ChangePassword';
import Requirement from '../../Pages/Student/Requirement/Requirement';
import ViewRequirement from '../../Pages/Student/Requirement/ViewRequirement';
import PaymentSuccess from '../../Pages/Student/Payment/PaymentSuccess';
import PaymentCancel from '../../Pages/Student/Payment/PaymentCancel';
import Profile from '../../Pages/Student/profile/Profile';

const StudentRouting = () => {

    const Student = [
        {
          path: '/',
          component: StudentHome,
        },{
          path: 'profile',
          component: ViewProfile,
        },{
          path: 'change-password',
          component: ChangePassword,
        },{
          path: 'payment-success',
          component: PaymentSuccess,
        },{
          path: 'payment-failed',
          component: PaymentCancel,
        }  
    ]

  return (
        <>
        <Header/>
        <Routes>
            {
              Student.map((route) => {
                return <Route
                path={route.path}
                element={<React.Suspense fallback={<><Breathing width={1200} height={1000} /></>}>
                <PrivateRoute> <route.component/> </PrivateRoute> </React.Suspense>}/>
              })
            }
            <Route path="view-profile/:id" element={<React.Suspense fallback={<><Breathing width={1200} height={1000} />
            </>}><Profile /></React.Suspense>}/>
            <Route path="internship" element={<React.Suspense fallback={<><Breathing width={1200} height={1000} />
            </>}><Requirement /></React.Suspense>}/>
            <Route path="view-internship/:id" element={<React.Suspense fallback={<><Breathing width={1200} height={1000} />
            </>}><ViewRequirement /></React.Suspense>}/>
            <Route path="*" element={ < Navigate to="/auth/student" />} ></Route>
        </Routes>
        <Footer/>
    </>
  )
}

export default StudentRouting