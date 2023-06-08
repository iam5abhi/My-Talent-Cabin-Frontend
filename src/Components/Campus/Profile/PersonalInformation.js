import React,{useEffect, useState} from 'react';
import jwtDecode from 'jwt-decode';
import { Token } from '../../../features/Token';
import { authFetch } from '../../../Middleware/axios/intance';
import Message from '../../../features/Message';
import { useNavigate } from 'react-router-dom';

const PersonalInformation = () => {
    const navigate = useNavigate()
    const decode = jwtDecode( Token())
    const [updateProfileData,setUpdateProfileData]=useState({location:"",website:""})
    const [message,setMessage]=useState({message:'',type:''})
    
    const ProfileHandler =(e)=>{
        setUpdateProfileData((pre)=>({
            ...pre,
            [e.target.name]:e.target.value,
        }))
    }

    const GetProfileData =async()=>{
        try {
          const resp = await authFetch('/api/campus/get-collage-profile');
          console.log(resp)
          setUpdateProfileData({...updateProfileData,location:resp.data.location,website:resp.data.website})
        } catch (error) {
          console.log(error)
        }
      } 

      const SubmitProfileData =async(event)=>{
        event.preventDefault();
        try {
          const resp = await authFetch.patch('/api/campus/campus-information',updateProfileData);
          setMessage({message:resp.data.message,type:true})
          setTimeout(() => {
            navigate('/auth/mentors/profile/education')
            setMessage({message:"",type:''})
          },2000)    
        } catch (error) {
            setMessage({message:error,type:true})
          setTimeout(() => {
            setMessage({message:"",type:''})
          },2000)
        }
      }
    
      useEffect(() => {
        GetProfileData()
      },[])
  return (
        <>
        <div className="p-4 bg-white w-full">
        <section>
            <div className="w-full py-4 ">
            {message.type !==''?message.type===false?
            <Message message={message.message} css='flex p-4 mb-1 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-gray-800 dark:text-red-400' />
            :
            <Message message={message.message} css='flex p-4 mb-1 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-gray-800 dark:text-green-400' />
            :null}
            <h2 className="text-xl py-4 font-bold sm:mb-4 mt-2 sm:mt-0">
              Campus Information
            </h2>
            <form onSubmit={SubmitProfileData}>
                <div className="mb-2">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input type="text" id="name" name='name' disabled value={decode.user.name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Enter name" required />
                </div>
                <div className="mb-2">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email </label>
                <input type="email" id="email" name='email' disabled value={decode.user.email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Enter email" required />
                </div>
                <div className="mb-2">
                <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile number
                </label>
                <input type="text" id="mobile" name='phoneNumber' disabled value={decode.user.phoneNumber} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Enter mobile" required />
                </div>
                <div className="mb-2">
                <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location
                </label>
                <input type="text" id="mobile" name='location' value={updateProfileData.location} onChange={ProfileHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Enter location" required />
                </div>
                <div className="mb-6">
                <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Website
                </label>
                <input type="text" id="mobile" name='website' value={updateProfileData.website} onChange={ProfileHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Enter website" required />
                </div>
                <div className="mt-12 mb-2 sm:flex">
                <button type='submit' className="block w-full sm:w-auto px-6 py-2 font-medium rounded bg-orange-600
                hover:bg-orange-700 text-white">Submit</button>
                </div>
            </form>
            </div>
        </section>
        </div>
    </>
  )
}

export default PersonalInformation;