import React,{useState,useEffect} from 'react'
import { authFetch } from '../../../Middleware/axios/intance'
import Message from '../../../features/Message';
import { useNavigate } from 'react-router-dom';
import { GetProfileDatas } from '../../../features/ProfileData';


const Education = () => {
    const navigate = useNavigate()
    const [dataPHD,setDataPHD] = useState({academicname:"",institution:"",passingYear:''})
    const [message,setMessage]=useState({message:'',type:''})
    

    const ProfileHandlerPHD =(e)=>{
        setDataPHD((pre)=>({
            ...pre,
            [e.target.name]:e.target.value,
        }))
    }

    const SubmitProfileData =async(event)=>{
        event.preventDefault();
        try {
          const resp = await authFetch.patch('/api/mentor/update-education',{education:[dataPHD]})
          setMessage({message:resp.data.message,type:true})
        //   await GetProfileDatas()
          setTimeout(() => {
            navigate('/auth/mentors/profile/specialization')
            setMessage({message:"",type:''})
          },2000)    
        } catch (error) {
            setMessage({message:error,type:true})
          setTimeout(() => {
            setMessage({message:"",type:''})
          },2000)
        }
      }  

    const GetProfileData =async()=>{
        try {
          const resp = await authFetch('/api/mentor/profile');
        console.log(resp.data.data.education)
            setDataPHD({academicname:resp.data.data.education[0].academicname,institution:resp.data.data.education[0].institution,
                passingYear:resp.data.data.education[0].passingYear})
        } catch (error) {
          console.log(error)
        }
      } 
  
      useEffect(() => {
          GetProfileData()
      },[])

  return (
        <>
        <div className="p-4 bg-white w-full">
        <section>
            <div className="w-full py-4 ">
            {message.type !==''?message.type===false?
            <Message message={message.message} css='flex p-4 mb-1 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-gray-800 dark:text-red-400' />
            :
            <Message message={message.message} css='flex p-4 mb-1 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-gray-800 dark:text-green-400' />
            :null}
            <h2 className="text-xl py-4 font-bold sm:mb-4 mt-2 sm:mt-0">
                Education
            </h2>
            <form onSubmit={SubmitProfileData}>
                <div className="mb-6 ">
                    <div className="grid gap-6 mb-6 md:grid-cols-7">
                        <div className="col-span-2">
                        <label htmlFor className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Higher Education</label>
                        <input type="text" id="name"  name='academicname' value={dataPHD.academicname} onChange={ProfileHandlerPHD} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Enter your Qualification" />
                        </div>
                        <div className="col-span-2">
                        <label htmlFor className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Institution</label>
                        <input type="text" id="name"  name='institution' value={dataPHD.institution} onChange={ProfileHandlerPHD} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Enter your College/Institute" />
                        </div>
                        <div className="col-span-2">
                        <label htmlFor className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Passing
                            Year</label>
                        <input type="month" name='passingYear' value={dataPHD.passingYear}  onChange={ProfileHandlerPHD} id="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="mm-yyyy" />
                        </div>
                    </div>
                </div>
                <div className="mt-12 mb-2 sm:flex">
                    <button type='submit' className="block w-full sm:w-auto px-6 py-2 font-medium rounded bg-orange-600
                    hover:bg-orange-700 text-white">Submit</button>
                </div>
            </form>
            </div>
        </section>
        </div>
    </>
  )
}

export default Education