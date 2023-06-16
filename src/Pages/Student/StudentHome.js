import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router';
import { authFetch } from '../../Middleware/axios/intance';

const StudentHome = () => {
  const navigate = useNavigate()
  const [projects,setProjects]=useState([])
  const [message,setMessage]=useState({message:'',type:''})

  const GetProjects = async ()=>{
    try {
      const resp = await authFetch.get(`/api/student/get-project`);
      setProjects(resp.data.data)
    } catch (error) {
      setMessage({message:error,type:false})
    }
  }

  useEffect(() => {
      GetProjects()
  },[])

  return (
       <>
       Student Home
       <div className="container mx-auto px-4 sm:px-8">
                  <div className="">
                      {!acceptProjects?null:acceptProjects.map((request)=>{
                          return request.applied.map((data)=>{
                              return <>
                              <div className="border border-gray-200 rounded pt-10 pb-5 mb-5 bg-white">
                              <div key={data._id} className="flex justify-between px-14 mb-2">
                                  <div className='flex justify-start ml-5'>
                                      <div className='ml-5'>
                                          <h4 className="text-gray-900 font-semibold text-2xl">{request.title.toUpperCase()}</h4>
                                          <p className="text-gray-900 text-lg"><span className='font-semibold'>Company Name :</span> {request.userId.name.toUpperCase()}</p>
                                      </div>
                                  </div>
                                  <div className='mt-3'>
                                      <button type="button" onClick={()=>navigate(`/auth/student/upload-assignment/${request._id}`,{state:data.mentor})} className="text-white text-end bg-orange-600 hover:bg-orange-400 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800">Upload Assginment</button>
                                  </div>
                              </div>
                                <div className="grid grid-cols-10  md:ml-14 md:py-10 py-4 md:px-4 px-2">
                                  <div className="col-span-1 ">
                                    <div className="flex items-center">
                                      <div className="z-10 flex items-center justify-center md:w-14 w-6 h-6 rounded-full ring-0 ring-white  sm:ring-8  shrink-0">
                                        {/* <i class="fa-solid fa-flag md:text-4xl text-2xl text-green-700"></i> */}
                                        <img src={flag} className="md:-mt-10" />
                                      </div>
                                      <div className=" sm:flex w-full bg-green-700 h-0.5 " />
                                    </div>
                                  </div>
                                  <div className="col-span-3">
                                    <div className="flex items-center">
                                      <div className="z-10 flex items-center justify-center w-6 h-6 bg-green-700 rounded-full ring-0 ring-white   shrink-0">
                                        <i className="fa-solid fa-check text-white" />
                                      </div>
                                      <div className=" sm:flex w-full bg-green-700 h-0.5 " />
                                    </div>
                                    <div className="mt-3 sm:pr-8">
                                      <h3 className="md:text-lg text-center text-sm font-semibold text-gray-900 ">{request.title.toUpperCase()}
                                      </h3>
                                    </div>
                                  </div>
                                  <div className="md:col-span-3 col-span-2">
                                    <div className="flex items-center">
                                      <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white    shrink-0">
                                        <div className="z-10 flex items-center justify-center w-6 h-6 bg-green-700 rounded-full ring-0 ring-white   shrink-0">
                                          <i className="fa-solid fa-check text-white" />
                                        </div>
                                      </div>
                                      <div className="sm:flex w-full bg-green-700 h-0.5" />
                                    </div>
                                    <div className="mt-3 sm:pr-8">
                                      <h3 className="md:text-lg text-sm text-center  font-semibold text-gray-900 ">Test</h3>
                                    </div>
                                  </div>
                                  <div className="col-span-2 ">
                                    <div className="flex items-center">
                                      <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white    shrink-0">
                                        <div className="z-10 flex items-center justify-center w-6 h-6 bg-green-700 rounded-full ring-0 ring-white  shrink-0">
                                          <i className="fa-solid fa-check text-white" />
                                        </div>
                                      </div>
                                      <div className=" sm:flex w-full bg-green-700 h-0.5 " />
                                    </div>
                                    <div className="mt-3 sm:pr-8">
                                      <h3 className="md:text-lg text-sm text-center font-semibold text-gray-900 ">Approval</h3>
                                    </div>
                                  </div>
                                  <div className="md:col-span-1 col-span-2 ">
                                    <div className="flex items-center">
                                      <div className="z-10 flex items-center justify-center w-6 h-6 md:m-0 ml-3  rounded-full ring-0 ring-white  sm:ring-8  shrink-0">
                                        <button type="button" onClick={()=>navigate(`/auth/student/upload-assignment/${request._id}`,{state:data.mentor})} className="text-white bg-green-700 hover:bg-green-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs md:text-sm md:px-4 px-2 py-1 md:mr-2 mr-0 ">Upload Assignment</button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              </> 
                      })
                      })}
                  </div>
              </div>
       </>
  )
}

export default StudentHome;