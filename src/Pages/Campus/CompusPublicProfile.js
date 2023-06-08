import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authFetch } from '../../Middleware/axios/intance';
import skillabs from '../../Assets/Images/skillabs.png'

const CompusPublicProfile = () => {
    const [profileData, setProfileData] = useState()
    const [noticeData, setNoticeData] = useState()
    const { id } = useParams()
    const navigate = useNavigate()

    const GetProfileData = async () => {
        try {
            const resp = await authFetch.get(`/api/campus/get-collage-public-profile/${id}`);
            setProfileData(resp.data)
        } catch (error) {
            console.log(error)
        }
    } 

    const GetNoticeBoardData = async () => {
        try {
            const resp = await authFetch.get(`/api/campus/notice-board`);
            setNoticeData(resp.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        GetProfileData()
        GetNoticeBoardData()
    }, [])
    return (
        <>
            <div className="bg-cover bg-no-repeat bg-blue-200 bg-left-bottom">
                <div className="flex flex-col py-3 px-6 rounded-t shadow 
                    backdrop-brightness-90 bg-white/60 ">
                    <div className="grid  grid-cols-6">
                        <div className="col-span-1 md:pt-0 pt-2">
                            <img className="w-24 h-14 md:w-56 md:h-28 object-fit bg-white rounded pt-3 border-0 border-orange-500 p-1" src={skillabs} alt="profile" />
                        </div>
                        <div className="md:col-span-1 col-span-2 md:pt-5 pt-1 px-6">
                            <div className="md:text-2xl text-sm font-semibold text-gray-900 ">{!profileData?null:profileData.CampusId.name.toUpperCase()}</div>
                            <div className="md:text-base text-sm text-gray-500 ">{!profileData?null:profileData.location}</div>
                        </div>
                        <div className="md:col-span-4 col-span-3 text-end md:pt-4 pt-2">
                            <div className="md:text-base  text-sm text-gray-500  md:py-2 py-0">{!profileData?null:profileData.website}</div>
                            <div className="md:text-base text-sm text-gray-500  py-2">+91 {!profileData?null:profileData.CampusId.phoneNumber}</div>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
                {/*--------HEADER*/}
                <hr className="border-2 border-gray-100" />
                {/*--------BODY*/}
                <section className=" md:px-28 px-2 bg-gray-100">
                    <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-6 lg:px-6">
                        {/*----- SECTION GRID*/}
                        <div className="grid border border-gray-300 rounded p-4 bg-white">
                            <h2 className=" font-bold text-2xl py-2 px-1 text-white bg-orange-600 rounded">Notice Board</h2>
                            <div className="bg-white p-3 shadow-sm rounded-sm ">
                                <div className="grid grid-cols-1">
                                    <div>
                                        <ul className="list-inside space-y-2">
                                        {!noticeData?null:noticeData.map((data,index)=>{
                                            return <div className="flex justify-start gap-2 items-center w-full rounded-md bg-gray-100 py-2 ">
                                                <p className=" text-base font-semibold">{index+1}.</p>
                                                <p className=" text-base font-semibold">{data.Date.substring(0,10)}</p>
                                                <p onClick={()=>navigate(`/auth/campus/view-noticeboard/${data._id}`)} className="text-base text-orange-600 cursor-pointer">{data.title}</p>
                                            </div>
                                        })}  
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*----- SECTION GRID*/}
                    </div>
                </section>
                {/*--------BODY*/}
            </div>

        </>
    )
}

export default CompusPublicProfile;