import React from 'react';
import { Breathing } from 'react-shimmer'
import { Route,Routes,Navigate} from 'react-router-dom';
import EnterpricessHome from '../../Pages/Enterpricess/EnterpricessHome';
import PrivateRoute from '../../Middleware/Private Route/PrivateRoute'
import EnterpricessUploadProject from "../../Pages/Enterpricess/Enterpricess Upload Project/EnterpricessUploadProject"
import Project from '../../Components/Enterprises/projects/Projects';
import Enterpricess_Profile from '../../Pages/Enterpricess/Profile';
import AcceptedProjects from '../../Components/Enterprises/projects/AcceptedProject';
import Requirement from '../../Pages/Enterpricess/Requirement/Requirement';

const EnterpriseRouting = () => {

  const enterprise = [
    {
        path: '/',
        component: EnterpricessHome,
    },
    {
        path: 'upload-project',
        component: EnterpricessUploadProject,
    },
    {
        path: 'projects',
        component: Project,
    },
    {
        path: 'profile/*',
        component:Enterpricess_Profile,
    },
    {
        path: 'my-projects',
        component:AcceptedProjects,
    },
    {
      path: 'requirement',
      component:Requirement,
  }, 
]

  return (
        <>
        <Routes>
          {
            enterprise.map((route) => (
              <Route
              path={route.path}
              element={<React.Suspense fallback={<><Breathing width={1200} height={1000} /></>}>
              <PrivateRoute> <route.component/> </PrivateRoute> </React.Suspense>}/>
          ))
          } 
        </Routes>
    </>
  )
}

export default EnterpriseRouting