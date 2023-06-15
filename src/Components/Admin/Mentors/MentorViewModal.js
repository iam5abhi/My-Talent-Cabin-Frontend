import React, { useState, useEffect } from 'react'
import { Fragment, useRef} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { authFetch } from '../../../Middleware/axios/intance'
import { ToastError } from '../../../features/DisplayMessage'


export default function MentorViewModal ({setOpen,open,id}) {
  const cancelButtonRef = useRef(null)
  const [studentData,setStudentData]=useState()

    console.log(studentData,"---------")
    const GetSingleDocterData = async ()=> {
        try {
        const res = await authFetch(`/admin/mentor/${id}`);
        setStudentData(res.data.data)
        } catch (error) { ToastError(error) }
    }

    useEffect(()=>{
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
                      <div>
                      {/*------------------------profile*/}
                      <div className="container w-11/15 mx-auto px-4 bg-white rounded ">
                          <div className="relative flex flex-col flex-auto min-w-0 mt-4 p-4 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border mb-4 draggable" draggable="true">
                              <div className="flex flex-wrap -mx-3">
                                  <div className="flex-none w-auto max-w-full px-3">
                                      <div className="relative">
                                          <img className=" w-32 h-32  rounded-full" src={!studentData?null:studentData.avatar} alt />
                                          <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full" />
                                      </div>
                                  </div>
                                  <div className="flex-none w-auto max-w-full px-3 my-auto">
                                      <div className="h-full">
                                          <h5 className="mb-1 text-2xl font-semibold">{!studentData?null:studentData.name}</h5>
                                          <p className="mb-0  leading-normal text-slate-600 text-size-sm"><i className="fa-solid fa-location-dot" /> Mohali,
                                              Sector 66</p>
                                      </div>
                                  </div>
                                  <div className="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-4/12">
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="container w-11/15 mx-auto p-4 mt-4 border border-slate-300 bg-white rounded ">
                          <div className=" grid grid-cols-3 gap-4 border-r">
                              <div className=" col text-sm font-medium text-slate-600">
                                  <div className="grid grid-cols-3 gap-4 bg-slate-100">
                                      <div>
                                          <h5 className="p-2 font-medium leading-tight text-xl mt-0 mb-2 text-black">Language</h5>
                                      </div>
                                  </div>
                                  <hr />
                                  <div className="ml-2 p-4 grid grid-cols-2 gap-4">
                                      <div className>
                                          {!studentData?null:
                                          studentData.language.map((lang,index)=>{
                                              return(
                                              <ul className="list-none font-normal  text-base text-black">
                                                  <li>{index+1}. {lang}</li>
                                              </ul>
                                              )
                                          })}
                                          
                                      </div>
                                  </div>
                              </div>
                              <div className=" col-span-2 text-sm font-medium text-slate-600 ">
                                  <div className="grid grid-cols-1 gap-4 bg-slate-100">
                                      <div>
                                          <h5 className="p-2 font-medium leading-tight text-xl mt-0 mb-2 text-black">Bio</h5>
                                      </div>
                                  </div>
                                  <hr />
                                  <div className="ml-2 p-4 grid grid-cols-2 gap-4">
                                      <div className="col-span-2">
                                          <p className=" font-normal text-base text-black">{!studentData?null:studentData.bio}</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <br />
                          {/*------------------------------------------------------------ROW1*/}
                          {/*------------------------------------------------------------ROW2*/}
                          <div className=" grid grid-cols-3 gap-4 border-r">
                              <div className=" col text-sm font-medium text-slate-600">
                                  <div className="grid grid-cols-3 gap-4 bg-slate-100">
                                      <div>
                                          <h5 className="  p-2 font-medium leading-tight text-xl mt-0 mb-2 text-black">Skills</h5>
                                      </div>
                                  </div>
                                  <hr />
                                  <div className="ml-2 p-4 grid grid-cols-3 gap-4">
                                      <div className="col-span-2">
                                      {!studentData?null:
                                          studentData.skills.map((skill)=>{
                                              return(
                                          <ul className="list-none font-normal  text-base text-black">
                                              <li className="rounded-full  text-center bg-blue-100 text-blue-800 my-2">
                                                  <span>{skill}</span>
                                              </li>
                                          </ul>
                                              )
                                          })}
                                      </div>
                                  </div>
                              </div>
                              <div className="col-span-2 text-sm font-medium text-slate-600 ">
                                  <div className="grid grid-cols-2 gap-4 bg-slate-100">
                                      <div>
                                          <h5 className="  p-2 font-medium leading-tight text-xl mt-0 mb-2 text-black">Education</h5>
                                      </div>
                                  </div>
                                  <hr />
                                  <div className="ml-2 p-4 grid grid-cols-1 gap-2">
                                      <div>
                                      {!studentData?null:
                                          studentData.experience.map((educa)=>{
                                              return(
                                                  <div className="grid grid-cols-5 gap-4">
                                                  <div className="col-span-4 ...">
                                                      <p className=" text-black text-base ">{educa.position}</p>
                                                      <p className="  font-normal text-blue-800 text-base ">{educa.company}</p>
                                                      <p className="   font-normal  text-black text-slate-600"><i className="fa-solid fa-calendar-days" /> {educa.startDate}
                                                          - {educa.endDate}</p>
                                                  </div>
                                              </div>
                                              )
                                          })}
                                        <br />
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <hr />
                          <br />
                          <br />
                      </div>
                      {/*------------------------------------------------------------ROW2*/}
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
