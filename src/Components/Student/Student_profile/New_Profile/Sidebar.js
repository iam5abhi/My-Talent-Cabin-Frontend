import React from 'react'
import { NavLink } from 'react-router-dom';


const Sidebar = ({profileData}) => {
  
  return (
        <>
          <div>
              <h2 className="text-xl font-bold mb-4">Account Settings</h2>
              <div className="lg:w-60 bg-white mb-6">
                  <NavLink to="profile-picture" isActive className={({ isActive }) =>
                    isActive ? "flex items-center justify-between hover:bg-orange-600 hover:text-white border-b-2 p-4 bg-orange-600 text-white" : "flex items-center justify-between hover:bg-orange-600 hover:text-white border-b-2 p-4"
                  }>
                  <span>Profile Picture</span>
                  {!profileData?null:profileData.family_occupation&&profileData.dob&&profileData.gender?<i className="fa-solid fa-circle-check text-green-500 ml-4" />
                  :<i className="fa-solid fa-circle-chevron-right text-white ml-4" />}
                  </NavLink>
                  <NavLink to="personal-information" isActive className={({ isActive }) =>
                    isActive ? "flex items-center justify-between hover:bg-orange-600 hover:text-white border-b-2 p-4 bg-orange-600 text-white" : "flex items-center justify-between hover:bg-orange-600 hover:text-white border-b-2 p-4"
                  }>
                  <span>Personal Information</span>
                  {!profileData?null:profileData.family_occupation&&profileData.dob&&profileData.gender?<i className="fa-solid fa-circle-check text-green-500 ml-4" />
                  :<i className="fa-solid fa-circle-chevron-right text-white ml-4" />}
                  </NavLink> 
                  <NavLink to="education" 
                  // className="flex items-center justify-between hover:bg-blue-600 hover:text-white border-b-2 p-4"
                    className={({ isActive }) =>
                    isActive ? "flex items-center justify-between hover:bg-orange-600 hover:text-white border-b-2 p-4 bg-orange-600 text-white" : "flex items-center justify-between hover:bg-orange-600 hover:text-white border-b-2 p-4"
                  }>
                  <span>Education</span>
                  {!profileData?null:profileData.education.length==0?<i className="fa-solid fa-circle-chevron-right text-white ml-4" />
                    :<i className="fa-solid fa-circle-check text-green-500 ml-4" />} 
                  </NavLink>
                  <NavLink to="specialization"className={({ isActive }) =>
                    isActive ? "flex items-center justify-between hover:bg-orange-600 hover:text-white border-b-2 p-4 bg-orange-600 text-white" : "flex items-center justify-between hover:bg-orange-600 hover:text-white border-b-2 p-4"
                  }>
                  <span>Specialization</span>
                  {!profileData?null:profileData.Category.length==0&&!profileData.campus?<i className="fa-solid fa-circle-chevron-right text-white ml-4" />
                    :<i className="fa-solid fa-circle-check text-green-500 ml-4" />} 
                  </NavLink>
                  <NavLink to="achievements"className={({ isActive }) =>
                    isActive ? "flex items-center justify-between hover:bg-orange-600 hover:text-white border-b-2 p-4 bg-orange-600 text-white" : "flex items-center justify-between hover:bg-orange-600 hover:text-white border-b-2 p-4"
                  }>
                  <span>Achievement's</span>
                  {!profileData?null:profileData.Category.length==0&&!profileData.campus?<i className="fa-solid fa-circle-chevron-right text-white ml-4" />
                    :<i className="fa-solid fa-circle-check text-green-500 ml-4" />} 
                  </NavLink>
              </div>
          </div>
      </>
  )
}

export default Sidebar;