import React, { useState } from 'react'
import { authFetch } from "../../../Middleware/axios/intance"
import { useNavigate } from 'react-router-dom'
import { Token } from '../../../features/Token'
import Message from '../../../features/Message'

const Requirement = () => {
    const navigate = useNavigate()
    const [requirementData,setRequirementData]=useState()
    const [message,setMessage]=useState({message:'',type:''})


    const GetRequirementData = async ()=>{
        try {
          const resp = await authFetch('/student/internship');
          setRequirementData(resp.data)
        } catch (error) {
          console.log(error)
        }
      }
    
      React.useEffect(() => {
        GetRequirementData()
      },[])
  return (
        <>
        <div className="px-2 py-4 max-w-screen-xl mx-auto">
        {message.type !==''?message.type===false?
        <Message message={message.message} css='flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg' />
        :
        <Message message={message.message} css='flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg' />
        :null}
        <h5 className="mt-5 text-2xl font-bold tracking-tight text-gray-900">Internship's</h5>
            <div className="grid grid-cols-3 gap-4 px-6  py-6">
                {!requirementData?null:requirementData.map((datas)=>{
                    return <div className="text-center">
                    <span className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{datas.title}</h5>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{datas.location}</h5>
                        <button type="button" onClick={()=>navigate(`/auth/student/view-internship/${datas._id}`)} className="text-white text-end bg-orange-600 hover:bg-orange-400 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none">Apply</button>
                    </span>
                    </div>
                })}
            </div> 
        </div>
    </>
  )
}

export default Requirement