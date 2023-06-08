import React, { useState } from 'react'
import Message from '../../features/Message'
import {encode as base64_encode} from 'base-64';
import { authFetch } from '../../Middleware/axios/intance'
import AdminHeader from '../../Layouts/Header/AdminHeader';

const AdminChangePass = () => {
    const [changePass,setChangePass]=useState({ old_password:'', new_password:'', new_confirmpassword:'' })
    const [message,setMessage]=useState({message:'',type:''})

    const ChangePassHandler =(e)=>{
        setChangePass((pre)=>({
            ...pre,
            [e.target.name]:e.target.value
        }))
    }
    
    const ChangePassSubmitHandler =async(event)=>{
        event.preventDefault();
        let encoded_old_password = base64_encode(changePass.old_password);
        let encoded_new_password = base64_encode(changePass.new_password);
        let encoded_new_confirmpassword = base64_encode(changePass.new_confirmpassword);
            try {
                const resp =await authFetch.patch('/api/admin/change-password',{old_password:encoded_old_password,
                new_password:encoded_new_password,new_confirmpassword:encoded_new_confirmpassword});
                sessionStorage.removeItem('admin-token')
                setMessage({message:resp.data.message,type:true})
                sessionStorage.setItem('admin-token',resp.data.token,true)
                setTimeout(() => {
                setMessage({message:'',type:''})
                },2000);
            } catch (error){
                setMessage({message:error,type:false})
                setTimeout(() => {
                    setMessage({message:'',type:''})
                    },2000);
            }
    }

  return (
        <>
        <AdminHeader />
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
            <div className="w-full max-w-md space-y-8 shadow-2xl rounded-lg px-5 py-5 bg-white">
                <div>
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Change Password</h2>
                </div>
                <form onSubmit={ChangePassSubmitHandler}>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Old Password <span class="text-red-600">*</span></label>
                        <input type="text" name='old_password' onChange={ChangePassHandler} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="•••••••••" required />
                    </div> 
                    <div className="mb-6">
                        <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New password <span class="text-red-600">*</span></label>
                        <input type="text" name='new_password' onChange={ChangePassHandler} id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="•••••••••" required />
                    </div> 
                    <div className="mb-6">
                        <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password <span class="text-red-600">*</span></label>
                        <input type="text" name='new_confirmpassword' onChange={ChangePassHandler} id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="•••••••••" required />
                    </div> 
                    <br />
                    {message.type !==''?message.type===false?
                    <Message message={message.message} css='flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-gray-800 dark:text-red-400' />
                    :
                    <Message message={message.message} css='flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-gray-800 dark:text-green-400' />
                    :null}
                    <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                        Update Password
                    </button>
                </form>
            </div>
        </div>
        
    </>
  )
}

export default AdminChangePass