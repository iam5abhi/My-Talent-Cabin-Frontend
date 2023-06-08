import React,{useEffect,useState} from 'react';
import '../../../Assets/Style/Mentor_request.scss';
import { authFetch } from '../../../Middleware/axios/intance';
import img from "../../../Assets/Images/project.png"
import { useNavigate } from 'react-router-dom';


const Projects = () => {
  const navigate = useNavigate()
    const [projects,setProjects]=useState()


    const AcceptProjectRequest = async (projectId,studentid)=>{
        try {
          const resp = await authFetch.patch(`/api/enterpricess/get-project/${projectId}`,{studentId:studentid});
          setProjects(resp.data.data)
          GetProjects()
        } catch (error) {
          console.log(error)
        }
    }

    const DeclineProjectRequest = async (projectId,studentid)=>{
      try {
        const resp = await authFetch.patch(`/api/enterpricess/get-project/decline/${projectId}`,{studentId:studentid});
        setProjects(resp.data.data)
        GetProjects()
      } catch (error) {
        console.log(error)
      }
    } 

    const GetProjects = async ()=>{
        try {
            const resp = await authFetch.get(`/api/enterpricess/get-project`);
            setProjects(resp.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        GetProjects()
    },[])

  return (
        <>
         <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <div>
                <h2 className="text-4xl font-semibold leading-tight text-center underline ">Project Request</h2>
                </div>
                <br/>
                 {!projects?null:projects.map((request)=>{
                            return request.applied.map((data)=>{
                                //  if(data.estatus=='pending' && data.Mstatus=='accept'){
                                  return <> <div key={data._id} className="container mx-auto sm:px-8">
                                  <div className="flex justify-between border border-5 p-6 rounded-md mb-5">
                                      <div className='flex justify-start ml-5'>
                                          <div >
                                              <img src={img} className='w-48 h-36' />
                                          </div>
                                          <div className='ml-5'>
                                          <h4 onClick={()=>navigate(`/auth/mentors/view-project/${request._id}`)} className="text-blue-500 font-semibold text-2xl cursor-pointer underline">{request.title}</h4>
                                          <p onClick={()=>navigate(`/auth/mentors/view-profile/${data.mentor._id}`)} className="text-blue-500 text-lg cursor-pointer"><span className='text-gray-900 font-semibold'>Mentor Name :</span> {data.mentor.name}</p>
                                          <p onClick={()=>navigate(`/auth/student/view-profile/${data.student._id}`)} className="text-blue-500 text-lg cursor-pointer"><span className='text-gray-900 font-semibold'>Student Name :</span> {data.student.name}</p>
                                          <p className="text-gray-900 font-semibold text-orange-600 text-lg">View Details</p>
                                          </div>
                                      </div>
                                      <div className="bg-white text-sm text-center mr-14 mt-10">
                                              <div onClick={()=>AcceptProjectRequest(request._id,data.student._id)} className="icon1 icon-fill"><i className="fa fa-solid fa-check" /></div>
                                              <div onClick={()=>DeclineProjectRequest(request._id,data.student._id)} className="icon2 icon-enter"><i className="fa fa-solid fa-xmark" /></div>
                                      </div>
                                  </div>
                              </div>
                              </>
                            // }  
                      })
                    })}
            </div>
        </div>
    </>
  )
}
export default Projects
