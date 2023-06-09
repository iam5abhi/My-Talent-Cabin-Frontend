import React, { useState } from 'react';
import {customStyles} from '../../../features/DataTable';
import { authFetch } from '../../../Middleware/axios/Interceptors';
import DataTable from 'react-data-table-component';
import { ToastContainer } from 'react-toastify';
import { ToastError } from '../../../features/DisplayMessage';
import AdminHeader from '../../../Layouts/Header/AdminHeader';
import CompanyAddModal from '../../../Components/Admin/comapny/CompanyAddModal';
import CompanyViewModal from '../../../Components/Admin/comapny/CompanyViewModal';
import CompanyEditModal from '../../../Components/Admin/comapny/CompanyEditModal';
import CompanyStatusModal from '../../../Components/Admin/comapny/CompanyStatusModal';


  
const Company = () => {
    const [open,setOpen] = useState(false);
    const [hrsData,setHrsData]=React.useState()
    const [studentData,setStudentData]=React.useState()
    const [addOpen,setAddOpen]=useState(false)
    const [statusOpen,setStatusOpen]=useState(false)
    const [editOpen,setEditOpen]=useState(false)
    const [Id,setId]=React.useState()

    const columns = [
        { name:  'Sr.', selector: (row,index) => index+1, width:"9rem"},
        { name: 'Doctor Name', selector: row => row.name, width:"rem" },
        { name: 'Mobile Number', selector: row => row.PhoneNumber, },
        { name: 'Email', selector: row => row.email,},
        { name: 'Status', selector: row => row.isAccountVerified == true ? <span className='bg-green-100 p-2 px-4 rounded-full text-green-600'>Activate</span>:<span className='bg-red-100 p-2 px-4 rounded-full text-red-600'>Deactivate</span>,},
        { name: 'Action', selector: row =><div><button onClick={()=>ViewHandleOpen(row._id)} type="button" className="px-2 ml-2 py-1 rounded-full focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-blue-300 font-medium  text-sm  mr-2 mb-2 dark:focus:ring-blue-800">
        <i className="fa-solid fa-eye" /></button >
        <button data-tooltip="Edit Student Detail" onClick={()=>EditHandleOpen(row._id)} type="button" className="px-2 py-1 rounded-full focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-blue-300 font-medium text-sm  mr-2 mb-2">
        <i className="fa-solid fa-pen-to-square hover:scale-[1.02] transition-transform" /></button>
        <button data-tooltip="Change Student Status" onClick={()=>StatusHandleOpen(row._id)} type="button" className="px-2 py-1 rounded-full focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-blue-300 font-medium text-sm  mr-2 mb-2">
        <i className="fa-regular fa-circle-check" /></button>
        </div>, width:"10rem" },
    ];

    const ViewHandleOpen = (id) =>{
        setId(id)
        setOpen(true);
    } 
    const StatusHandleOpen = (id) =>{
        setId(id)
        setStatusOpen(true);
    } 
    const EditHandleOpen = (id) =>{
        setId(id)
        setEditOpen(true);
    } 

    const GetHrsData = async ()=> {
        try {
        const res = await authFetch('/admin/company');
        setHrsData(res.data.data);
        } catch (error) { ToastError(error.data.message) }
    }

    React.useEffect(()=>{
        GetHrsData();
      },[])
    
  return (
        <>
            <div className="max-w-screen mx-auto mt-20">
                <div className="container mx-auto">
                <div>
                    <div className="flex justify-between items-center px-1 bg-white dark:bg-gray-800">
                        <div className=" text-sm text-gray-500">
                            <h2 className=" text-lg font-bold text-blue-600 mb-4">Company</h2>
                        </div>  
                        <button type="button" onClick={()=>setAddOpen(true)} className="mb-2 text-white text-sm bg-blue-600 hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 rounded-full px-4 py-1.5">
                            <i class="fa-solid fa-plus"></i> Add Company</button>
                    </div>
                    <hr />
                    <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                    <DataTable
                      columns={columns}
                      data={hrsData}
                      customStyles={customStyles}
                      pagination 
                    />
                    </div>
                </div>
                </div>
            </div> 
         { addOpen === true ? <CompanyAddModal setOpen={setAddOpen} open={addOpen} id={Id} GetHrsData={GetHrsData} /> : null}
         { open === true ? <CompanyViewModal setOpen={setOpen} open={open} id={Id} GetHrsData={GetHrsData} /> : null}
         { editOpen === true ? <CompanyEditModal setOpen={setEditOpen} open={editOpen} id={Id} GetHrsData={GetHrsData} /> : null}
         { statusOpen === true ? <CompanyStatusModal setOpen={setStatusOpen} open={statusOpen} id={Id} GetHrsData={GetHrsData} /> : null}
        <ToastContainer />
    </>
  )
}

export default Company;