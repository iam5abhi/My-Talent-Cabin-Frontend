import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authFetch } from '../../../Middleware/axios/intance';
import { Breathing } from 'react-shimmer';

const ViewNoticeDetails = () => {
    const {id} = useParams()
    const [noticeData, setNoticeData] = useState()
    const [description, setDescription] = useState()
   
    const DescriptionHandle =()=>{
        let description = !noticeData?null:noticeData.description.split(".")
            description.pop()
        setDescription(description)
       }

    const GetNoticeBoardData = async () => {
        try {
            const resp = await authFetch.get(`/api/campus/notice-board/${id}`);
            setNoticeData(resp.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        GetNoticeBoardData()
    }, [])

    useEffect(() => {
        if(noticeData){
            DescriptionHandle()
        }
    }, [noticeData])
   
  return (
        <>
        <div className="flex min-h-full items-center justify-center  px-4 sm:px-6 lg:px-8 ">
            <div className="w-full  space-y-8  rounded-lg px-5 py-5 ">
            <section className="border border-gray-200 rounded-lg px-4 py-10">
              <div className="grid grid-cols-2 gap-20">
                <div>
                    <h2 className=" text-start text-3xl font-bold tracking-tight text-gray-900">{!noticeData?<Breathing width={800} height={100} />:noticeData.title.toUpperCase()}</h2>
                </div>
                </div>
                <br />
                <div>
                    <span className="bg-orange-100 text-orange-600 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-orange-600 dark:text-orange-300">Date : {!noticeData?<Breathing width={800} height={100} />:noticeData.Date.substring(0,10)}</span>
                </div>
                <br />
                <hr />
                <br />
                <br />
                <div>
                    <h3 className='text-start text-2xl font-bold tracking-tight text-gray-900 mb-6 underline'>Project Description</h3>  
                {!description?null:description.map((datas,index)=>{
                    return <p key={index+1} className="break-word mt-2 mb-2 max-w-screen-md text-sm text-gray-600 leading-6">{index+1}. {datas} </p>
                })}
                </div>
            </section>
            </div>
        </div>
    </>
  )
}

export default ViewNoticeDetails