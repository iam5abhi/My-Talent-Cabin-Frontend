import * as React from 'react';
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ToastError, ToastSucess } from '../../../../features/DisplayMessage';
import { authFetch } from '../../../../Middleware/axios/intance';


export default function CompanyDescriptionModal({ setOpen, open, ProfileSubmit }) {
  const cancelButtonRef = useRef(null)
  const [descriptionModal,setDescriptionModal]=React.useState({ bio:'', url:'' })

  console.log(descriptionModal,"descriptionModal")
  const DescriptionModalHandler =(event)=>{
    setDescriptionModal((pre)=>({
      ...pre,
      [event.target.name]:event.target.value
    }))
  }

  const SubmitDescriptionHandler = async (event)=>{
    event.preventDefault()
    try {
      const res = await authFetch.patch('/company/add-company-bio',descriptionModal);
        ToastSucess(res.data.message)
        setOpen(false)
        ProfileSubmit()
      }catch (error) {
        ToastError(error)
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
                        Edit video link/bio
                        </Dialog.Title>
                          <div className="relative flex flex-col flex-auto min-w-0 p-4 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border mb-4 draggable" draggable="true">
                              <form onSubmit={SubmitDescriptionHandler}>
                                <div className="mb-3">
                                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Edit Video URL</label>
                                  <textarea type="text" onChange={DescriptionModalHandler} rows={1} name="url" id="videoUrl" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
                                </div>
                                <div className="mb-6">
                                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Edit Bio</label>
                                  <textarea onChange={DescriptionModalHandler} name="bio" id="editBio" rows={8} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
                                </div>
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                              </form>
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


