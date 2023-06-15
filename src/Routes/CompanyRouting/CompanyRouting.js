import React, { createContext } from 'react';
import { Breathing } from 'react-shimmer'
import { Route,Routes,Navigate} from 'react-router-dom';
import CompanyHome from '../../Pages/Company/CompanyHome';
import CompanyPrivateRoute from '../../Middleware/Private Route/CompanyPrivateRoute'
import CompanyHeader from '../../Layouts/Header/CompanyHeader'
import Profile from '../../Pages/Company/Profile';
import jwt_decode from "jwt-decode";
import { CompanyToken } from '../../features/Token';

export const MyContext= createContext()
const CompanyRouting = () => {
  const decode = jwt_decode(CompanyToken())
    const Company = [
        {
            path: '/',
            component: CompanyHome,
        },{
            path:'profile',
            component:Profile
        } 
    ]

  return (
        <>
        <MyContext.Provider value={decode.user}>
        <CompanyHeader />
         <Routes>
            {
              Company.map((route) => {
                return <Route
                path={route.path}
                element={<React.Suspense fallback={<><Breathing width={1200} height={1000} /></>}>
                <CompanyPrivateRoute> <route.component/> </CompanyPrivateRoute> </React.Suspense>}/>
              })
            }
            <Route path="*" element={ < Navigate to="/auth/company" />} ></Route>
        </Routes>
        </MyContext.Provider>
    </>
  )
}

export default CompanyRouting