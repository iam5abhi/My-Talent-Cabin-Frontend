import * as React from 'react';
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ToastError, ToastSucess } from '../../../../features/DisplayMessage';
import { authFetch } from '../../../../Middleware/axios/Interceptors';

export default function Username_imageModal({open,setOpen,ProfileSubmit}) {
  const cancelButtonRef = useRef(null)
  const [location,setLocation]=useState()

  const languageSubmitHandler =async(event)=> {
    event.preventDefault()
    try {
      const res = await authFetch.patch('/mentor/add-location',{location:location});
      setOpen(false)
      ProfileSubmit()
      ToastSucess("Add Location Successfully");
      } catch (error) { ToastError(error.data.message) }
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="max-w-screen mx-auto">
                <form onSubmit={languageSubmitHandler} className="container mx-auto p-5">
                    <span className="flex justify-end -mt-1 -mr-1 text-xl">
                          <i onClick={() => setOpen(false)} className="fa-solid fa-xmark"></i>
                        </span>
                    <h1 className='text-center text-xl font-medium text-black'>Upload Profile Picture</h1>
                    {/* <div className="container w-11/15 mx-auto px-4 py-4 mt-4 mb-4 border border-slate-300 bg-white rounded ">
                      <div>
                          <h5 className="  p-2 font-medium leading-tight text-xl mt-0 mb-2 text-black">Photo</h5>
                      </div>
                      <div className="mt-1 flex items-center">
                          <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                          <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          </span>
                          <input type="file" className="ml-3 rounded-md border border-gray-300 bg-white text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" />
                      </div>
                    </div>  */}
                    <div>
                      <label htmlFor="large" className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-400">Location</label>
                      <input type="text" id="first_name" name="location" onChange={(event)=>setLocation(event.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Location..." required />
                    </div>
                    <div className='text-center'>
                        <button type="submit" className="mt-5 rounded-md border border-gray-300 bg-blue-800 text-white py-2 px-3 text-sm font-medium shadow-sm ">Save</button>
                    </div>
                </form>
            </div>
          </Dialog.Panel>
          </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}