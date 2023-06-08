import React from 'react';
import { Breathing } from 'react-shimmer'
import { Route,Routes,Navigate} from 'react-router-dom';
import StudentHome from '../../Pages/Student/StudentHome';
import PrivateRoute from '../../Middleware/Private Route/PrivateRoute'
import StudentProject from '../../Pages/Student/Student-Project/StudentProject';
import ProjectDetails from '../../Pages/Student/Student-Project/ProjectDetails';
import Student_Profile from '../../Pages/Student/Student_Profile';
import TestQuiz from '../../Pages/Student/Student-Project/TestQuiz';
import Quiz_Terms from '../../Pages/Student/Student-Project/Quiz_Terms';
import Myproject from '../../Pages/Student/Student-Project/Myproject';
import StudentPublicProfile from '../../Pages/Student/StudentPublicProfile';
import UploadAssignment from '../../Pages/Student/Student-Project/UploadAssignment';
import ViewRequirement from '../../Pages/Student/Requirement/ViewRequirement';

const StudentRouting = () => {

    const Student = [
        {
            path: '/',
            component: StudentHome,
        },
        {
            path: 'projects',
            component: StudentProject,
        },
        {
            path: 'view-Project-details/:id',
            component:ProjectDetails,
        },
        {
            path: 'quiz',
            component:TestQuiz,
        },
        {
            path: 'quiz-terms',
            component:Quiz_Terms,
        },
        {
            path: 'track-progress',
            component:Myproject,
        },
        {
            path: 'profile/*',
            component:Student_Profile,
        },
        {
            path: 'upload-assignment/:id',
            component:UploadAssignment,
        }
    ]

  return (
        <>
        <Routes>
            {
              Student.map((route) => {
                return <Route
                path={route.path}
                element={<React.Suspense fallback={<><Breathing width={1200} height={1000} /></>}>
                <PrivateRoute> <route.component/> </PrivateRoute> </React.Suspense>}/>
              })
            }
            <Route path='view-profile/:id' element={<React.Suspense fallback={<><Breathing width={1200} height={1000} /></>}>
                <StudentPublicProfile /> 
            </React.Suspense>}/> 
            <Route path='view-requirement/:id' element={<React.Suspense fallback={<><Breathing width={1200} height={1000} /></>}>
                <ViewRequirement /> 
            </React.Suspense>}/> 
            <Route path="*" element={ < Navigate to="/auth/student" />} ></Route>
        </Routes>
    </>
  )
}

export default StudentRouting