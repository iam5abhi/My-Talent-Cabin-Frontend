import * as React from 'react';
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ToastError, ToastSucess } from '../../../../features/DisplayMessage';
import { authFetch } from '../../../../Middleware/axios/intance';

export default function EducationModal({open,setOpen,ProfileSubmit}) {
  const cancelButtonRef = useRef(null)
  const [experienceData,setExperienceData]=React.useState({ position:'', company:'', startDate:'', endDate:''})

  const ExperienceHandler =(e)=>{
    setExperienceData((pre)=>({
        ...pre,
        [e.target.name]:e.target.value
  }))
  }

  const ExperienceSubmit = async(event)=> {
    event.preventDefault()
    try {
      const res = await authFetch.patch('/mentor/add-exp',{ experience:experienceData});
      setOpen(false)
      ProfileSubmit()
      ToastSucess("Add Experience Successfully");
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
                    <div className="flex min-h-full items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
                      <div className="w-full max-w-md space-y-8">
                        <form className="space-y-6">
                        <div>
                        <label htmlFor="large" className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-400">Add Position</label>
                        <select id="large" onChange={ExperienceHandler} name="position" className="block py-2 px-4 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          <option selected>Choose a position</option>
                          <option value="React Developer">React Developer</option>
                          <option value="Node Developer">Node Developer</option>
                          <option value="PHP Developerl">PHP Developer</option>
                          <option value="Java Developer">Java Developer</option>
                          <option value="Python Develope">Python Developer</option>
                          <option value="MERN Stack Developer">MERN Stack Developer</option>
                          <option value="MEAN Stack Developer">MEAN Stack Developer</option>
                          <option value="Go lang Developer">Go lang Developer</option>
                          <option value="Laravel Developer">Laravel Developer</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="large" className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-400">Add Company</label>
                        <select id="large" onChange={ExperienceHandler} name="company" className="block py-2 px-4 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          <option selected>Choose a company</option>
                          <option value="Codesoftic Tech Private Limited">Codesoftic Tech Private Limited</option>
                          <option value="TMotions Global Limited">TMotions Global Limited</option>
                          <option value="DevelopTech IT Solutions">DevelopTech IT Solutions</option>
                          <option value="NextPage IT Solutions Pvt Ltd">NextPage IT Solutions Pvt Ltd</option>
                          <option value="Enzoo IT Services Pvt. Ltd.">Enzoo IT Services Pvt. Ltd.</option>
                          <option value="Fortec Web Solutions Pvt. Ltd.">Fortec Web Solutions Pvt. Ltd.</option>
                        </select>
                      </div>
                      <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                          <label htmlFor="large" className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-400">Joining Year</label>
                          <input type="month" id="first_name" onChange={ExperienceHandler} name="startDate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                        </div>
                        <div>
                          <label htmlFor="large" className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-400">Completion Year</label>
                          <input type="month" id="last_name" onChange={ExperienceHandler} name="endDate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
                        </div>
                      </div>
                      <button type="button" onClick={ExperienceSubmit} className="ml-5 rounded-md border border-gray-300 bg-blue-800 text-white py-2 px-3 text-sm font-medium shadow-sm ">Submit</button>
                    </form></div>
                      <div>
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