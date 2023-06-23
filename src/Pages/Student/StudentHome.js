import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { authFetch } from '../../Middleware/axios/intance';
import { ToastError } from '../../features/DisplayMessage'
import flag from "../../Assets/Images/flag.png"
import pending from '../../Assets/Images/pending.png'
import Table from '../../Components/Table/Table';
import styles from '../../Assets/Style/Table/Home.module.css'
import CustomModal from '../../TestHandler/CustomModal';


const StudentHome = () => {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])

  console.log(projects, "projects")
  const GetProjects = async () => {
    try {
      const resp = await authFetch.get(`/student/project-enroll`);
      // setProjects(resp.data)
    } catch (error) {
      ToastError(error)
    }
  }
  const GetFakets = async () => {
    try {
      const resp = await fetch("https://jsonplaceholder.typicode.com/photos");
      const result = await resp.json()
      setProjects(result)
    } catch (error) {
      ToastError(error)
    }
  } 

  useEffect(() => {
    GetProjects()
    GetFakets()
  }, [])

  return (
    <>
      Student Home
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
                    {/* {!projects ? null : projects.map((request) => {
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
                       })} */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* <main className={styles.container}>
      <div className={styles.wrapper}>
        <Table data={projects} rowsPerPage={10} />
      </div>
    </main> */}
    {/* <CustomModal modalType="Add" modalTitle="Add Category" modalName="addModal" >
    <div className="overflow-auto">
            <div className=" max-w-screen-lg mx-auto">
            <form >
            <div className="px-4 mt-8">
                <ul className="w-full text-sm font-medium text-gray-900 bg-white">
                <li className="w-full rounded-t-lg  ">
                    <div className="items-center px-3 gap-4">   
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category <span class="text-red-600">*</span></label>
                    <input type="text" id="default-input" name='title' placeholder="Enter Category" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg font-normal rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2" />
                    </div>
                </li>
                <br />  
                <li className="w-full rounded-t-lg  ">
                    <div className="items-center px-3 gap-4">   
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category <span class="text-red-600">*</span></label>
                    <input type="text" id="default-input" name='title' placeholder="Enter Category" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg font-normal rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2" />
                    </div>
                </li>
                <br /> 
                <li className="w-full rounded-t-lg  ">
                    <div className="items-center px-3 gap-4">   
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category <span class="text-red-600">*</span></label>
                    <input type="text" id="default-input" name='title' placeholder="Enter Category" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg font-normal rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2" />
                    </div>
                </li>
                <br /> 
                </ul>
                <div className=" w-full text-center mt-2 mb-4">
                <button type="submit" className="text-white text-end bg-orange-600 hover:bg-orange-400
                focus:ring-4 focus:ring-orange-300 font-semibold rounded-full text-lg px-20 py-2.5 mr-2 
                mb-2 focus:outline-none">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div></CustomModal>
        <CustomModal  modalType="Edit" modalTitle="Edit Category" modalName="editModal" >
          <div className="overflow-auto">
            <div className=" max-w-screen-lg mx-auto">
              <form >
              <div className="px-4 mt-8">
                  <ul className="w-full text-sm font-medium text-gray-900 bg-white">
                  <li className="w-full rounded-t-lg  ">
                      <div className="items-center px-3 gap-4">   
                      <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category <span class="text-red-600">*</span></label>
                      <input type="text" id="default-input" name='title' placeholder="Enter Category" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg font-normal rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2" />
                      </div>
                  </li>
                  <br />  
                  </ul>
                  <div className=" w-full text-center mt-2 mb-4">
                  <button type="submit" className="text-white text-end bg-orange-600 hover:bg-orange-400
                  focus:ring-4 focus:ring-orange-300 font-semibold rounded-full text-lg px-20 py-2.5 mr-2 
                  mb-2 focus:outline-none">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </CustomModal> */}
    </>
  )
}

export default StudentHome;
