import React, { useState } from 'react';
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { authFetch } from "../../../Middleware/axios/intance"
import Message from '../../../features/Message';


export default function StudentStatusModal({setOpen,open,id,GetStudentData}) {
  const cancelButtonRef = useRef(null)
  const [status, setStatus]=useState()
  const [message,setMessage]=useState({message:'',type:''})
 
  const StatuSubmitHandler = async ()=> {
    try {
      const resp = await authFetch.patch(`/admin/user-status/${id}`,{status:status});
      setMessage({message:resp.data.message,type:true})
      setTimeout(() => {
        setOpen(false)
        GetStudentData()
        setMessage({message:'',type:''})
      },1000);
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
            <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full md:max-w-xl">
            <div className="max-w-screen mx-auto">
              <div className="container mx-auto">
                <div className="col-span-2">
                  <div className=" border-b border-gray-200 rounded">
                      <div className="text-end p-2">
                        <i onClick={() => setOpen(false)} className="fa-solid fa-xmark text-xs font-extrabold bg-gray-400 h-5 leading-5 w-5 z-50 rounded-full text-center text-white"></i>
                      </div>
                      <Dialog.Title as="h2" className=" text-xl text-center font-semibold">
                        Status
                      </Dialog.Title>  
                      <div className="container w-11/15 mx-auto px-4 bg-white rounded ">
                        <div className="relative flex flex-col flex-auto min-w-0 mt-2 p-4 break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border mb-4 draggable" draggable="true">
                            <div >
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status <span class="text-red-600">*</span></label>
                             <select id="Status" onChange={(e)=>setStatus(e.target.value)} defaultValue={"status"} name='status' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3" >
                                <option value='status' >Choose a Status</option>
                                <option value="active">Active</option>
                                <option value="onhold">OnHold</option>
                                <option value="terminate">Terminate</option>
                                <option value="deactive">Deactive</option>
                             </select>
                            </div><br />
                            <div className='grid justify-items-center'>
                              <button type="button" onClick={StatuSubmitHandler} className="text-white text-end bg-blue-600 hover:bg-blue-400
                                focus:ring-4 focus:ring-blue-300 font-semibold rounded-full text-lg px-12 py-2.5 mr-2 mb-2 focus:outline-none">Update Status</button>
                            </div>
                        </div>
                      </div>
                      {message.type !==''?message.type===false?
                      <Message message={message.message} css='flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg' />
                      :
                      <Message message={message.message} css='flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg' />
                      :null}
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
