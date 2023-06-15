import React, { useState } from 'react';
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { authFetch } from '../../../Middleware/axios/intance';
import { ToastSucess, ToastError } from '../../../features/DisplayMessage';


export default function AddSubCategory({setOpen,open,GetCategoryData,id,subCategoryData}) {
  const cancelButtonRef = useRef(null)
  const [inputCate,setInputCate]=useState()

  const SubmitSubCateHandler = async ()=>{
    try {
      const res = await authFetch.post('/admin/subcategory',{categoryId:id, name:inputCate});
        ToastSucess(res.data.message)
        setOpen(false)
        GetCategoryData()
        setInputCate('')
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
                        Add Sub-Category
                        </Dialog.Title>    
                      <div className="overflow-auto">
                       <div className=" max-w-screen-lg mx-auto">
                        <div className=" px-8 mt-7">
                            <ul className="w-full text-sm font-medium text-gray-900 bg-white ">
                            <li className="w-full rounded-t-lg mb-1 ">
                                <h1 className='text-lg'>Category : {!subCategoryData?null:subCategoryData.title}</h1>
                            </li>
                            <li className="w-full rounded-t-lg">   
                                <div className='flex'>
                                <input type="text" id="default-input" value={inputCate} onChange={(e)=>setInputCate(e.target.value)} placeholder="Enter Sub-Category" className="bg-gray-50 border mr-10 border-gray-300 text-gray-900 text-lg font-normal rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2" />
                                </div>
                            </li>
                            </ul>
                            <div className=" w-full text-center pt-4 mb-4">
                            <button type="button" onClick={SubmitSubCateHandler} className="text-white text-end bg-orange-600 hover:bg-orange-400
                            focus:ring-4 focus:ring-orange-300 font-semibold rounded-full text-lg px-20 py-2.5 mr-2 mb-2 focus:outline-none">Submit</button>
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
