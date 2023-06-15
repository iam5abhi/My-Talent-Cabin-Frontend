import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react';
import { ToastError, ToastSucess } from '../../../../features/DisplayMessage';
import { authFetch } from '../../../../Middleware/axios/Interceptors';

export default function BioModal({open,setOpen,data,ProfileSubmit}) {
  const cancelButtonRef = useRef(null)
  const [bioData,setBioData]=useState()
  

  const BioSubmit =async(event)=> {
    event.preventDefault()
    try {
      const res = await authFetch.patch('/mentor/add-bio',{bio:bioData});
      setOpen(false)
      ProfileSubmit()
      ToastSucess("Add Bio Successfully");
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
                <div className="container mx-auto">
                  <div className=" p-4 bg-white border col-span-2">
                    <div className=" border-b border-gray-200 rounded mb-1">
                    <span className="flex justify-end -mt-1 -mr-1 text-xl">
                          <i onClick={() => setOpen(false)} className="fa-solid fa-xmark"></i>
                        </span>
                      <div className="grid grid-cols-2 p-2 ">
                        <div className=" text-sm text-gray-500">
                        <Dialog.Title as="h2" className=" text-lg font-normal text-blue-600">
                          Add Bio
                        </Dialog.Title>
                        </div>
                      </div>
                      <br />
                      <form onSubmit={BioSubmit}>
                        <textarea id="message" onChange={(event)=>setBioData(event.target.value)} rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >{!data?null:data}</textarea>
                        <br />
                        <button type="submit" onClick={BioSubmit} className="ml-5 rounded-md border border-gray-300 bg-blue-800 text-white py-2 px-3 text-sm font-medium shadow-sm ">Save</button>
                      </form>
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