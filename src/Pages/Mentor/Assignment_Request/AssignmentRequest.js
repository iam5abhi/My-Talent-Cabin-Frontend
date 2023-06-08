import React,{useEffect,useState} from 'react';
import '../../../Assets/Style/Mentor_request.scss';
import { authFetch } from '../../../Middleware/axios/intance';
import img from "../../../Assets/Images/project.png"


const AssignmentRequest = () => {
    const [mentorRequest,setMentorRequest]=useState()
    const [review,setReview]=useState()

   
    const GetMentorRequest = async ()=>{
        try {
          const resp = await authFetch.get(`/api/mentor/get-project-accepted-data`);
          setMentorRequest(resp.data.data)
        } catch (error) {
          console.log(error)
        }
    }  
    
    const SubmitMentorRequest = async (event,sid,pid)=>{
        event.preventDefault();
        try {
          const resp = await authFetch.patch(`/api/mentor/project-review/${pid}`,{review:review,studentId:sid,});
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
                <h2 className="text-4xl font-semibold leading-tight text-center underline ">Assignment Request</h2>
                </div>
                <br/>
                 {!mentorRequest?null:mentorRequest.map((request)=>{
                    return request.applied.map((data)=>{
                        return request.assiment.map((datas)=>{ 
                            return <div key={data._id} className="container mx-auto sm:px-8 border border-5 p-6 rounded-md mb-5">
                                <div className="grid mb-6 md:grid-cols-2">
                                    <div className='flex justify-start ml-5'>
                                        <div >
                                            <img src={img} className='w-48 h-36' />
                                        </div>
                                        <div className='ml-5'>
                                        <h4 className="text-gray-900 font-semibold text-2xl">{request.title.toUpperCase()}</h4>
                                        <p className="text-gray-900 text-lg"><span className='font-semibold'>Company Name :</span> {request.userId.name.toUpperCase()}</p>
                                        <p className="text-gray-900 text-lg"><span className=' font-semibold'>Student Name :</span> {data.student.name}</p>
                                        <p className="text-gray-900 font-semibold text-orange-600 text-lg">View Details</p>
                                        </div>
                                    </div>
                                    <div className='ml-5'>
                                        <h4 className="text-gray-900 font-semibold text-2xl">Project Summary</h4>
                                            <p className="text-gray-900 mt-1">{datas.projectsumary}</p>
                                    </div>
                                </div>
                                <form onSubmit={(event)=>SubmitMentorRequest(event,data.student._id,request._id)}>
                                <div className="mb-6 mt-3">
                                    <textarea type="text" id="name" onChange={(e)=>setReview(e.target.value)} name='name' rows={5} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Enter Project Reviews" required />
                                </div>
                                <div className='mt-3 text-center'>
                                    <button type="submit" className="text-white text-end bg-orange-600 hover:bg-orange-400 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800">Submit Assginment</button>
                                </div>
                                </form>
                                </div>
                        })
                 })
                })}

            </div>
        </div>
    </>
  )
}

export default AssignmentRequest;