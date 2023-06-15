import React from 'react';
import CompanyName from '../../Components/Company/Profile/companyName/companyName'
import SocialMedia from '../../Components/Company/Profile/social_media/SocialMedia.js';
import CompanyDescription from '../../Components/Company/Profile/company_description/CompanyDescription'
import CompanyHr from '../../Components/Company/Profile/company_HR\'s/CompanyHr.js';
import {useNavigate} from 'react-router-dom';
import { CompanyToken } from '../../features/Token'
import {authFetch} from '../../Middleware/axios/Interceptors';
import {ToastError} from '../../features/DisplayMessage'
import { ToastContainer } from 'react-toastify';


const Profile = () => {
  const navigate = useNavigate()
  const [getData,setGetData]=React.useState()

  const ProfileSubmit =async()=> {
    try {
      const res = await authFetch('/company');
      const profileData = res.data.reduce((acc, curr) => {
        acc["data"] = curr;
        return acc;
      }, {});
      setGetData(profileData.data)
      } catch (error) { ToastError(error.data.message) }
  }

  React.useEffect(()=>{
    ProfileSubmit();
  },[])

  return (
    <>
    {!CompanyToken()?navigate('/company-login'):
  <div className="bg-blue-100 py-8">
   {/*----------------------- Start - CompanyName - SocialMedia */}
  <div className="container w-11/15 mx-auto px-4 mt-4 border border-slate-300 bg-white rounded">
    <div className="relative flex flex-col flex-auto min-w-0 mt-4 p-4 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border mb-4 draggable" draggable="true">
      <div className="flex flex-row">
         {/*-----------COLUMN 1st/company name/--*/}
          <CompanyName data={getData}/> 
         {/*-----------COLUMN 2nd/company icons/--*/}
         <SocialMedia data={getData} ProfileSubmit={ProfileSubmit} /> 
      </div>
    </div>
  </div>
   {/*------------------------- End - CompanyName - SocialMedia*/}
   {/*------------------------Overview*/}
  <div className="container  w-11/15 mx-auto px-4 pb-4 mt-4 border border-slate-300 bg-white rounded ">
   <CompanyDescription data={getData} ProfileSubmit={ProfileSubmit} />
     {/*------------------------Overview*/}
     {/*------------------------Current HRs*/}
      < CompanyHr data={getData?getData.hr:null} ProfileSubmit={ProfileSubmit}/>
  </div>
</div>
 }   
 <ToastContainer />
    </>
  )
}

export default Profile;
