import React, { useState,useEffect } from 'react'
import { authFetch } from '../../../Middleware/axios/intance'
import { Breathing } from 'react-shimmer'
import { useParams } from 'react-router-dom'



const ViewRequirement = () => {
  const {id} = useParams()
  const [singleProjectData,setSingleProjectData]=useState()
  const [description,setDescription]=useState()
  

  const DescriptionHandle =()=>{
    let description =singleProjectData.description.split(".")
        description.pop()
    setDescription(description)
   }

  const GetSingleProject =async()=>{
    try {
      const resp = await authFetch(`/api/student/get-job-application/${id}`);
      setSingleProjectData(resp.data.data)
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
            <section className="border border-gray-200 rounded-lg px-4 py-10">
                <div className="grid grid-cols-2 gap-20  ">
                <div>
                    <h2 className=" text-start text-3xl font-bold tracking-tight text-gray-900">{!singleProjectData?<Breathing width={800} height={100} />:singleProjectData.title.toUpperCase()}</h2>
                </div>
                </div>
                <br />
                <div>
                {!singleProjectData?<Breathing width={1200} height={1000} />:singleProjectData.tags.map((tag,index)=>{
                    return <span key={index+1} className="bg-orange-100 text-orange-600 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-orange-600 dark:text-orange-300">{tag.name}</span>
                })}
                </div>
                <br />
                <hr />
                <br />
                <br />
                <div>
                  <h3 className='text-start text-2xl font-bold tracking-tight text-gray-900 mb-6 underline'>Project Description</h3>  
                {!description?<Breathing width={1200} height={1000} />:description.map((data,index)=>{
                    return <p key={index+1} className="break-word mt-2 mb-2 max-w-screen-md text-sm text-gray-600 leading-6">{index+1}. {data} </p>
                })}
                </div>
            </section>
            </div>
        </div>
    </>
  )
}

export default ViewRequirement;