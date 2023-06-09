import React,{useState,useEffect} from 'react';
import DataTable from 'react-data-table-component';
import { customStyles } from '../../../features/DataTable';
import { authFetch } from '../../../Middleware/axios/Interceptors';
import { useNavigate } from 'react-router-dom';
import { ToastError } from '../../../features/DisplayMessage';
import { ToastContainer } from 'react-toastify';
import StatusInternship from '../../../Components/Admin/Projects/StatusInternship';
import AdminHeader from '../../../Layouts/Header/AdminHeader';

const Projects = () => {
  const navigate = useNavigate()
  const [searchText, setSearchText] = React.useState("");
  const [categoryData,setCategoryData]=useState()
  const [statusOpen,setStatusOpen]=useState(false)
  const [ids,setIds]=useState()

  const columns = [
    { name: 'Project Name', selector: row => row.title, width:"15rem"},
    // { name: 'Company Name', selector: row => row.userId.name,width:"11rem" },
    { name: 'Posted', selector: row => row.CompanyId.name, width:"11rem"}, 
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
     </div>, width:"10rem" },
  ];
  
  const AddProjectComponent=()=>{
    return(
      <div className='flex justify-between mt-3 -mb-7'>
      <h1 className='font-semibold'>Internships</h1>
      <div className='grid grid-cols-2 gap-4'>
        <div>
        <input type='text' onChange={(e)=>setSearchText(e.target.value)} 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-orange-500 focus:border-orange-500 block w-full p-3" placeholder='Search' />  &nbsp;
          </div>
          <div>
          <button type="button" onClick={()=>navigate('/auth/admin/add-internship')} className="text-white text-lg bg-orange-600 hover:bg-orange-400 focus:ring-4 focus:ring-orange-300 rounded-full px-4 py-2">
            <i class="fa-solid fa-plus"></i> Add Internship</button>
          </div>
      </div>
  </div>
    )
  }

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
        <AdminHeader />
          {/* --------------All project----------------- */}
          <div className="max-w-screen mx-auto mt-10">
            <div className="container px-4 mx-auto">
            <div>
            <div className="flex justify-between items-center px-1 bg-white">
                </div>
                <hr />
                <div className="inline-block min-w-full px-10 shadow-md rounded-lg overflow-hidden">
                  <DataTable
                    columns={columns}
                    title={AddProjectComponent()}
                    data={!categoryData?[]:categoryData.filter((item) => {
                      if (searchText === "") { return item;} 
                      // else if (item.status.toLowerCase().includes(searchText.toLowerCase())){return item;}
                      // else if (item.phoneNumber.toString().includes(searchText)){return item;}
                      else if (item.title.toLowerCase().includes(searchText.toLowerCase())){return item;}
                      // else if (item.email.toLowerCase().includes(searchText.toLowerCase())){return item;}  
                    })}
                    customStyles={customStyles} 
                  />
                </div>
            </div>
            </div>
          </div>
          < StatusInternship setOpen={setStatusOpen} open={statusOpen} id={ids} GetCategoryData={GetCategoryData} />
          <ToastContainer />
          
    </>
  )
}

export default Projects;