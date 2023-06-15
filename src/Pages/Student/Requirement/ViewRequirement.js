import React, { useState,useEffect } from 'react'
import { authFetch } from '../../../Middleware/axios/intance'
import { Breathing } from 'react-shimmer'
import { useParams ,useNavigate } from 'react-router-dom'



const ViewRequirement = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const [singleProjectData,setSingleProjectData]=useState()
  const [description,setDescription]=useState()
  
  console.log(singleProjectData,"singleProjectData")
  const DescriptionHandle =()=>{
    let description =singleProjectData.description.split(".")
        description.pop()
    setDescription(description)
   }

  const ApplySubmitData =async(id)=>{
  // if(Token()){
      try {
          const resp = await authFetch.post(`/api/student/get-job-application/${id}`);
          // setMessage({message:"Apply Successfully",type:true})
          // GetRequirementData()
        
        } catch (error){} 
        
      // }else{
      //     navigate('/login')
      // }
  }

  const GetSingleProject =async()=>{
    try {
      const resp = await authFetch(`/student/internship/${id}`);
      const project =  resp.data.reduce((acc, curr) => {
        acc["data"] = curr;
        return acc;
      }, {});
      setSingleProjectData(project.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    GetSingleProject()
  },[])

  useEffect(() => {
    if(singleProjectData){
        DescriptionHandle()
    }
  },[singleProjectData])
  return (
        <>
        <div className="flex min-h-full items-center justify-center  px-4 sm:px-6 lg:px-8 ">
            <div className="w-full  space-y-8  rounded-lg px-5 py-5 ">
            <section className="border border-gray-200 rounded-lg px-4 py-5">
                <div className="grid grid-cols-2 gap-20  ">
                <div>
                    <h2 className=" text-start text-3xl font-bold tracking-tight text-gray-900">{!singleProjectData?<Breathing width={800} height={100} />:singleProjectData.title.toUpperCase()}</h2>
                </div>
                </div>
                <br />
                <div>
                {!singleProjectData?<Breathing width={1200} height={1000} />:singleProjectData.skilldata.map((tag,index)=>{
                    return <span key={index+1} className="bg-orange-100 text-orange-600 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-orange-600 dark:text-orange-300">{tag.name}</span>
                })}
                </div>
                <br />
                <hr />
                <br />
                <div>
                  <h3 className='text-start text-2xl font-bold tracking-tight text-gray-900 mb-6 underline'>Project Description</h3>  
                {!description?<Breathing width={1200} height={1000} />:description.map((data,index)=>{
                    return <p key={index+1} className="break-word mt-2 mb-2 max-w-screen-md text-sm text-gray-600 leading-6">{index+1}. {data} </p>
                })}
                </div>
                <br/>
                <div>
              <textarea id="message" name='description' rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500 " placeholder="Write your project description here..." defaultValue={""} />
            </div>
            <div className="text-center mt-5">
                <button type="button" className="text-white text-end bg-orange-600 hover:bg-orange-400 focus:ring-4 focus:ring-orange-300 font-medium rounded-full text-md px-20 py-3 mr-2 mb-2">Add Project</button>
              </div>
            </section>
            </div>
        </div>
    </>
  )
}

export default ViewRequirement;