import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { ToastContainer } from 'react-toastify';
import MentorAddModal from '../../../Components/Admin/Mentors/MentorAddModal';
import MentorEditModal from '../../../Components/Admin/Mentors/MentorEditModal';
import MentorStatusModal from '../../../Components/Admin/Mentors/MentorStatusModal'
import MentorViewModal from '../../../Components/Admin/Mentors/MentorViewModal'
import { getfunction } from '../../../features/FilterStatus'; 
import { customStyles } from '../../../features/DataTable';
import { authFetch } from '../../../Middleware/axios/Interceptors'
import StatusData from '../../../Components/Admin/StatusDesgin/StatusData';
import { ToastError } from '../../../features/DisplayMessage';
import { StatusHandler } from '../../../features/StatusHandler';

  

const Mentors = () => {
    const [open,setOpen] = useState(false);
    const [studentData,setStudentData]=React.useState()
    const [addOpen,setAddOpen]=useState(false)
    const [statusOpen,setStatusOpen]=useState(false)
    const [editOpen,setEditOpen]=useState(false)
    const [statusData,setStatusData]=useState({active:'',hold:'',deactive:''})
    const [Id,setId]=React.useState()

    const columns = [
        { name:  'Sr.', selector: (row,index) => index+1, width:"9rem"},
        { name: 'Name', selector: row => row.name, width:"15rem" },
        { name: 'Mobile Number', selector: row => row.PhoneNumber, },                     
        { name: 'Email', selector: row => row.email,},
        { name: 'Status', selector: row => StatusHandler(row.status) },
        { name: 'Action', selector: row =><div><button onClick={()=>ViewHandleOpen(row._id)} type="button" className="px-4 ml-2 py-1 rounded-full focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-blue-300 font-medium  text-sm  mr-2 mb-2 dark:focus:ring-blue-800">
        <i className="fa-solid fa-eye" /></button >
        <button data-tooltip="Edit Student Detail" onClick={()=>JobEditOpen(row._id)} type="button" className="px-2 py-1 rounded-full focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-blue-300 font-medium text-sm  mr-2 mb-2">
        <i className="fa-solid fa-pen-to-square hover:scale-[1.02] transition-transform" /></button>
        <button data-tooltip="Change Student Status" onClick={()=>StatusOpen(row._id)} type="button" className="px-2 py-1 rounded-full focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-blue-300 font-medium text-sm  mr-2 mb-2">
        <i className="fa-regular fa-circle-check" /></button>
        </div>, width:"10rem" },
    ];

    const StatusOpen = (id) =>{
        setId(id)
        setStatusOpen(true);
    }

    const JobEditOpen = (id) =>{
        setId(id)
        setEditOpen(true);
    } 

    const ViewHandleOpen = (id) =>{
        setId(id)
        setOpen(true);
    } 

    const GetStudentData = async ()=> {
        try {
        const res = await authFetch.get(`/admin/mentor`);
        setStudentData(res.data.data); 
        let active = getfunction(res.data.data,'active')
        let hold = getfunction(res.data.data,'onhold') 
        let deactive = getfunction(res.data.data,'deactive') 
        setStatusData({active:active,hold:hold,deactive:deactive})
        } catch (error) { ToastError(error.data) }
    }

    React.useEffect(()=>{
        GetStudentData();
      },[])
    
  return (
        <>
          <StatusData active={statusData.active.length} hold={statusData.hold.length} deactive={statusData.deactive.length} icon="fa-sharp fa-solid fa-user-graduate" />
            <div className="max-w-screen mx-auto mt-20">
                <div className="container mx-auto">
                <div>
                    <div className="flex justify-between items-center px-1 bg-white dark:bg-gray-800">
                        <div className=" text-sm text-gray-500">
                            <h2 className=" text-lg font-normal text-blue-600 mb-2">All Mentors</h2>
                        </div>  
                        <button type="button" onClick={()=>setAddOpen(true)} className="mb-2 text-white text-sm bg-blue-600 hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 rounded-full px-4 py-1.5">
                            <i class="fa-solid fa-plus"></i> Add Mentors</button>
                    </div>
                    <hr />
                    <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                     <DataTable
                        columns={columns}
                        data={studentData}
                        customStyles={customStyles}
                        pagination 
                     />
                    </div>
                </div>
                </div>
            </div>  
         { open === true ? <MentorViewModal setOpen={setOpen} open={open} id={Id}/> : null}
         { addOpen === true ? <MentorAddModal setOpen={setAddOpen} open={addOpen} GetStudentData={GetStudentData} /> : null}
         { editOpen === true ? <MentorEditModal setOpen={setEditOpen} open={editOpen} id={Id} GetStudentData={GetStudentData} /> : null}
         { statusOpen === true ? <MentorStatusModal setOpen={setStatusOpen} open={statusOpen} id={Id} GetStudentData={GetStudentData} /> : null}
        <ToastContainer />
    </>
  )
}

export default Mentors;