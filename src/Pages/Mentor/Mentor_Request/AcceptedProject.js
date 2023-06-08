import React,{useEffect,useState} from 'react';
import '../../../Assets/Style/Mentor_request.scss';
import { authFetch } from '../../../Middleware/axios/intance';
import img from "../../../Assets/Images/project.png"
import { useNavigate } from 'react-router-dom';

const AcceptedProject = () => {
    const navigate = useNavigate()
    const [mentorRequest,setMentorRequest]=useState()


    const GetMentorRequest = async ()=>{
        try {
          const resp = await authFetch.get(`/api/mentor/get-project-accepted-data`);
          setMentorRequest(resp.data.data)
        } catch (error) {
          console.log(error)
        }
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    
    useEffect(() => {
        GetMentorRequest()
    },[])
  return (
        <>
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <div>
                <h2 className="text-4xl font-semibold leading-tight text-center underline ">My Project</h2>
                </div>
                <br/>
                 {!mentorRequest?null:mentorRequest.map((request)=>{
                    return request.applied.map((data)=>{
                        return <> <div key={data._id} className="container mx-auto sm:px-8">
                        <div className="flex justify-between border border-5 p-6 rounded-md mb-5">
                            <div className='flex justify-start ml-5'>
                                <div >
                                    <img src={img} className='w-48 h-36' />
                                </div>
                                <div className='ml-5'>
                                <h4 onClick={() => navigate(`/auth/mentor/view-project/${request._id}`)} className="text-gray-900 font-semibold text-2xl"><span className='cursor-pointer text-blue-600'>{request.title.toUpperCase()}</span></h4>
                                <p onClick={() => navigate(`/auth/campus/view-profile/${request.userId._id}`)} className="text-gray-900 text-lg"><span className='font-semibold'>Company Name :</span> <span className='cursor-pointer text-blue-600'>{request.userId.name.toUpperCase()}</span></p>
                                <p onClick={() => navigate(`/auth/student/view-profile/${data.student._id}`)} className="text-gray-900 text-lg"><span className=' font-semibold'>Student Name :</span> <span className='cursor-pointer text-blue-600'>{data.student.name}</span></p>
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

export default AcceptedProject;