import React,{useState,useEffect} from 'react';
import { authFetch } from '../../../Middleware/axios/Interceptors';
import { useNavigate } from 'react-router-dom';
import { ToastError } from '../../../features/DisplayMessage';
import { ToastContainer } from 'react-toastify';
import StatusInternship from '../../../Components/Admin/Projects/StatusInternship';
import ProjectComponents from '../../../Components/ComanRegisterComponents/ProjectComponents';

const Projects = () => {
  const navigate = useNavigate()
  const [searchText, setSearchText] = React.useState("");
  const [categoryData,setCategoryData]=useState()
  const [statusOpen,setStatusOpen]=useState(false)
  const [ids,setIds]=useState()

  const columns = [
    { name: 'Project Name', selector: row => row.title, width:"15rem"},
    // { name: 'Company Name', selector: row => row.userId.name,width:"11rem" },
    { name: 'Posted', selector: row => row.companyData.map(data=>data.name), width:"11rem"}, 
    { name: 'Intership Type', selector: row => row.intershipType,},
    { name: 'Price', selector: row => row.price?row.price:"0$",},
    { name: 'Intership Week', selector: row => row.intershipWeek,},
    { name: 'Status', selector: row => row.status,},
    { name: 'Action', selector: row =><div>
    {/* <button type="button" data-tooltip="Copy Project" onClick={()=>navigate(`/auth/admin/copy-project/${row._id}`)} className="px-2 py-1 rounded-full focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-text-orange-600 font-medium mr-2 mb-2 text-sm"> */}
    {/* <i className="fa-solid fa-copy "></i></button> */}
    <button type="button" data-tooltip="Edit Project"  onClick={()=>navigate(`/auth/admin/edit-internship/${row._id}`)} className="px-2 py-1 rounded-full focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-text-orange-600 font-medium mr-2 mb-2 text-sm">
    <i className="fa-solid fa-pen-to-square "></i></button>
    <button type="button" data-tooltip="Change Project Status" onClick={()=>StatusHandler(row._id)} className="px-2 py-1 rounded-full focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-text-orange-600 font-medium mr-2 mb-2 text-sm">
    <i className="fa-solid fa-check"></i></button>
    <button type="button" data-tooltip="Change Project Status" onClick={()=>navigate(`/auth/admin/view-internship/${row._id}`)} className="px-2 py-1 rounded-full focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-text-orange-600 font-medium mr-2 mb-2 text-sm">
    <i className="fa-solid fa-eye"></i></button>
     </div>, width:"10rem" },
  ];

  const StatusHandler =(id)=>{
    setIds(id)
    setStatusOpen(true)
  }

  const GetCategoryData = async ()=>{
    try {
      const resp = await authFetch(`/admin/intership`);
      setCategoryData(resp.data)
    } catch (error) { ToastError(error) }
  }

  useEffect(() => {
    GetCategoryData()
  },[])
  
  return (
        <>
          {/* --------------All project----------------- */}
          <ProjectComponents data={{path:'/auth/admin/add-internship',setSearchText,columns,categoryData,searchText}}/>
          < StatusInternship setOpen={setStatusOpen} open={statusOpen} id={ids} GetCategoryData={GetCategoryData} />
          <ToastContainer />
          
    </>
  )
}

export default Projects;