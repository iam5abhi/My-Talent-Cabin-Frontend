import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authFetch } from '../../../Middleware/axios/intance'
import Message from '../../../features/Message'
import skillabs from '../../../Assets/Images/skillabs.png'
import image from '../../../Assets/Images/sha (1).jpg'

const StudentProject = () => {
  const navigate = useNavigate()
  const [projectData, setProjectData] = useState()
  const [campusId, setCampusId] = useState()
  const [message,setMessage]=useState({message:'',type:''})

  console.log(campusId,"campusId")
  const GetProjectData = async () => {
    try {
      const resp = await authFetch('/api/student/intership');
      setProjectData(resp.data.data)
    } catch (error) {
      setMessage({message:error,type:false})
    }
  }

  const GetProfileData = async () => {
    try {
      const resp = await authFetch.get(`/api/student/profile`);
      setCampusId(resp.data.data.campus._id)
    } catch (error) {
      setMessage({message:error,type:false})
    }
  }

  useEffect(() => {
    GetProfileData()
    GetProjectData()
  }, [])

  return (
    <>
      {message.type !==''?message.type===false?
        <Message message={message.message} css='flex p-4 mb-1 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-gray-800 dark:text-red-400' />
        :
        <Message message={message.message} css='flex p-4 mb-1 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-gray-800 dark:text-green-400' />
      :null}
      <div className="container w-11/15 mx-auto mt-4 bg-white rounded ">
        <div className="relative flex flex-col flex-auto min-w-0  overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border draggable" draggable="true">
          <div>
            <div className="relative z-0 w-full group">
              <div className="ml-2 p-4 grid grid-cols-1 gap-4">
                <div className="relative flex flex-col flex-auto min-w-0 mt-4 p-4 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border mb-4 draggable" draggable="true">
                  <div className="grid gap-6 mb-6 md:grid-cols-3">
                    {!projectData ? null : projectData.map((data) => {
                      return <div key={data._id} 
                      onClick={() => !campusId ? navigate(`/auth/student/profile`) : navigate(`/auth/student/view-Project-details/${data._id}`)} 
                      className={`bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 ${!campusId?"cursor-not-allowed":"cursor-pointer"}`} title={!campusId?"complete profile first":data.title}>
                        <div className="rounded-t-lg h-32 bg-[#05274A]">
                          {/* <img class="rounded-t-lg h-32 w-full" src={image} /> */}
                        </div>
                        <div className="mx-auto w-72 h-28 relative rounded shadow-lg -mt-20 bg-white border-4 border-white  overflow-hidden">
                          <img className="w-full object-fit pt-4 p-2 ml-2 bg-white " src={skillabs} />
                        </div>
                        <div className="text-center z-10 mt-10 ">
                          <p className="font-normal text-gray-400 text-lg">{data.userId.name}</p>
                          <p className=" text-2xl font-semibold">{data.title}</p>
                        </div>
                        <br />
                        <div className=" mt-10 py-2 text-center border-t  ">
                          <a href="#" className="text-red-500 text-sm font-semibold ">{data.intershipType}</a>
                        </div>
                      </div>
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default StudentProject