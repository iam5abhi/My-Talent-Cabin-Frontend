import React,{useEffect,useState} from 'react';
import '../../../Assets/Style/Mentor_request.scss';
import { authFetch } from '../../../Middleware/axios/intance';
import { useNavigate } from 'react-router-dom';

const Myproject = () => {
    const navigate = useNavigate()
    const [projects,setProjects]=useState()


    const GetProjects = async ()=>{
        try {
          const resp = await authFetch.get(`/api/student/get-project-accept-data`);
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
                    <h2 className="text-4xl font-semibold leading-tight text-center underline ">Upload Assginment</h2>
                </div>
                <br/>
                 {!projects?null:projects.map((request)=>{
                    return request.applied.map((data)=>{
                        return <> <div key={data._id} className="container mx-auto sm:px-8">
                        <div className="flex justify-between border border-5 p-6 rounded-md mb-5">
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
                        </div>
                        </> 
                 })
                })}
            </div>
        </div>
    </>
  )
}

export default Myproject;