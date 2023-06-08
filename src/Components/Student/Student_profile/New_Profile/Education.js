import React,{useState,useEffect} from 'react'
import { authFetch } from '../../../../Middleware/axios/intance'
import Message from '../../../../features/Message';
import { useNavigate } from 'react-router-dom';
import { GetProfileDatas } from '../../../../features/ProfileData';


const Education = ({Data}) => {
    const navigate = useNavigate()
    const [data12th,setData12th] = useState({academicname:"12th",institution:"",percentage:'',passingYear:''})
    const [dataGraduation,setDataGraduation] = useState({academicname:"Graduation",institution:"",percentage:'',passingYear:''})
    const [dataPostGraduation,setDataPostGraduation] = useState({academicname:"Post Graduation",institution:"",percentage:'',passingYear:''})
    const [dataPHD,setDataPHD] = useState({academicname:"PHD",institution:"",})
    const [message,setMessage]=useState({message:'',type:''})
    const [graduationYear,setGraduationYear]=useState()
    const [postGraduationYear,setPostGraduation]=useState()
    

    const ProfileHandler12th =(e)=>{
        setData12th((pre)=>({
            ...pre,
            [e.target.name]:e.target.value,
        }))
        if(e.target.name =="passingYear"){
            let date = new Date(e.target.value)
            setGraduationYear(date.getFullYear()+3)
        }
    }
    const ProfileHandlerGraduation =(e)=>{
        setDataGraduation((pre)=>({
            ...pre,
            [e.target.name]:e.target.value,
        }))
        if(e.target.name =="passingYear"){
            let date = new Date(e.target.value)
            setPostGraduation(date.getFullYear()+2)
        }
    }
    const ProfileHandlerPostGradu =(e)=>{
        setDataPostGraduation((pre)=>({
            ...pre,
            [e.target.name]:e.target.value,
        }))
    }
    const ProfileHandlerPHD =(e)=>{
        setDataPHD((pre)=>({
            ...pre,
            [e.target.name]:e.target.value,
        }))
    }

    const SubmitProfileData =async(event)=>{
        event.preventDefault();
        try {
          const resp = await authFetch.patch('/api/student/update-education',{education:[data12th,dataGraduation,dataPostGraduation,dataPHD]})
          setMessage({message:resp.data.message,type:true})
          GetProfileData()
          setTimeout(() => {
            Data()
            navigate('/auth/student/profile/specialization')
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
          const resp = await authFetch('/api/student/profile');
        resp.data.data.education.map(data=>{
            if(data.academicname=="12th"){
                setData12th({academicname:"12th",institution:data.institution,percentage:data.percentage,passingYear:data.passingYear})
            }else if(data.academicname=="Graduation"){
                setDataGraduation({academicname:"Graduation",institution:data.institution,percentage:data.percentage,passingYear:data.passingYear})
            }else if(data.academicname=="Post Graduation"){
                setDataPostGraduation({academicname:"Post Graduation",institution:data.institution,percentage:data.percentage,passingYear:data.passingYear})
            }else if(data.academicname=="PHD"){
                setDataPHD({academicname:"PHD",institution:data.institution})
            }
        })
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
                    <div className="col-span-1">
                    <label htmlFor className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">12th</label>
                    </div>
                    <div className="col-span-2">
                    <label htmlFor className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Institution</label>
                    <input type="text" id="name" name='institution' value={data12th.institution} onChange={ProfileHandler12th} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Enter your College/Institute" />
                    </div>
                    <div className="col-span-2"> 
                    <label htmlFor className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Percentage</label>
                    <input type="text" id="name" name='percentage' value={data12th.percentage} onChange={ProfileHandler12th} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Enter your Cgpa/Percentage" />
                    </div>
                    <div className="col-span-2">
                    <label htmlFor className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Passing
                        Year</label>
                    <input type="month" name='passingYear'  min={`yyyy-06`} value={data12th.passingYear} onChange={ProfileHandler12th} id="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder />
                    </div>
                </div>
                </div>
                <div className="mb-6 ">
                <div className="grid gap-6 mb-6 md:grid-cols-7">
                    <div className="col-span-1">
                    <label htmlFor className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Graduation</label>
                    </div>
                    <div className="col-span-2">
                    <label htmlFor className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Institution</label>
                    <input type="text" id="name" name='institution' value={dataGraduation.institution} onChange={ProfileHandlerGraduation} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Enter your College/Institute" />
                    </div>
                    <div className="col-span-2">
                    <label htmlFor className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Percentage</label>
                    <input type="text" id="name" name='percentage' value={dataGraduation.percentage} onChange={ProfileHandlerGraduation} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Enter your Cgpa/Percentage" />
                    </div>
                    <div className="col-span-2">
                    <label htmlFor className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Passing
                        Year</label>
                    <input type="month" name='passingYear' min={`${graduationYear}-06`} value={dataGraduation.passingYear} onChange={ProfileHandlerGraduation} id="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder />
                    </div>
                </div>
                </div>
                <div className="mb-6 ">
                <div className="grid gap-6 mb-6 md:grid-cols-7">
                    <div className="col-span-1">
                    <label htmlFor className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Post Graduation</label>
                    </div>
                    <div className="col-span-2">
                    <label htmlFor className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Institution</label>
                    <input type="text" id="name" name='institution' value={dataPostGraduation.institution} onChange={ProfileHandlerPostGradu} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Enter your College/Institute" />
                    </div>
                    <div className="col-span-2">
                    <label htmlFor className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Percentage</label>
                    <input type="text" id="name" name='percentage' value={dataPostGraduation.percentage} onChange={ProfileHandlerPostGradu} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Enter your Cgpa/Percentage" />
                    </div>
                    <div className="col-span-2">
                    <label htmlFor className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Passing
                        Year</label>
                    <input type="month" name='passingYear' min={`${postGraduationYear}-06`} value={dataPostGraduation.passingYear} onChange={ProfileHandlerPostGradu} id="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder />
                    </div>
                </div>
                </div>
                <div className="mb-6 ">
                <div className="grid gap-6 mb-6 md:grid-cols-7">
                    <div className="col-span-1">
                    <label htmlFor className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">PHD</label>
                    </div>
                    <div className="col-span-2">
                    <label htmlFor className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Institution</label>
                    <input type="text" id="name"  name='institution' value={dataPHD.institution} onChange={ProfileHandlerPHD} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Enter your College/Institute" />
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