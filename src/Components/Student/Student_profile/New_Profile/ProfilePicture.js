import React,{useRef,useState,useEffect} from 'react'
import profileImage from '../../../../Assets/Images/avatar.png'
import { authFetch } from '../../../../Middleware/axios/intance';
import { useNavigate } from 'react-router-dom';
import Message from '../../../../features/Message';

const ProfilePicture = () => {
    const navigate = useNavigate()
    const inputFile = useRef(null);
    const [uploadImage,setUploadImage]=useState()
    const [message,setMessage]=useState({message:'',type:''})

    const ImageHandler =async(e)=>{
        let reader = new FileReader();
            reader.onloadend = function() {
                return setUploadImage(reader.result)
            }
            reader.readAsDataURL(e.target.files[0])
    }

    const SubmitHandler=async()=>{
        // try {
        //     const resp = await authFetch.patch('/api/student/upload-image',{avatar:uploadImage});
        //     setMessage({message:resp.data.message,type:true})
        //     GetProfileData()
        //     setTimeout(() => {
        //     //   Data()
              navigate('/auth/student/profile/personal-information')
        //       setMessage({message:"",type:''})
        //     },2000)    
        //   } catch (error) {
        //       setMessage({message:error,type:true})
        //     setTimeout(() => {
        //       setMessage({message:"",type:''})
        //     },2000)
        //   }
    }

    const GetProfileData =async()=>{
        try {
          const resp = await authFetch('/api/student/profile');
          setUploadImage(resp.data.data.avatar)
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
                <div className="col-span-6 ml-2 sm:col-span-4 md:mr-3">
                    <input type="file" ref={inputFile} onChange={ImageHandler} className="hidden" name="avatar" id="file-upload" accept="image/png, image/jpeg" />
                    <label className="block text-gray-700 text-sm font-bold mb-2 text-center" htmlFor="photo">
                        Profile Photo <span className="text-red-600"></span>
                    </label>
                    <div className="text-center">
                        {/* Current Profile Photo */}
                        <div className="mt-2" >
                            <img src={!uploadImage?profileImage:uploadImage} onClick={() => inputFile.current.click()} className="w-40 h-40 m-auto rounded-full shadow cursor-pointer" />
                        </div>
                        <button type="button" onClick={SubmitHandler} id="file-upload" className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150 mt-2 ml-3">
                        Upload Image
                    </button>
                  </div>
                </div>
              </div>
            </section >
          </div >
        </>
  )
}

export default ProfilePicture