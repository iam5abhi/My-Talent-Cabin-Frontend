import React,{useState,useEffect} from 'react'
import { authFetch } from '../../../Middleware/axios/intance'
import Message from '../../../features/Message';
import { useNavigate } from 'react-router-dom';



const Specialization = () => {
  const navigate = useNavigate()
    const [formValue,setformValue]=useState({instagram:'',facebook:'',linkedin:''})
    const [message,setMessage]=useState({message:'',type:''})

    const FromOnChangeHandler=(e)=>{
      setformValue((pre)=>({
          ...pre,
          [e.target.name]:e.target.value
      }))
  }

    const SubmitProfileData =async(event)=>{
      event.preventDefault();
      try {
        const resp = await authFetch.patch('/api/campus/campus-social-media-link',formValue);
        setMessage({message:"Add Successfully",type:true})
        setTimeout(() => {
          navigate('/auth/campus')
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
        const resp = await authFetch('/api/campus/get-collage-profile');
         setformValue({...formValue,instagram:resp.data.instagram,facebook:resp.data.facebook,linkedin:resp.data.linkedin })
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
                Social Media
            </h2>
            <form onSubmit={SubmitProfileData}>
                <div className="mb-2">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Instagram</label>
                <input type="url" id="name" pattern="https://.*" name='instagram' value={!formValue?null:formValue.instagram} onChange={FromOnChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Enter Instagarm" required />
                </div>
                <div className="mb-2">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Facebook</label>
                <input type="url" id="name" pattern="https://.*" name='facebook' value={!formValue?null:formValue.facebook} onChange={FromOnChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Enter Facebook" required />
                </div>
                <div className="mb-6">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Linkedin</label>
                <input type="url" id="name" pattern="https://.*" name='linkedin' value={!formValue?null:formValue.linkedin} onChange={FromOnChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Enter Linkedin" required />
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

export default Specialization