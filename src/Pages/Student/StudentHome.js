import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { authFetch } from '../../Middleware/axios/intance';
import { ToastError } from '../../features/DisplayMessage'


const StudentHome = () => {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])

  const GetProjects = async () => {
    try {
      const resp = await authFetch.get(`/student/project-enroll`);
      setProjects(resp.data)
    } catch (error) {
      ToastError(error)
    }
  }


  useEffect(() => {
    GetProjects()
  }, [])

  return (
    <>
          <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
              <div>
                <h2 className="text-2xl font-semibold leading-tight">UPCOMMING PROJECT'S</h2>
              </div>
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                  <table className="min-w-full leading-normal">
                    <thead>
                     <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          DATE
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          PROJECT NAME
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          MENTOR NAME
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          ACTION
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                    {!projects ? null : projects.map((request) => {
                        return <tr>
                          <td className="px-5 py-5 bg-white text-sm">
                            <div className="">
                              <p className="text-gray-900 whitespace-no-wrap"> {request.createdAt} </p>
                            </div>
                          </td>
                          <td className="px-5 py-5 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{request.title}</p>
                          </td>
                          <td className="px-5 py-5 bg-white text-sm"> 
                            <p className="text-gray-900 whitespace-no-wrap">{request.MentorData.map(data=>data.name.toUpperCase())}</p>
                          </td>
                          <td className="px-5 py-5 bg-white text-sm">
                            <span className="relative inline-block px-3 py-1 font-semibold text-blue-900 leading-tight">
                              <span aria-hidden className="absolute inset-0 bg-blue-200 opacity-50 rounded-full" />
                              <span className="relative cursor-pointer">Link</span>
                            </span>
                          </td>
                        </tr>
                       })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}

export default StudentHome;
