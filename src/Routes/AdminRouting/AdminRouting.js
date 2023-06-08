import React from 'react';
import {Navigate, Route,Routes,} from 'react-router-dom'
import AdminLogin from '../../Pages/Auth/Admin/login/AdminLogin';
import AdminPrivateRoute from '../../Middleware/Private Route/AdminPrivateRoute'
import { Breathing } from 'react-shimmer'

const ViewJob = React.lazy(() => import('../../Components/Admin/Jobs/ViewJob'));
const Home =React.lazy(() => import('../../Pages/Admin/Home/Home'));
const StudentList =React.lazy(() => import('../../Pages/Admin/Students/StudentList'));
const HrsList =React.lazy(() => import('../../Pages/Admin/hrs/HrsList')); 
const JobView =React.lazy(() => import('../../Components/Admin/Jobs/JobView')); 
const Category=React.lazy(() => import('../../Components/Admin/Category/Category')); 
const Projects=React.lazy(() => import('../../Pages/Admin/Internship/Projects'));  
const UploadProject=React.lazy(() => import('../../Pages/Admin/Internship/UploadProject'));  
const EditProject=React.lazy(() => import('../../Pages/Admin/Internship/EditProject'));


const AdminRouting = () => {

  const adminroutes =[
    {
      path: 'edit-internship/:id',
      component: EditProject,
    },
    {
      path: 'add-internship',
      component: UploadProject,
    },
    {
      path:'internship',
      component:Projects
    },
    {
      path:'category',
      component:Category
    },
    {
      path:'view/:id',
      component:ViewJob
    },
    {
      path:'job-view',
      component:JobView
    },
    {
      path:'hrslist',
      component:HrsList
    },
    {
      path:'students',
      component:StudentList
    },
    {
      path:'/',
      component:Home
    } 
  ]

  return (
        <>
            <Routes>
                <Route path="login" element={ < AdminLogin />} />
                {
                  adminroutes.map((route) => (
                    <Route
                    path={route.path}
                    element={<React.Suspense fallback={<><Breathing width={1200} height={1000} /></>}>
                    <AdminPrivateRoute> <route.component/> </AdminPrivateRoute> </React.Suspense>}/>
                ))
                }  
                <Route path="*" element={ < Navigate to="/auth/admin" />} ></Route>
            </Routes>
    </>
  )
}

export default AdminRouting;