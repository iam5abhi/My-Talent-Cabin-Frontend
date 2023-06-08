import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { getfunction } from '../../features/FilterStatus'
// import TotalDetails from '../../Components/Admin/Total Details/TotalDetails';
import { authFetch } from "../../Middleware/axios/intance"
import { customStyles } from '../../features/DataTable';
import { CampusHandler } from '../../features/CampusStudentProject';

const AllStudents = () => {

    const [searchText, setSearchText] = React.useState('');
    const [studentData,setStudentData]=React.useState()
    const [pending, setPending] = useState(true);
    const [statusData,setStatusData]=useState({active:'',inactive:'',total:''})

    const titleFuntion=()=>{
        return(
            <div className='flex justify-between '>
                <h1>Students</h1>
                <div className='flex'>
                    <input type='text' onChange={(e)=>setSearchText(e.target.value)} 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder='Search' />  &nbsp;
                    </div>
            </div>
        )
    }

    const columns = [
        { name:  'Sr.', selector: (row,index) => index+1, width:"4rem"},
        { name: 'Name', selector: row => row.name.charAt(0).toUpperCase() + row.name.slice(1), width:"10rem" },
        { name: 'Email', selector: row => row.email },
        { name: 'phone Number', selector: row => row.phoneNumber },
        { name: 'Current Projects', selector: row => row.ProjectName.map((data,index)=>{return <div key={index+1}>{index+1}.{data}</div>}) },
        { name: 'No Of Projects', selector: row => row.TotalNumberOfProject },
    ];

    const GetMentorData = async ()=>{
        try {
          const resp = await authFetch('/api/campus/get-all-student');
          let data = CampusHandler(resp.data)
          setStudentData(data)
        //   let active = getfunction(resp.data,'active')
        //   let inactive = getfunction(resp.data,'inactive') 
        //   setStatusData({active:active.length,inactive:inactive.length,total:resp.data.data.length})
          setPending(false);
        } catch (error) {
        //   console.log(error)
        }
      }
    
      React.useEffect(() => {
        GetMentorData()
      },[])

  return (
        <>
        {/* <TotalDetails active={statusData.active} inactive={statusData.inactive} total={statusData.total}/> */}
        <div className="max-w-screen mx-auto mt-10 overflow-auto">
          <div className="container mx-auto">
             <div>
                <div className="flex justify-between items-center px-1 bg-white dark:bg-gray-800">
                    <div className=" text-sm text-gray-500">
                        <h2 className=" text-lg font-semibold text-orange-500 mb-4">Students</h2>
                    </div>  
                </div>
                <hr />
                <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                    <DataTable
                        columns={columns}
                        // data={!studentData?[]:studentData.filter((item) => {
                        //     if (searchText === "") { return item;} 
                        //     else if (item.StudentId.phoneNumber.toString().includes(searchText)){return item;}
                        //     else if (item.StudentId.name.toLowerCase().includes(searchText.toLowerCase())){return item;}
                        //     else if (item.StudentId.email.toLowerCase().includes(searchText.toLowerCase())){return item;}  
                        // })}
                        data={studentData}
                        customStyles={customStyles}
                        progressPending={pending}
                        pagination 
                        title={titleFuntion()}
                    />
                </div>
             </div>
         </div>
        </div>
        </>
  )
}

export default AllStudents