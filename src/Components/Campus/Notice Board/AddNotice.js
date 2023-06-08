import React, { useState } from 'react';
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { authFetch } from "../../../Middleware/axios/intance"
import Message from '../../../features/Message';


export default function AddNotice({setOpen,open,GetNoticeData}) {
  const cancelButtonRef = useRef(null)
  const [message,setMessage]=useState({message:'',type:''})
  const [notice,setNotice]=useState({title:'',description:""})

  const NoticeHandler=(event)=>{
    setNotice((pre)=>({
      ...pre,
      [event.target.name]:event.target.value
    }))
  }

  const SubmitQuesHandler =async(event)=>{
    event.preventDefault();
    try {
      const resp = await authFetch.post('/api/campus/notice-board',notice);
      setMessage({message:resp.data.message,type:true})
      setTimeout(() => {
        setOpen(false)
        GetNoticeData()
        setMessage({message:'',type:''})
      },1000);
    } catch (error) {
      console.log(error)
    }
  }

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
              <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full md:max-w-xl">
              <div className="max-w-screen mx-auto">
                <div className="container mx-auto">
                  <div className="col-span-2">
                    <div className=" border-b border-gray-200 rounded">
                        <div className="text-end p-2">
                          <i onClick={() => setOpen(false)} className="fa-solid fa-xmark text-xs font-extrabold bg-gray-400 h-5 leading-5 w-5 z-50 rounded-full text-center text-white"></i>
                        </div>
                        <Dialog.Title as="h2" className=" text-xl text-center font-semibold">
                        Add Notice
                        </Dialog.Title>   
                      <div className="overflow-auto">
                       <div className=" max-w-screen-lg mx-auto">
                        <form onSubmit={SubmitQuesHandler} className="px-4 py-6">
                            <ul className="w-full text-sm font-medium text-gray-900bg-white ">
                            <li className="w-full rounded-t-lg  ">
                                <div className="items-center">
                                <label htmlFor="first_name" className="block mb-1 px-3 text-sm font-medium text-gray-900 dark:text-white">Title <span class="text-red-600">*</span></label>      
                                <div className='flex items-center px-3 gap-4'>       
                                <input type="text" id="default-input" name='title' onChange={NoticeHandler} placeholder="Enter Title" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg font-normal rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" required/>
                                </div>
                                </div>
                            </li>
                            <br />
                            <li className="w-full rounded-t-lg  ">
                                <div className="items-center">
                                <label htmlFor="first_name" className="block mb-1 px-3 text-sm font-medium text-gray-900 dark:text-white">Description <span class="text-red-600">*</span></label>      
                                <div className='flex items-center px-3 gap-4'>       
                                <textarea type="text" id="default-input" name='description' onChange={NoticeHandler} placeholder="Enter Description" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg font-normal rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" required/>
                                </div>
                                </div>
                            </li>
                            <br />
                            </ul>
                            <div className=" w-full text-center pt-6">
                            <button type="submit" className="text-white text-end bg-orange-600 hover:bg-orange-400 focus:ring-4 focus:ring-orange-300 
                            font-semibold rounded-full text-lg px-20 py-2.5 mr-2 focus:outline-none">Submit</button>
                            </div>
                      </form>
                    </div>
                    {message.type !==''?message.type===false?
                      <Message message={message.message} css='flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-gray-800' />
                      :
                      <Message message={message.message} css='flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-gray-800' />
                      :null}
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
