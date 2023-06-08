import React,{useState,useEffect} from 'react'
import { NavLink } from 'react-router-dom';
import { GetProfileDatas } from '../../../features/ProfileData';

const Sidebar = () => {
  const [profileData,setProfileData]=useState()

  useEffect(() => {
    GetProfileDatas(`/api/enterpricess/profile`).then((data)=>{
      setProfileData(data)
    })
  },[])
  return (
        <>
        <div>
                <h2 className="text-xl font-bold mb-4">Account Settings</h2>
                <div className="lg:w-60 bg-white mb-6">
                    <NavLink to="profile-picture" isActive className={({ isActive }) =>
                     isActive ? "flex items-center justify-between hover:bg-orange-600 hover:text-white border-b-2 p-4 bg-orange-600 text-white" : "flex items-center justify-between hover:bg-orange-600 hover:text-white border-b-2 p-4"
                    }>
                    <span>Profile Picture</span>
                    <i className="fa-solid fa-circle-check text-green-500 ml-4" />
                    </NavLink>
                    <NavLink to="personal-information" isActive className={({ isActive }) =>
                     isActive ? "flex items-center justify-between hover:bg-orange-600 hover:text-white border-b-2 p-4 bg-orange-600 text-white" : "flex items-center justify-between hover:bg-orange-600 hover:text-white border-b-2 p-4"
                    }>
                    <span>Business Details</span>
                    <i className="fa-solid fa-circle-check text-green-500 ml-4" />
                    </NavLink>
                    <NavLink to="business-information" className={({ isActive }) =>
                     isActive ? "flex items-center justify-between hover:bg-orange-600 hover:text-white border-b-2 p-4 bg-orange-600 text-white" : "flex items-center justify-between hover:bg-orange-600 hover:text-white border-b-2 p-4"
                    }>
                    <span>Business Information</span>
                    {!profileData?<i className="fa-solid fa-circle-chevron-right text-white ml-4" />
                     :<i className="fa-solid fa-circle-check text-green-500 ml-4" />} 
                    </NavLink>
                </div>
            </div>
    </>
  )
}

export default Sidebar;