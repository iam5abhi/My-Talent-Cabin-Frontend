import React,{useState} from 'react';
import { useParams } from 'react-router-dom';
import { ToastError } from '../../../features/DisplayMessage';
import { authFetch } from '../../../Middleware/axios/intance';

const ViewJob = () => {
    const {id} = useParams()
    const [studentData,setStudentData]=useState()
    
    const GetSingleDocterData = async ()=> {
        try {
        const res = await authFetch(`admin/api/v1/job/${id}`);
          setStudentData(res.data.data)
        } catch (error) { ToastError(error.data.message) }
    }
  
    React.useEffect(()=>{
      GetSingleDocterData();
    },[id])
  return (
        <>
        <div className="container w-11/15 mx-auto px-4 bg-white rounded ">
            <div className="relative flex flex-col flex-auto min-w-0 mt-4 p-4 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border mb-4 draggable" draggable="true">
                <div className="-mx-3">
                    <div className="flex-none grid md:grid-cols-1 w-auto max-w-full px-3 my-auto">
                        <div className="h-full border border-gray-300 shadow-md py-2 px-4 rounded-lg">
                            <h5 className="mb-1 text-2xl font-semibold">{!studentData?null:studentData.Company_Name}</h5>
                            <p className="mb-0  leading-normal text-slate-600 text-size-sm"><i className="fa-solid fa-location-dot" /> {!studentData?null:studentData.city}</p>
                            <p className="mb-0  leading-normal text-slate-600 text-size-sm"> {!studentData?null:studentData.designation}</p> 
                            <p className="mb-0  leading-normal text-slate-600 text-size-sm"> {!studentData?null:studentData.experience}</p>
                            <p className="mb-0  leading-normal text-slate-600 text-size-sm"> {!studentData?null:studentData.Budget}</p>  
                            <p className="mb-0  leading-normal text-slate-600 text-size-sm"> {!studentData?null:studentData.description}</p> 
                        </div>
                    </div>
                    <div className="flex-none grid md:grid-cols-1 mt-5 w-auto max-w-full px-3 my-auto">
                      <h1 className="mb-1 text-lg font-semibold">Applied</h1>
                        <table className="table-fixed border border-gray-300 shadow-md">
                          <thead>
                              <tr>
                              <th className="py-3 px-3">Sr.</th>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Number</th>
                              <th>Experience</th>
                              <th>Current CTC</th>
                              <th>Company</th>
                              <th>Applied Date</th>
                            </tr>
                          </thead>
                          <tbody>
                          {!studentData?null:studentData.applyJobs.map((data,index)=>{
                            return(
                              <>
                              <tr key={index+1} className='text-center'>
                              <td className="py-2 px-2">{index+1}.</td>
                              <td>{data.name}</td>
                              <td>{data.email}</td>
                              <td>{data.PhoneNumber}</td>
                              <td>{data.experience}</td>
                              <td>{data.current_ctc}</td>
                              <td>{data.currentcompany}</td>
                              <td>{data.Date}</td>
                            </tr>
                              </>
                            )
                          })}
                          </tbody>
                        </table>
                    </div>
                    </div>
                </div>
        </div>
    </>
  )
}

export default ViewJob;