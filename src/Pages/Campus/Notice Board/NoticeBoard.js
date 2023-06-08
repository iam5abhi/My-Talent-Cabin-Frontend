import React, { useState } from 'react';
import DataTable from 'react-data-table-component';                      
import { authFetch } from "../../../Middleware/axios/intance"
import { customStyles } from '../../../features/DataTable';
import AddNotice from '../../../Components/Campus/Notice Board/AddNotice';
import DeleteNotice from '../../../Components/Campus/Notice Board/DeleteNotice';


const NoticeBoard = () => {

    const [searchText, setSearchText] = React.useState('');
    const [studentData,setStudentData]=React.useState()
    const [addOpen,setAddOpen]=useState(false)
    const [deleteOpen,setDeleteOpen]=useState(false)
    const [pending, setPending] = useState(true);
    const [Id,setId]=React.useState()

    const NoticeBoardComponent=()=>{
        return(
            <div className='flex justify-between mt-3 -mb-7'>
            <h1 className='font-bold text-orange-500'>Notice Board</h1>
            <div className='grid grid-cols-2 gap-4'>
              <div>
              <input type='text' onChange={(e)=>setSearchText(e.target.value)} 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-orange-500 focus:border-orange-500 block w-full p-3" placeholder='Search' />  &nbsp;
                </div>
                <div>
                <button type="button" onClick={()=>setAddOpen(true)} className="text-white text-lg bg-orange-600 hover:bg-orange-400 focus:ring-4 focus:ring-orange-300 rounded-full px-4 py-2">
                  <i class="fa-solid fa-plus"></i> Add Notice</button>
                </div>
            </div>
        </div>
        )
    }

    const columns = [
        { name:  'Sr.', selector: (row,index) => index+1, width:"9rem"},
        { name: 'Title', selector: row => row.title.charAt(0).toUpperCase() + row.title.slice(1), width:"15rem" },
        { name: 'Description', selector: row => `${row.description.substring(0,20)}...`, }, // `${row.email.substring(0,10)}...`
        { name: 'Date', selector: row =>row.Date.substring(0,10),}, 
        { name: 'Action', selector: row =><div>
            <button onClick={()=>NoticeDeleteHandler(row._id)} type="button" data-tooltip="View Student Details" className="px-2 ml-2 py-1 rounded-full focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-orange-300 font-medium  text-sm  mr-2 mb-2">
        <i className="fa-solid fa-trash" /></button >
        </div>, width:"14rem" }, 
    ];

    const NoticeDeleteHandler=(id)=>{
        setId(id)
        setDeleteOpen(true)
    }

    const GetNoticeData = async ()=>{
        try {
          const resp = await authFetch('/api/campus/notice-board');
          setStudentData(resp.data.data)
          setPending(false);
        } catch (error) {
          console.log(error)
        }
      }
    
      React.useEffect(() => {
        GetNoticeData()
      },[])
    
  return (
        <>
        <div className="max-w-screen mx-auto mt-10 overflow-auto">
          <div className="container mx-auto">
             <div>
                <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                    <DataTable
                    columns={columns}
                    data={!studentData?[]:studentData.filter((item) => {
                        if (searchText === "") { return item;} 
                        else if (item.title.toLowerCase().includes(searchText.toLowerCase())){return item;}
                        else if (item.Date.toString().includes(searchText)){return item;}
                    })}
                    customStyles={customStyles}
                    progressPending={pending}
                    pagination 
                    title={NoticeBoardComponent()}
                    />
                </div>
             </div>
         </div>
        </div> 
         <AddNotice setOpen={setAddOpen} open={addOpen} GetNoticeData={GetNoticeData} />
         { deleteOpen === true ?<DeleteNotice setOpen={setDeleteOpen} open={deleteOpen} id={Id} GetNoticeData={GetNoticeData} />: null}  
        </>
  )
}

export default NoticeBoard