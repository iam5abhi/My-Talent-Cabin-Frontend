import React, { useState, useEffect } from "react";
import { authFetch } from "../../Middleware/axios/intance";
import profileImg from '../../Assets/Images/avatar.png'
import skillabs from '../../Assets/Images/skillabs.png'
import backgroundImage from '../../Assets/Images/1.jpg'
import { useParams } from "react-router-dom";



const StudentPublicProfile = () => {
  const {id} = useParams()
  const [profileData, setProfileData] = useState();
  const [projectData, setProjectData] = useState([]);


  const GetProfileData = async () => {
    try {
      const resp = await authFetch.get(`/api/mentor/get-student-profile/${id}`);
      setProfileData(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetProjectData =async()=>{
    try {
      const resp = await authFetch.get('/api/student/get-complete-project-data');
      setProjectData(resp.data)
    } catch (error) {
      // setMessage({message:error,type:''})
    }
  }

  useEffect(() => {
    GetProfileData();
    GetProjectData()
  }, []);

  return (
    <>
    <div>
        {/*--------HEADER*/}
        <div
          className="bg-cover bg-no-repeat bg-left-bottom"
          style={{backgroundImage: `url(${backgroundImage})`}}
        >
          <div
            className="flex flex-col mt-10 sm:mt-0 md:px-16 px-4 md:py-16 py-4 rounded-t shadow-lg 
             backdrop-brightness-90 bg-white/60">
            <div className="flex space-x-20 ">
              <img
                className="w-20 h-20 md:w-56 md:h-56 object-cover rounded-full
                 border-4 border-orange-500 p-1"
                // src={!profileData.avatar?profileImg:profileData.avatar}
                src={profileImg}
                alt="profile"
              />
              <div className="font-medium mb-2 ">
                <div className="md:flex md:flex-wrap md:items-center mb-8">
                  <h2 className="md:text-4xl text-lg font-bold pr-2">
                  {!profileData ? null : profileData.StudentId.name.toUpperCase()}
                  </h2>
                  <a
                    href="#"
                    className="bg-orange-500 px-2 py-1 
                    text-white font-semibold text-sm rounded-full block text-center 
                    sm:inline-block block"
                  >
                    Student
                  </a>
                </div>
                <div className="flex justify-between  gap-8 my-2">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 ">
                      Location
                    </h3>
                  </div>
                  <div className="text-end">
                    <h3 className="text-base font-normal text-gray-900 ">
                      Chandigarh
                    </h3>
                  </div>
                </div>
                <hr className="border-1 border-gray-300" />
                <div className="flex justify-between  gap-8 my-2">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 ">
                      Mentor Type
                    </h3>
                  </div>
                  <div className="text-end">
                    <h3 className="text-base font-normal text-gray-900 ">
                      Industrial Mentor
                    </h3>
                  </div>
                </div>
                <hr className="border-1 border-gray-300" />
                <div className="flex justify-between  gap-8 my-2">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 ">
                      Campus
                    </h3>
                  </div>
                  <div className="text-end">
                    <h3 className="text-base font-normal text-gray-900 ">
                    {!profileData ? null : profileData.campus.name}
                    </h3>
                  </div>
                </div>
                <hr className="border-1 border-gray-300" />
                <div className="flex justify-between  gap-8 my-2">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 ">
                      Recent Activity
                    </h3>
                  </div>
                  <div className="text-end">
                    <i className="fa-solid fa-comment text-gray-900" />
                    <i className="fa-solid fa-comment text-gray-900" />
                    <i className="fa-solid fa-comment text-gray-900" />
                  </div>
                </div>
                <hr className="border-1 border-gray-300" />
              </div>
            </div>
            <div className="tags">
              <h2 className="md:text-2xl text-lg font-bold pr-2 pt-10 mb-4">
                Expertise
              </h2>
              <div className="tags md:flex block gap-4">
              {!profileData ? null : profileData.Category.map(data=>{
                return <a>
                <div className=" text-white bg-orange-500 font-semibold px-4 py-1 md:m-0 mb-2 rounded">
                {data.value.title}
                </div>
              </a>
              })}
                
              </div>
            </div>
          </div>
        </div>
        {/*--------HEADER*/}
        <hr className="border-2 border-gray-100" />
        {/*--------BODY*/}
        <section>
          <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-6 lg:px-6">
            {/*----- SECTION GRID*/}
            <div className="grid">
              <h2 className="my-4 font-bold text-3xl text-orange-500">
                {" "}
                Recent Projects
              </h2>
              <div className=" sm:grid sm:grid-cols-3 sm:gap-8">
                  {projectData.length<=0?<div className='text-lg'>No Projects</div>:projectData.map((data)=>{
                    return <div className="max-w-md transition ease-in-out pb-6  hover:-translate-y-1 hover:scale-100 duration-75 bg-white shadow-xl rounded-lg  my-4 border border-gray-300 hover:border-orange-500">
                    {/* component */}
                    <div className="project">
                      <div className="bg-white rounded-full">
                        {/*----IMAGE*/}
                        <div className="photo-wrapper border-b border-gray-200 rounded p-2 ">
                          <img
                            className=" mx-auto  pt-3 w-64 bg-white"
                            src={skillabs}
                            alt
                          />
                        </div>
                        {/*----IMAGE*/}
                        <div className="p-2">
                          {/*----Title*/}
                          <div className="title">
                            <h3 className=" text-xl text-gray-900 px-2 pt-2 font-bold leading-8">
                              {data.title}
                            </h3>
                          </div>
                          <div className=" text-gray-400 px-2 text-sm ">
                            <p className>SkillLabs</p>
                          </div>
                          {/*----Title*/}
                          {/*----TABLE*/}
                          <table className="text-sm mb-4">
                            <tbody>
                              <tr>
                                <td className="px-2 py-2  font-semibold">
                                  Location
                                </td>
                                <td className="px-2 py-2">{data.state}</td>
                              </tr>
                              <tr>
                                <td className="px-2 py-2 font-semibold">
                                  Internship Type
                                </td>
                                <td className="px-2 py-2">{data.intershipType}</td>
                              </tr>
                            </tbody>
                          </table>
                          {/*----TABLE*/}
                          <hr />
                          {/*----SKILL*/}
                          <div className="flex items-center  justify-between px-2  ">
                            <h1 className="font-semibold text-sm  pt-4">
                              Skills
                            </h1>
                          </div>
                          <div className="px-2 py-2">
                            {data.myskill.map(data=>
                              <span className="bg-gray-100 text-orange-500 text-sm mr-2 px-3 py-1 rounded-full border border-orange-300">
                               {data.name}
                              </span>
                            )}
                        </div>
                          {/*----SKILL*/}
                        </div>
                      </div>
                    </div>
                    {/* component */}
                  </div>
                  })}
              </div>
            </div>
            {/*----- SECTION GRID*/}
          </div>
        </section>
        {/*--------BODY*/}
        {/*------------------------FOOTER*/}
        {/*-------------------------FOOTER*/}
      </div>
    </>
  );
};

export default StudentPublicProfile;
