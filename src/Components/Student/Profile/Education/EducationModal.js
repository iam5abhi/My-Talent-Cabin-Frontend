import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ToastError, ToastSucess } from '../../../../features/DisplayMessage';
import { authFetch } from '../../../../Middleware/axios/intance';

export default function EducationModal({open,setOpen,ProfileSubmit}) {
  const cancelButtonRef = useRef(null)
  const [educationData,setEducationData]=useState({ degreeName:'', collegeName:'', startDate:'', endDate:''})

  const EducationHandler =(e)=>{
    setEducationData((pre)=>({
        ...pre,
        [e.target.name]:e.target.value
  }))
  }

  const EducationSubmit =async(event)=> {
    event.preventDefault()
    try {
      const res = await authFetch.patch('/student/add-education',{education:educationData});
      setOpen(false)
      ProfileSubmit()
      ToastSucess("Add Education Successfully");
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
                <div className="container mx-auto p-3">
                    <span className="flex justify-end -mt-1 -mr-1 text-xl">
                          <i onClick={() => setOpen(false)} className="fa-solid fa-xmark"></i>
                        </span>
                      <div className="container w-11/15 mx-auto ">
                      <div className="flex min-h-full items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
                        <div className="w-full max-w-md space-y-8">
                         <form onSubmit={EducationSubmit} className="space-y-4">
                          <div>
                            <label htmlFor="large" className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-400">Add Degree</label>
                            <input id="large" onChange={EducationHandler} name="degreeName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
                          </div>
                          <div>
                            <label htmlFor="large" className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-400">Add College</label>
                            <input id="large" onChange={EducationHandler} name="collegeName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
                          </div>
                          <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                              <label htmlFor="large" className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-400">Joining Year</label>
                              <input type="month" id="first_name" name="startDate" onChange={EducationHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                            </div>
                            <div>
                              <label htmlFor="large" className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-400">Completion Year</label>
                              <input type="month" id="last_name" name="endDate" onChange={EducationHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
                            </div>
                          </div>
                          <button type="submit" className="ml-5 rounded-md border border-gray-300 bg-blue-800 text-white py-2 px-3 text-sm font-medium shadow-sm ">Submit</button>
                        </form></div>
                      <div>
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