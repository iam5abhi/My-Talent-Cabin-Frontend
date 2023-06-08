import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { authFetch } from '../../../Middleware/axios/intance'
import GetCategoryData from '../../../features/StudentResult'
import { Breathing } from 'react-shimmer'
import jwt_decode from "jwt-decode";
import { Token } from '../../../features/Token'
import Message from '../../../features/Message'



const ProjectDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [singleProjectData, setSingleProjectData] = useState()
  const [mentorData, setMentorData] = useState([])
  const [facultyMentorData, setFacultyMentorData] = useState()
  const [studentResult, setStudentResult] = useState()
  const [mentorId, setMentorId] = useState()
  const [factltyId, setfactltyId] = useState()
  const [applyEnable, setApplyEnable] = useState(true)
  const [appllied, setApplied] = useState()
  const [description, setDescription] = useState()
  const [message, setMessage] = useState({ message: '', type: '' })


  const DescriptionHandle = () => {
    let description = singleProjectData.description.split(".")
    description.pop()
    setDescription(description)
  }

  GetCategoryData().then((data) => setStudentResult(data))

  const CheckApplied = () => {
    let decoded = jwt_decode(Token());
    let ApplyData = singleProjectData.applied.find(data => data.student == decoded.user._id)
    setApplied(ApplyData)
  }

  const MentorOnchangeHandler = (e) => {
    setMentorId(e.target.value)
    if (applyEnable === false) {
      setApplyEnable(true)
    } else {
      setApplyEnable(false)
    }
  }

  const FacultyOnchangeHandler = (e) => {
    setfactltyId(e.target.value)
  }

  const GetSingleProject = async () => {
    try {
      const resp = await authFetch(`/api/student/intership/${id}`);
      setSingleProjectData(resp.data.data)
      setMentorData(resp.data.mentordata)
      setFacultyMentorData(resp.data.FacultyMentor)
    } catch (error) {
      setMessage({ message: error, type: false })
    }
  }

  const ApplyProject = async () => {
    try {
      const resp = await authFetch.patch(`/api/student/apply/intership/${id}`, { mentorId: mentorId, factltyId: factltyId });
      setMessage({ message: resp.data.message, type: true })
      setTimeout(() => {
        navigate("/auth/student")
      }, 1000);
    } catch (error) {
      setMessage({ message: error, type: false })
      setTimeout(() => {
        setMessage({ message: '', type: '' })
      }, 1000);

    }
  }

  useEffect(() => {
    GetSingleProject()
  }, [])

  useEffect(() => {
    if (singleProjectData) {
      CheckApplied()
      DescriptionHandle()
    }
  }, [singleProjectData])


  return (
    <>
      {message.type !== '' ? message.type === false ?
        <Message message={message.message} css='flex p-4 mb-1 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-gray-800 dark:text-red-400' />
        :
        <Message message={message.message} css='flex p-4 mb-1 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-gray-800 dark:text-green-400' />
        : null}
      <div className="flex min-h-full items-center justify-center  px-4 sm:px-6 lg:px-8 ">
        <div className="w-full  space-y-8  rounded-lg px-5 py-5 ">
          <section className="border border-gray-200 rounded-lg px-4 py-10">
            <div className="grid grid-cols-2 gap-20  ">
              <div>
                <h2 className="text-start text-3xl font-bold tracking-tight text-gray-900">{!singleProjectData ? <Breathing width={800} height={100} /> : singleProjectData.title.toUpperCase()}</h2>
              </div>
              <div className="text-end">
                {studentResult >= "75%" ? appllied ? <button type="button" className={`text-white text-end bg-green-500 hover:bg-green-400 focus:ring-4 focus:ring-green-400 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-500 dark:hover:bg-green-600 focus:outline-none dark:focus:ring-green-700`}>Applied</button>
                  : <button type="button" disabled={applyEnable} onClick={ApplyProject} className={`text-white text-end bg-orange-600 hover:bg-orange-400 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800 ${applyEnable === true ? "opacity-60 cursor-not-allowed" : null}`} title={applyEnable === true ? "select mentor first to apply this internship" : null}>Apply Now</button>
                  : <><button type="button" onClick={() => navigate('/auth/student/quiz-terms')} className="text-white text-end bg-orange-600 hover:bg-orange-400 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800">Unlock The Test</button>
                    <br /><a className='mr-7 text-blue-500' href='https://drive.google.com/drive/my-drive' target="_blank">study material</a></>
                }
              </div>
            </div>
            <br />
            <div>
              {!singleProjectData ? <Breathing width={1200} height={1000} /> : singleProjectData.tags.map((tag, index) => {
                return <span key={index + 1} className="bg-orange-100 text-orange-600 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-orange-600 dark:text-orange-300">{tag._id.name}</span>
              })}
            </div>
            <br />
            <hr />
            <br />
            <br />
            <div>
              <h3 className='text-start text-2xl font-bold tracking-tight text-gray-900 mb-6 underline'>Project Description</h3>
              {!description ? <Breathing width={1200} height={1000} /> : description.map((data, index) => {
                return <p key={index + 1} className="break-word mt-2 mb-2 max-w-screen-md text-sm text-gray-600 leading-6">{index + 1}. {data} </p>
              })}
            </div>
          </section>
        </div>
      </div>
      <div>
        {mentorData.length == 0 ? <h1 className="text-center text-xl text-orange-600 font-bold ">Mentor Not Available</h1> : <>
          <div className="flex max-w-screen-md px-4 mx-auto items-center justify-center px-4 sm:px-6 lg:px-8 ">
              <div className="w-full bg-gray-200/75 space-y-8 rounded-lg px-5 py-5 ">
                <h1 className="text-center text-xl text-orange-600 font-bold ">Industrial Mentor</h1>
                  {!mentorData ? <Breathing width={1200} height={1000} /> : mentorData.map((data) => {
                    return <><div key={data._id} className="bg-white rounded-lg shadow">
                    <a href="#" className="flex flex-col items-center bg-white md:flex-row md:max-w-xl p-4 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                      <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48  md:rounded-full" src={data.avatar} alt />
                      <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.MentorId.name}</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ==" crossOrigin="anonymous" referrerPolicy="no-referrer" /><i className="fa-solid fa-graduation-cap" /> {data.organization.name}</p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><i className="fa-solid fa-location-dot" /> {data.MentorId.city}</p>
                      </div>
                      <div className='items-end'>
                        <input id="default-radio-1" onChange={MentorOnchangeHandler} disabled={studentResult >= "75%" ? false : true} type="radio" value={data.MentorId._id} className={`w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 focus:ring-2 ${studentResult >= "75%" ? null : "cursor-not-allowed"}`} />
                    </div>
                    </a>
                  </div>
                </>
              })}
            </div>
          </div>
        {!facultyMentorData ? null : facultyMentorData.length == 0 ?null:
          <div className="flex max-w-screen-md px-4 mx-auto items-center justify-center px-4 sm:px-6 lg:px-8 ">
           <div className="w-full bg-gray-200/75 space-y-8 rounded-lg px-5 py-5 ">
            <h1 className="text-center text-xl text-orange-600 font-bold ">Faculty Mentor</h1>
              {!facultyMentorData ? <Breathing width={1200} height={1000} /> : facultyMentorData.map((data) => {
                return <><div key={data._id} className="bg-white rounded-lg shadow">
                            <a href="#" className="flex flex-col items-center bg-white md:flex-row md:max-w-xl p-4 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                              <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48  md:rounded-full" src="assets/img/avatar.jpg" alt />
                              <div className="flex flex-col justify-between p-4 leading-normal">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Rishav Kumar</h5>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ==" crossOrigin="anonymous" referrerPolicy="no-referrer" /><i className="fa-solid fa-graduation-cap" /> Skilllabs</p>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><i className="fa-solid fa-location-dot" /> Location</p>
                              </div>
                            </a>
                        </div>
                        <div>
                          <input id="default-radio-1" onChange={FacultyOnchangeHandler} disabled={studentResult >= "75%" ? false : true} type="radio" value={data.MentorId._id} className={`w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ${studentResult >= "75%" ? null : "cursor-not-allowed"}`} />
                        </div>
                    </>
                })}   
           </div>
          </div>
        }
        </>}
      </div> 
    </>
  )
}

export default ProjectDetails;