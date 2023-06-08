import React, { useState,useEffect } from 'react';
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {ToastError,ToastSucess} from '../../../features/DisplayMessage'
import { authFetch } from '../../../Middleware/axios/intance';


export default function JobEditModal({setOpen,open,id,GetJobData}) {
  const [Posts,setPosts]=useState({budget:"",city:"",companyname:"",designation:"",experience:"",jd:"1" })
  const cancelButtonRef = useRef(null)

  const EditChangeHandle =(e)=>{
    setPosts((pre)=>({
      ...pre,
      [e.target.name]:e.target.value
    }))
  }

  const EditSubmitHandler = async ()=>{
      try {
      const res = await authFetch.patch(`admin/api/v1/job/${id}`,Posts);
      setOpen(false)
      GetJobData()
      ToastSucess(res.data.message);
      } catch (error) { ToastError(error.data.message) }
  }

  const GetSingleDocterData = async ()=> {
      try {
      const res = await authFetch(`admin/api/v1/job/${id}`);
      setPosts({budget:res.data.data.Budget,city:res.data.data.city,companyname:res.data.data.Company_Name,
        designation:res.data.data.designation,experience:res.data.data.experience,jd:res.data.data.description })
      } catch (error) { ToastError(error.data.message) }
  }

  useEffect(()=>{
    GetSingleDocterData();
  },[id])

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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full md:max-w-2xl">
              <div className="max-w-screen mx-auto">
                <div className="container mx-auto">
                  <div className=" col-span-2">
                    <div className=" border-b border-gray-200 rounded">
                      <div className="grid grid-cols-2 shadow-lg">
                        <div className="p-2 ml-2 mt-2">
                        <Dialog.Title as="h2" className=" text-lg text-blue-500 font-semibold">
                          Edit Post
                        </Dialog.Title>
                        </div>
                        <div className="text-sm text-end p-2 mr-2 mt-2">
                        <span className="flex justify-end mb-2 -mr-1 ">
                          <i onClick={() => setOpen(false)} className="fa-solid fa-xmark text-xl font-extrabold"></i>
                        </span>
                        </div>
                      </div>  
                      <div className="overflow-auto">
                      <div className="container w-11/15 mx-auto px-3 bg-white rounded  ">
                        <div className="relative flex flex-col flex-auto min-w-0 mt-2 p-4 break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border mb-4 draggable " draggable="true">
                                <div >
                                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Company Name</label>
                                  <input type="text" value={Posts.companyname} name='companyname' onChange={EditChangeHandle} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Enter Company Name'/>
                                </div>
                                <div className='mt-1'>
                                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Position</label>
                                  <input type="text" value={Posts.designation} name='designation' onChange={EditChangeHandle} id="designation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Enter Position' />
                                </div>
                                <div className='mt-1'>
                                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">City</label>
                                  <input type="text" value={Posts.city} name='city' onChange={EditChangeHandle} id="phonenumber" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Enter City' />
                                </div>
                                <div className='mt-1'>
                                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Budget</label>
                                  <input type="text" value={Posts.budget} name='budget' onChange={EditChangeHandle} id="dob" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Enter Budget'/>
                                </div>
                                <div className="mt-1">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Experience</label>
                                <input  type='text' value={Posts.experience} name="experience" id="editcity" onChange={EditChangeHandle} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Enter Experience'></input>
                              </div>
                              <div className="mt-1">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">JD</label>
                                <textarea type='text' value={Posts.jd} name='jd' onChange={EditChangeHandle} id="editAddress" row={5} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Enter JD'></textarea>
                              </div>
                              <div className='grid justify-items-center'>
                                <button type="button" onClick={EditSubmitHandler} className="text-white mt-3 bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                              </div>
                        </div>
                      </div>
                </div>
                </div>
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
