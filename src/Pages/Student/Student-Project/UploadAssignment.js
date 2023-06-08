import React,{useState,useEffect} from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { authFetch } from '../../../Middleware/axios/intance';
import jwtDecode from 'jwt-decode';
import { Token } from '../../../features/Token';
import UploadAssignmentModal from './UploadAssignmentModal';
import Message from '../../../features/Message';

const UploadAssignment = () => {
  const navigate = useNavigate()
    const location = useLocation()
    const {id} = useParams()
    let decode = jwtDecode(Token())
    const [assginment,setAssginment]=useState()
    const [singleProject,setSingleProject]=useState()
    const [open,setOpen] = useState(false)
    const [message,setMessage]=useState({message:'',type:''})
     

    const SubmitAssginment = async ()=>{
        try {
          const resp = await authFetch.patch(`/api/student/upload-Assiment/${id}`,{mentorId:location.state,projectsumary:assginment});
          setOpen(false)
          setMessage({message:resp.data.message,type:true})
          setTimeout(() => {
            navigate('/auth/student/my-project')
          },1000);
        } catch (error) {
          setMessage({message:error,type:false})
          setTimeout(() => {
            setMessage({message:"",type:""})
          },1000);
        }
    }

    const GetSingleProject =async()=>{
      try {
        const resp = await authFetch(`/api/student/intership/${id}`);
          setSingleProject(resp.data.data)
          let data = resp.data.data.assiment.find((data)=>data.student==decode.user._id)
          setAssginment(data.projectsumary)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      GetSingleProject()
    },[id])
    
  return (
        <>
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <div>
                    <h2 className="text-4xl font-semibold leading-tight text-center underline ">Submit Assginment</h2>
                </div>
                <br/>
                <div className="container mx-auto sm:px-8">
                {message.type !==''?message.type===false?
                  <Message message={message.message} css='flex p-4 mb-1 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-gray-800 dark:text-red-400' />
                  :
                  <Message message={message.message} css='flex p-4 mb-1 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-gray-800 dark:text-green-400' />
                :null}
                <div>
                  <h1> Project Name : {!singleProject?null:singleProject.title.toUpperCase()}</h1>
                  <h1> Description : {!singleProject?null:singleProject.description}</h1>
                  <h1> Intership Type : {!singleProject?null:singleProject.intershipType}</h1>
                </div>
                <div className="mb-6 mt-3 mx-10">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Summary</label>
                    <textarea type="text" id="name" name='name' value={assginment} onChange={(e)=>setAssginment(e.target.value)} rows={10} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Enter Project Summary" required />
                </div>
                </div>
                <div className='mt-3 text-center'>
                    <button type="button" onClick={()=>setOpen(true)} className="text-white text-end bg-orange-600 hover:bg-orange-400 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800">Submit Assginment</button>
                </div>
            </div>
        </div>
        <UploadAssignmentModal setOpen={setOpen} open={open} SubmitAssginment={SubmitAssginment} />
    </>
  )
}

export default UploadAssignment;