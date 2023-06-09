import React, { useState } from 'react'
import { Fragment, useRef} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { authFetch } from '../../../Middleware/axios/intance'
import ReactPlayer from 'react-player'
import { ToastError } from '../../../features/DisplayMessage'


export default function CompanyViewModal ({setOpen,open,id}) {
  const cancelButtonRef = useRef(null)
  const [hrsData,setHrsData]=useState()

  const GetSingleDocterData =async ()=> {
      try {
        const res = await authFetch(`/admin/company/${id}`);
        setHrsData(res.data.data);
        } catch (error) { ToastError(error.data.message) }
  }

  React.useEffect(()=>{
    GetSingleDocterData();
  },[id])

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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
              <div className="max-w-screen mx-auto">
                <div className="container mx-auto">
                  <div className=" col-span-2">
                    <div className=" border-b border-gray-200 rounded">
                      <div className="grid grid-cols-2 shadow-lg">
                        <div className="p-2 ml-2 mt-2">
                        <Dialog.Title as="h2" className=" text-lg text-blue-500 font-semibold">
                         Profile
                        </Dialog.Title>
                        </div>
                        <div className="text-sm text-end p-2 mr-2 mt-2">
                        <span className="flex justify-end mb-2 -mr-1 ">
                          <i onClick={() => setOpen(false)} className="fa-solid fa-xmark text-xl font-extrabold"></i>
                        </span>
                        </div>
                      </div>  
                      <div className="container  w-11/15 mx-auto px-4 bg-white rounded ">
                    <div className="relative flex flex-col flex-auto min-w-0 mt-4 p-4 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border mb-4 draggable" draggable="true">
                    <div className="flex flex-row">
                        {/*-----------COLUMN 1st*/}
                        <div className="basis-1/2">
                        <div className="flex flex-wrap -mx-3">
                            <div className="flex-none w-auto max-w-full px-3">
                            <div className="relative">
                                <img className=" w-32 h-32 " src={!hrsData?null:hrsData.avatar} alt />
                            </div>
                            </div>
                            <div className="flex-none w-auto max-w-full px-3 my-auto">
                            <div className="h-full">
                                <h5 className="mb-1 text-2xl font-semibold">{!hrsData?null:hrsData.name}</h5>
                                <p className="mb-0  leading-normal text-slate-600 text-size-sm">Online end to end solution</p>
                            </div>
                            <div className="flex items-center">
                                <div>
                                <span>5.0&nbsp;</span>
                                <i className="fa-solid fa-star w-5 h-5 text-yellow-400 " />
                                <i className="fa-solid fa-star w-5 h-5 text-yellow-400" />
                                <i className="fa-solid fa-star w-5 h-5 text-yellow-400" />
                                <i className="fa-solid fa-star w-5 h-5 text-yellow-400" />
                                <i className="fa-solid fa-star w-5 h-5 text-yellow-400" />
                                </div>
                            </div>
                            <div className="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-4/12">
                            </div>
                            </div>
                        </div>
                        </div>
                        {/*-----------COLUMN 2nd*/}
                        <div className="basis-1/2">
                        <div className="flex flex-wrap -mx-3 justify-end items-end">
                            <div className="flex-none w-auto max-w-full px-3">
                            <p className="mb-1 mt-9 text-md font-semibold">Follow us:</p>
                            <div className="flex items-center">
                                <a href="https://www.linkedin.com/company/codesoftic" className="text-gray-500 hover:text-gray-900 dark:hover:text-white" target="_blank">
                                <img className="w-8 h-8" src='/img/linkedin.png'/>
                                </a>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                {/*------------------------profile*/}
                {/*------------------------Overview*/}
                <div className="container  w-11/15 mx-auto px-4  mt-4 border border-slate-300 bg-white rounded ">
                    <div className="relative flex flex-col flex-auto min-w-0 mt-4 p-4 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border mb-4 draggable" draggable="true">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2 ...">
                        <div className="h-full mb-4">
                            <h5 className="mb-1 text-xl font-semibold">Overview</h5>
                        </div>
                        </div>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                        <ReactPlayer controls width={400} url={hrsData?hrsData.video_url:null} />   
                        </div>
                        <div>
                        <p className="text-justify">{hrsData?hrsData.bio:null}</p>
                        </div>
                        <div>
                        </div>
                    </div>
                    </div>
                    {/*------------------------Overview*/}
                    {/*------------------------Current HRs*/}
                    <div className="container w-11/15 mx-auto mb-6 px-4 border border-slate-300 bg-white rounded ">
                    <div className="relative flex flex-col flex-auto min-w-0 p-4 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border draggable" draggable="true">
                        <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2 ...">
                            <div className="h-full mb-2">
                            <h5 className="mb-1 text-xl font-semibold">Current Company</h5>
                            </div>
                        </div>
                        </div>
                        <div className="grid gap-2 md:grid-cols-4">
                        {!hrsData?null:
                        hrsData.hr.map((data)=>{
                            return(
                            <div className="p-3 gap-4 relative bg-white rounded-xl shadow-lg flex items-center border border-gray-300">
                            <div>
                            <img className=" w-24 h-24 rounded-full" src={data.image} alt />
                            </div>
                            <div>
                            <div className="text-md font-medium text-black">{data.name}</div>
                            <p className="text-slate-500 text-sm">{data.designation}</p>
                            </div>
                            </div>
                            )
                        })}
                        <div>
                        </div>
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
