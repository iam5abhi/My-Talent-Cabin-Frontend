import React from 'react';
import { Breathing } from 'react-shimmer'
import { Route,Routes,Navigate} from 'react-router-dom';
import StudentHome from '../../Pages/Student/StudentHome';
import PrivateRoute from '../../Middleware/Private Route/PrivateRoute'
import Header from '../../Layouts/Header/Header';
import Footer from '../../Layouts/Footer/Footer';
import ViewProfile from '../../Pages/Student/profile/ViewProfile';
import ChangePassword from '../../Pages/Change-Password/ChangePassword';

const StudentRouting = () => {

    const Student = [
        {
            path: '/',
            component: StudentHome,
        },
        {
          path: 'profile',
          component: ViewProfile,
      },{
        path: 'change-password',
        component: ChangePassword,
    }, 
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
            <Route path="*" element={ < Navigate to="/auth/student" />} ></Route>
        </Routes>
        <Footer/>
    </>
  )
}

export default StudentRouting