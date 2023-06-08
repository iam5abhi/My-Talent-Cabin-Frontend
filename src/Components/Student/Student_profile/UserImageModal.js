import { Fragment, useRef, useState,useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { authFetch } from '../../../Middleware/axios/intance'


    
export default function UserImageModal({setOpen,open,GetProfileData}) {
    const cancelButtonRef = useRef(null)
    const [uploadImage,setUploadImage]=useState({image:"",avatar:""})
    
    const ImageHandler =(e)=>{
        setUploadImage((pre)=>({
            ...pre,
            avatar:e.target.files[0],
        }))
        let reader = new FileReader();
            reader.onloadend = function() {
                return setUploadImage({...uploadImage,image:reader.result})
            }
            reader.readAsDataURL(e.target.files[0])
    }

    const SubmitProfileData =async()=>{
        try {
          const resp = await authFetch.patch('/api/student/upload-image',{avatar:uploadImage.image});
          setOpen(false)
          GetProfileData()
        } catch (error) {
          console.log(error)
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
                        Upload Image
                        </Dialog.Title>
                        </div>
                        <div className="text-sm text-end" />
                        </div>
                        <hr />
                        <br />
                    <div className="mb-5 text-center">
                        <div className="mx-auto w-32 h-32 mb-2 border rounded-full relative bg-gray-100 mb-4 shadow-inset">
                            <img id="image" className="object-cover w-full h-32 rounded-full" src={uploadImage.image} />
                        </div>
                        <label htmlFor="fileInput" type="button" className="cursor-pointer inine-flex justify-between items-center focus:outline-none border py-2 px-4 rounded-lg shadow-sm text-left text-gray-600 bg-white hover:bg-gray-100 font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" className="inline-flex flex-shrink-0 w-6 h-6 -mt-1 mr-1" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <rect x={0} y={0} width={24} height={24} stroke="none" />
                            <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
                            <circle cx={12} cy={13} r={3} />
                            </svg>						
                            Browse Photo
                        </label>
                        <div className="mx-auto w-48 text-gray-500 text-xs text-center mt-1">Click to add profile picture</div>
                        <input name="photo" id="fileInput" onChange={ImageHandler} accept="image/*" className="hidden" type="file" />
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