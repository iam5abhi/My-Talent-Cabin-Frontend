import React,{useState,useEffect} from 'react';
import { authFetch } from '../../../Middleware/axios/Interceptors';
import { useNavigate } from 'react-router-dom';
import { ToastError } from '../../../features/DisplayMessage';
import { ToastContainer } from 'react-toastify';
import ProjectComponents from '../../../Components/ComanRegisterComponents/ProjectComponents';

const Internship = () => {
  const navigate = useNavigate()
  const [searchText, setSearchText] = React.useState("");
  const [categoryData,setCategoryData]=useState()

  const columns = [
    { name: 'Project Name', selector: row => row.title, width:"15rem"},
    { name: 'Intership Type', selector: row => row.intershipType,},
    { name: 'Price', selector: row => row.price?row.price:"0$",},
    { name: 'Intership Week', selector: row => row.intershipWeek,},
    { name: 'Status', selector: row => row.status,},
    { name: 'Action', selector: row =><div>
    <button type="button" data-tooltip="Edit Project"  onClick={()=>navigate(`/auth/mentor/edit-internship/${row._id}`)} className="px-2 py-1 rounded-full focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-text-orange-600 font-medium mr-2 mb-2 text-sm">
    <i className="fa-solid fa-pen-to-square "></i></button>
     </div>, width:"10rem" },
  ];

  const GetCategoryData = async ()=>{
    try {
      const resp = await authFetch(`/mentor/me-enroll-project`);
      setCategoryData(resp.data)
    } catch (error) { ToastError(error) }
  }

  useEffect(() => {
    GetCategoryData()
  },[])
  
  return (
        <>
          {/* --------------All project----------------- */}
          <ProjectComponents data={{path:'/auth/mentor/upload-internship',setSearchText,columns,categoryData,searchText}}/>
          <ToastContainer />
          
    </>
  )
}

export default Internship;