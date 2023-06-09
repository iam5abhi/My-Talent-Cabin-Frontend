import React from 'react';
import { Fragment, useRef,useEffect,useState} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { authFetch } from '../../../Middleware/axios/Interceptors';
import { ToastSucess, ToastError } from '../../../features/DisplayMessage';



export default function EditCategory({setOpen,open,GetCategoryData,id}) {
  const cancelButtonRef = useRef(null)
  const [categoryData,setCategoryData]=useState({title:''})


  const CategoryHandleChange =(e)=>{
    setCategoryData({title:e.target.value})
  }

  const SubmitCategoryData = async ()=>{
    try {
      const res = await authFetch.patch(`/admin/category/${id}`,{title:categoryData.title});
      ToastSucess("Edit Successfully")
      setTimeout(() => {
        setOpen(false)
        GetCategoryData()
      },2000);
      }catch (error) {
        ToastError(error)
    }
  }

  const GetSingleCategoryData = async ()=>{
    try {
      const res = await authFetch(`/admin/category/${id}`);
      setCategoryData({title:res.data.data.title})
      }catch (error) {
        ToastError(error)
    }
  }

  useEffect(() => {
    GetSingleCategoryData()
  },[])

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
                        Edit Category
                      </Dialog.Title> 
                      <div className="overflow-auto">
                       <div className=" max-w-screen-lg mx-auto">
                        <div className=" mt-9 px-4 ">
                            <ul className="w-full text-sm font-medium text-gray-900 bg-white ">
                            <li className="w-full rounded-t-lg  ">
                                <div className="items-center px-3 gap-4">  
                                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category <span class="text-red-600">*</span></label>      
                                <input type="text" id="default-input" name='title' value={!categoryData?null:categoryData.title} onChange={CategoryHandleChange} placeholder="Enter Category" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg font-normal rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" />
                                </div>
                            </li>
                            <br />  
                            </ul>
                            <div className=" w-full text-center mt-2 mb-4">
                            <button type="button" onClick={SubmitCategoryData} className="text-white text-end bg-orange-600 hover:bg-orange-400
                            focus:ring-4 focus:ring-orange-300 font-semibold rounded-full text-lg px-20 py-2.5 mr-2 
                            mb-2 focus:outline-none">Submit</button>
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
