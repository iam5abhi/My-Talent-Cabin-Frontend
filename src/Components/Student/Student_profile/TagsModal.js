import { Fragment, useRef, useState,useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { authFetch } from '../../../Middleware/axios/intance'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


const animatedComponents = makeAnimated();
    
export default function TagsModal({setOpen,open,GetProfileData}) {
    const cancelButtonRef = useRef(null)
    const [selectCategory,setSelectCategory]=useState()
    const [categoryData,setCategoryData]=useState()
    

    const SubmitProfileData =async()=>{
        try {
          const resp = await authFetch.patch('/api/student/upload-image',{education:selectCategory});
          setOpen(false)
          GetProfileData()
        } catch (error) {
          console.log(error)
        }
      }

      const GetCategoryData =async()=>{
        try {
          const resp = await authFetch('/api/student/all-category');
            let remove = resp.data.data.filter((id) =>(id.title !== "General" ))
            let newData=remove.map(data=>{ return {label:data.title,value:data._id}})
            setCategoryData(newData)
        } catch (error) {
          console.log(error)
        }
      }

      useEffect(() => {
        GetCategoryData()
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="max-w-screen mx-auto">
                <div className="container mx-auto">
                    <div className=" p-4 bg-white border col-span-2">
                    <div className=" border-b border-gray-200 rounded mb-1 ">
                    <span className="flex justify-end -mt-1 -mr-1 text-xl">
                            <i onClick={() => setOpen(false)} className="fa-solid fa-xmark"></i>
                        </span>
                        <div className="grid grid-cols-2">
                        <div className=" text-sm text-gray-500">
                        <Dialog.Title as="h2" className=" text-lg font-normal text-blue-600 -mt-6 mb-1">
                        Add Area of Interest
                        </Dialog.Title>
                        </div>
                        <div className="text-sm text-end" />
                        </div>
                        <hr />
                        <br />
                    <div className="mb-10">  
                        <Select options={categoryData} value={selectCategory} onChange={values => setSelectCategory(values)} className="bg-gray-50 border mr-10 border-gray-300 text-gray-900 text-lg font-normal rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                        components={animatedComponents} placeholder="Select a Category" isMulti required/>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={SubmitProfileData}
                        >
                        Submit
                        </button>
                        <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                        >
                        Cancel
                        </button>
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