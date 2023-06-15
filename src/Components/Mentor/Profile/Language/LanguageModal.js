import * as React from 'react';
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { authFetch } from '../../../../Middleware/axios/Interceptors';
import { ToastSucess, ToastError } from '../../../../features/DisplayMessage';

export default function LanguageModal({open,setOpen,ProfileSubmit}) {
  const cancelButtonRef = useRef(null)
  const [language, setLanguage] = useState([]);

  const HandleChange = (event) => {
    if(language.includes(event.target.value)){
      let findIndex = language.indexOf(event.target.value)
                      language.splice(findIndex,1)
    }else{
      setLanguage([...language,event.target.value])
    }
  };
  
  const languageSubmitHandler =async()=> {
    try {
      const res = await authFetch.patch('/mentor/add-language',{language:language});
      setOpen(false)
      ProfileSubmit()
      ToastSucess("Add Language Successfully");
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
                    <div>
                    <div className="container w-11/15 mx-auto px-4 py-4 bg-white rounded ">
                        <div>
                              <h5 className="  p-2 font-medium leading-tight text-xl mt-0 mb-2 text-black">Select Languages</h5>
                          </div>
                          <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownCheckboxButton">
                            <li>
                              <div className="flex items-center">
                                  <input name="language" type="checkbox" value="English" onChange={HandleChange} className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                  <label htmlFor="checkbox-item-1"  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">English</label>
                              </div>
                            </li>
                            <li>
                              <div className="flex items-center">
                                  <input name="language" type="checkbox" value="Hindi" onChange={HandleChange} className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                  <label htmlFor="checkbox-item-1"  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Hindi</label>
                              </div>
                            </li>
                            <li>
                              <div className="flex items-center">
                                  <input name="language" type="checkbox" value="Punjabi" onChange={HandleChange} className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                  <label htmlFor="checkbox-item-1"  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Punjabi</label>
                              </div>
                            </li>
                          </ul>
                          <button type="button" onClick={()=>languageSubmitHandler()} className="ml-5 rounded-md border border-gray-300 bg-blue-800 text-white py-2 px-3 text-sm font-medium shadow-sm ">Save</button>
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