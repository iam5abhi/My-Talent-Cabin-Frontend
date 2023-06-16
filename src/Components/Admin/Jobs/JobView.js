import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { ToastContainer } from 'react-toastify';
import JobAddModal from './JobAddModal';
import JobStatusModal from './JobStatusModal';
import JobEditModal from './JobEditModal';
import { customStyles } from '../../../features/DataTable';
import {useNavigate} from 'react-router-dom'
import { ToastError } from '../../../features/DisplayMessage';
import { authFetch } from '../../../Middleware/axios/intance';


const JobView = () => {
    const navigate = useNavigate()
    const [selectedRows, setSelectedRows] = React.useState([]);
	const [toggleCleared, setToggleCleared] = React.useState(false);
    const [jobData,setJobData]=React.useState()
    const [addJobOpen,setAddJobOpen]=useState(false)
    const [statusOpen,setStatusOpen]=useState(false)
    const [editOpen,setEditOpen]=useState(false)
    const [Id,setId]=React.useState()


    const handleRowSelected = React.useCallback(state => {
		setSelectedRows(state.selectedRows);
	}, []);

	const contextActions = React.useMemo(() => {
		const handleDelete = () => {
			
			if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.title)}?`)) {
				setToggleCleared(!toggleCleared);
				setJobData((jobData, selectedRows, 'title'));
			}
		};

		return (
			<button key="delete" onClick={handleDelete}>
				<i className="fa-solid fa-trash mr-3 fa-lg text-blue-500"></i>
			</button>
		);
	}, [jobData, selectedRows, toggleCleared]);

    const titleFuntion=()=>{
        return(
            <div className='flex justify-between '>
                <h1>Posts</h1>
                <h1><i onClick={()=>setAddJobOpen(true)} class="fa-sharp fa-solid fa-circle-plus fa-xl mr-5 text-blue-500"></i></h1>
            </div>
        )
    }

    const columns = [
        { name: 'Project Name', selector: row => row.title, width:"15rem"},
        // { name: 'Company Name', selector: row => row.userId.name,width:"11rem" },
        { name: 'Posted', selector: row => row.companyData.map(data=>data.name), width:"11rem"}, 
        { name: 'Intership Type', selector: row => row.intershipType,},
        { name: 'Intership Week', selector: row => row.intershipWeek,},
        { name: 'Student Name', selector: row => row.UserData.map(data=>data.name),},
        { name: 'Action', selector: row =><div>
        <button type="button" data-tooltip="Change Project Status" onClick={()=>StatusOpen(row._id)} className="px-2 py-1 rounded-full focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-text-orange-600 font-medium mr-2 mb-2 text-sm">
        <i className="fa-solid fa-check"></i></button>
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

    const GetJobData = async ()=> {
        try {
        const res = await authFetch(`/admin/intership`);
            setJobData(res.data)
        } catch (error) { ToastError(error.data.message) }
    }

    React.useEffect(()=>{
        GetJobData();
      },[])
    
  return (
        <>
        <div className="max-w-screen mx-auto mt-10">
          <div className="container mx-auto">
             <div>
                <div className="flex justify-between items-center px-1 bg-white dark:bg-gray-800">
                    <div className=" text-sm text-gray-500">
                        <h2 className=" text-lg font-normal text-blue-600 mb-4">All Jobs</h2>
                    </div>  
                </div>
                <hr />
                <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                    <DataTable
                        columns={columns}
                        data={jobData}
                        customStyles={customStyles}
                        pagination 
                        title={titleFuntion()}
                        selectableRows
                        contextActions={contextActions}
                        onSelectedRowsChange={handleRowSelected}
                        clearSelectedRows={toggleCleared}
                    />
                </div>
             </div>
         </div>
        </div>
         <JobAddModal setOpen={setAddJobOpen} open={addJobOpen} GetJobData={GetJobData} /> 
         { editOpen === true ?<JobEditModal setOpen={setEditOpen} open={editOpen} id={Id} GetJobData={GetJobData} />: null} 
         <JobStatusModal setOpen={setStatusOpen} open={statusOpen} id={Id} GetJobData={GetJobData}/>
        <ToastContainer />
        </>
  )
}

export default JobView