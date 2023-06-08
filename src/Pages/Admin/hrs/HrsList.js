import React, { useState } from 'react';
import {customStyles} from '../../../features/DataTable';
import { authFetch } from '../../../Middleware/axios/intance';
import DataTable from 'react-data-table-component';
import { ToastContainer } from 'react-toastify';
import HrsViewModal from '../../../Components/Admin/hrs/HrsViewModal'
import { ToastError } from '../../../features/DisplayMessage';
import AdminHeader from '../../../Layouts/Header/AdminHeader';


  
const HrsList = () => {
    const [open,setOpen] = useState(false);
    const [hrsData,setHrsData]=React.useState()
    const [Id,setId]=React.useState()

    const columns = [
        { name:  'Sr.', selector: (row,index) => index+1, width:"9rem"},
        { name: 'Doctor Name', selector: row => row.name, width:"rem" },
        { name: 'Mobile Number', selector: row => row.PhoneNumber, },
        { name: 'Email', selector: row => row.email,},
        // { name: 'Status', selector: row => row.status === 'active' ? <span className='bg-green-100 p-2 px-4 rounded-full text-green-600'>Activate</span>:row.status === "onload" ?<span className='bg-yellow-100 p-2 px-4 rounded-full text-yellow-600'>OnHold</span>:<span className='bg-red-100 p-2 px-4 rounded-full text-red-600'>Deactivate</span>,},
        { name: 'Action', selector: row =><div><button onClick={()=>ViewHandleOpen(row._id)} type="button" className="px-4 ml-2 py-1 rounded-full focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-blue-300 font-medium  text-sm  mr-2 mb-2 dark:focus:ring-blue-800">
        <i className="fa-solid fa-eye" /></button >
        </div>, width:"10rem" },
    ];

    const ViewHandleOpen = (id) =>{
        setId(id)
        setOpen(true);
    } 

    const GetHrsData = async ()=> {
        try {
        const res = await authFetch('company/accounts/api/v1/all-company-registerd-data');
        setHrsData(res.data.data);
        } catch (error) {
        ToastError(error.data.message)
        }
    }

    React.useEffect(()=>{
        GetHrsData();
      },[])
    
  return (
        <>
         <AdminHeader />
            <div className="max-w-screen mx-auto mt-20">
                <div className="container mx-auto">
                <div>
                    <div className="flex justify-between items-center px-1 bg-white dark:bg-gray-800">
                        <div className=" text-sm text-gray-500">
                            <h2 className=" text-lg font-bold text-blue-600 mb-4">All Human Resource</h2>
                        </div>  
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
         { open === true ? <HrsViewModal setOpen={setOpen} open={open} id={Id}/> : null}
        <ToastContainer />
    </>
  )
}

export default HrsList;