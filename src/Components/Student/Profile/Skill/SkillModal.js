import * as React from 'react';
import { Fragment, useRef, useState ,useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { v4 as uuid } from 'uuid';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import {authFetch} from '../../../../Middleware/axios/Interceptors'
import {ToastError} from '../../../../features/DisplayMessage'


export default function SkillModal({open,setOpen,ProfileSubmit}) {
  const cancelButtonRef = useRef(null)
  const [subCategoryAllData,setSubCategoryAllData]=useState([])

  const skillsHandler =(event)=>{
  
  }

  const skillsSubmitHandler =()=> {
    axios({
      method: 'patch',
      url: `${"BaseUrl.url"}/add-skills`,
      headers:{
        'Authorization':`Bearer ${window.localStorage.getItem('token')}`
      },
      data:"skills_arr"
    }).then((res)=>{
      setOpen(false)
      ProfileSubmit()
    })
    .catch((err)=>{
      toast.error(err.response.data.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme:'colored'
        });
    })
  }

  const GetSubCategoryData = async ()=>{
    try {
      const res = await authFetch(`/student/skill`);
      setSubCategoryAllData(res.data)
    } catch (error) { ToastError(error.message) }
  }

  useEffect(() => {
    GetSubCategoryData()
  },[])

  return (
    <Transition.Root show={open} as={Fragment}>   
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="max-w-screen mx-auto">
                <div className="container mx-auto p-3">
                    <span className="flex justify-end -mt-1 -mr-1 text-xl">
                          <i onClick={() => setOpen(false)} className="fa-solid fa-xmark"></i>
                        </span>
                        <div>
                    <div className="container w-11/15 mx-auto px-4  border border-slate-300 bg-white rounded ">
                      <div>
                        <h5 className="  p-2 font-medium leading-tight text-xl mt-0 mb-2 text-black">Add Skills</h5>
                      </div>
                      <ul className="overflow-y-auto px-3 pb-3 h-48 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
                      {subCategoryAllData.map((skill)=>{
                      return(
                        <li key={skill.id}>
                          <div className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input id={skill._id} onChange={(e)=>skillsHandler(e)} type="checkbox" defaultValue className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                            <label htmlFor="checkbox-item-11" className="py-2 ml-2 w-full text-sm font-medium text-gray-900 rounded dark:text-gray-300">{skill.name}</label>
                          </div>
                        </li>
                        )})} 
                      </ul> 
                    </div>
                    <button type="button" onClick={skillsSubmitHandler} className="ml-5 mt-2 rounded-md border border-gray-300 bg-blue-800 text-white py-2 px-3 text-sm font-medium shadow-sm ">Save</button>
                    <ToastContainer />
                    </div>
                </div>
            </div>
          </Dialog.Panel>
          </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}