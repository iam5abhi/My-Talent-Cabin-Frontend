import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router';
import { authFetch } from '../../Middleware/axios/intance';
import { Breathing } from 'react-shimmer'
import { NavLink } from 'react-router-dom';
import Message from '../../features/Message';
import profileImage from '../../Assets/Images/avatar.png'
import flag from '../../Assets/Images/flag.png'
import skillabs from '../../Assets/Images/skill.png'



const StudentHome = () => {
  const navigate = useNavigate()
  const [profileData,setProfileData]=useState()
  const [projects,setProjects]=useState([])
  const [acceptProjects,setAcceptProjects]=useState([]) 
  const[shimmer,setShimmer]=useState(true)
  const [message,setMessage]=useState({message:'',type:''})


  const GetProfileyData = async ()=>{
    try {
      const resp = await authFetch.get(`/api/student/profile`);
      setProfileData(resp.data.data)
      setTimeout(() => {
        setShimmer(false)
      }, 100);
    } catch (error) {
      setMessage({message:error,type:false})
      setTimeout(() => {
        setShimmer(false)
      },100);
    }
  }
  
  const GetProjects = async ()=>{
    try {
      const resp = await authFetch.get(`/api/student/get-project`);
      setProjects(resp.data.data)
    } catch (error) {
      setMessage({message:error,type:false})
    }
  }

  const GetAcceptProjects = async ()=>{
    try {
      const resp = await authFetch.get(`/api/student/get-project-accept-data`);
      setAcceptProjects(resp.data.data)
    } catch (error) {
      console.log(error)
    }
}

  useEffect(() => {
      GetProfileyData()
      GetProjects()
      GetAcceptProjects()
  },[])

  return (
        <>
        {message.type !==''?message.type===false?
          <Message message={message.message} css='flex p-4 mb-1 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-gray-800 dark:text-red-400' />
          :
          <Message message={message.message} css='flex p-4 mb-1 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-gray-800 dark:text-green-400' />
        :null}
        {shimmer===true?<Breathing width={1500} height={1000} />:null}
        {!profileData?null:profileData.Category.length==0 && profileData.education.length==0?navigate('/auth/student/profile'):
          <div className="flex min-h-full items-center justify-center  bg-orange-100/50 p-5 ">
          <div className="w-full  space-y-8  rounded-lg md:px-5 px-2 md:py-5 py-2 ">
            <section className="border md:border-gray-200 border-0 rounded-lg ">
              <br />
                <div className="hidden md:block">
                <div className="grid gap-3  md:gap-6 mb-6 grid-cols-2 md:grid-cols-4 ">
                  <div className>
                  <div onClick={()=>navigate(`/auth/student/view-profile/${profileData.StudentId._id}`)} className="block max-w-sm md:p-10 p-3 bg-gradient-to-r from-orange-500 to-orange-700 border border-gray-200 hover:bg-gradient-to-l from-orange-500 to-orange-700 rounded-lg shadow-md hover:bg-gray-100">
                      <div className="flex items-center space-x-2">
                        <img className="w-20 h-20 rounded-full" src={!profileData.avatar?profileImage:profileData.avatar} alt />
                        <div className="font-medium ">
                          <div className="text-md font-bold text-white ">{profileData.StudentId.name.toUpperCase()} </div>
                          <div className="text-sm text-white ">STUDENT </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                  <NavLink to="/auth/student/projects" className="block max-w-sm md:p-7 p-3 bg-white border border-orange-200  rounded-lg shadow-md hover:bg-orange-100">
                      <div className="text-3xl text-orange-600 hover:text-orange-400 w-14 h-14 flex justify-center items-center rounded-full md:mb-3 mb-1 mx-auto">
                        <i className="fa-solid fa-magnifying-glass" />
                      </div>
                      <div>
                        <h5 className="mb-2 text-xl md:text-xl text-center font-bold tracking-tight text-gray-900 ">
                          Find your activity</h5>
                      </div>
                    </NavLink>
                  </div>
                  <div>
                  <NavLink to='' className="block max-w-sm md:p-7 p-3 bg-white border border-orange-200  rounded-lg shadow-md hover:bg-orange-100">
                      <div className="text-3xl text-orange-600 hover:text-orange-400 w-14 h-14 flex justify-center items-center rounded-full md:mb-3 mb-1 mx-auto">
                        <i className="fa-solid fa-rotate" />
                      </div>
                      <div>
                        <h5 className="mb-2 text-xl md:text-xl text-center font-bold tracking-tight text-gray-900 ">
                          Track Progress</h5>
                      </div>
                    </NavLink>
                  </div>
                  <div>
                  <NavLink to="/auth/student/profile/achievements" className="block max-w-sm md:p-7 p-3 bg-white border border-orange-200  rounded-lg shadow-md hover:bg-orange-100">
                      <div className="text-3xl  text-orange-600 hover:text-orange-400 w-14 h-14 flex justify-center items-center rounded-full md:mb-3 mb-1 mx-auto">
                        <i className="fa-solid fa-trophy" />
                      </div>
                      <div>
                        <h5 className="mb-2 text-xl md:text-xl text-center font-bold tracking-tight text-gray-900 ">
                          Achievement</h5>
                      </div>
                    </NavLink>
                  </div>
                  <div>
                  </div>
                </div>
              </div>

                {/*-------------------MOBILE VIEW*/}
                <div className="block md:hidden">
                  <div className="grid gap-3  mb-6 grid-cols-4  ">
                    <div className>
                      <NavLink to="/auth/student/profile" className="block max-w-sm   border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <div className="text-3xl bg-gray-100  bg-white text-orange-600 w-14 h-14 flex justify-center items-center rounded-full  mx-auto">
                          <i className="fa-solid fa-user " />
                        </div>
                      </NavLink>
                    </div>
                    <div>
                      <NavLink to="/auth/student/projects" className="block max-w-sm   border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <div className="text-3xl bg-white text-orange-600 w-14 h-14 flex justify-center items-center rounded-full  mx-auto">
                          <i className="fa-solid fa-magnifying-glass" />
                        </div>
                      </NavLink>
                    </div>
                    <div>
                      <NavLink to="/auth/student/my-project" className="block max-w-sm border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <div className="text-3xl bg-white text-orange-600 w-14 h-14 flex justify-center items-center rounded-full  mx-auto">
                          <i className="fa-solid fa-rotate" />
                        </div>
                      </NavLink>
                    </div>
                    <div>
                      <NavLink to="" className="block max-w-sm   border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <div className="text-3xl bg-white text-orange-600 w-14 h-14 flex justify-center items-center rounded-full  mx-auto">
                          <i className="fa-solid fa-trophy" />
                        </div>
                      </NavLink>
                    </div>
                    <div>
                    </div>
                  </div>
                </div>
                {/*-------------------MOBILE VIEW END*/}
              </section>
              {/*-------------------Pending Project--------------------------*/}
               {!projects?null:projects.length==0?null:<div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                    <div>
                    <h2 className="text-4xl font-semibold leading-tight text-center underline ">Pending Project</h2>
                    </div>
                    <br/>
                    {projects.map((request)=>{
                        return request.applied.map((data)=>{
                            return <> <div className="border border-gray-200 rounded pt-10 pb-5 bg-white">
                              <div key={data._id} className="flex justify-between p-6 rounded-md mb-5">
                                  <div className='flex justify-start ml-5'>
                                      <div >
                                          <img src={skillabs} className='w-48 h-36' />
                                      </div>
                                      <div className='ml-5'>
                                      <h4 className="text-gray-900 font-semibold text-2xl">{request.title.toUpperCase()}</h4>
                                      <p className="text-gray-900 text-lg"><span className='font-semibold'>Company Name :</span> {request.userId.name.toUpperCase()}</p>
                                      </div>
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
                                      <button type="button" className="text-white bg-green-700 hover:bg-green-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs md:text-sm md:px-4 px-2 py-1 md:mr-2 mr-0 ">Upload Assignment</button>
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
              } 
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
            </div>
          </div>
        }
    </>
  )
}

export default StudentHome;