import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios';
import { ToastError, ToastSucess } from '../../../../features/DisplayMessage';
import { authFetch } from '../../../../Middleware/axios/intance';


export default function SkillDeleteModal({setOpen,open,id,ProfileSubmit}) {
  const cancelButtonRef = useRef(null)

      const SkillsDelete=async()=>{
        try {
          const res = await authFetch.patch('/student/delete-skill',{value:id});
          setOpen(false)
          ProfileSubmit()
          ToastSucess("Delete Skill Successfully");
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
                  <div className="  bg-white border col-span-2">
                    <div className=" border-b border-gray-200 rounded">
                    
                      <div className="grid grid-cols-2 bg-gray-400/25 shadow-sm">
                        <div className="   p-2 ml-2 mt-2 ">
                        <Dialog.Title as="h2" className=" text-lg  font-semibold text-gray-600">
                          Delete Skill
                        </Dialog.Title>
                        </div>
                        <div className="text-sm text-end p-2 mr-2 mt-2">
                        
                        <span className="flex justify-end mb-2 -mr-1 ">
                          <i onClick={() => setOpen(false)} className="fa-solid fa-xmark text-xl font-extrabold"></i>
                        </span>
                        </div>
                      </div>  
                      <hr />
                      <br />
                      <div className="my-4 mx-4">
                      <p className="  text-lg  font-semibold text-gray-600">
                         Are u sure delete this skill's?
                        </p>
                      </div>                   
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="deletebtn inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:mt-4 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() =>SkillsDelete()}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-4 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
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