import React,{useState,useEffect} from 'react'
import { authFetch } from '../../../../Middleware/axios/intance'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Message from '../../../../features/Message';
import { useNavigate } from 'react-router-dom';



const Specialization = ({Data}) => {
  const navigate = useNavigate()
    const animatedComponents = makeAnimated();
    const [categoryData,setCategoryData]=useState()
    const [campusData,setCampusData]=useState()
    const [selectCategory,setSelectCategory]=useState()
    const [selectcampus,setSelectcampus]=useState()
    const [message,setMessage]=useState({message:'',type:''})

    console.log(selectCategory,"selectCategory")
    const SpecializationHandler=(e)=>{
      setSelectcampus(e.target.value)
    }

    const GetCategoryData =async()=>{
        try {
          const resp = await authFetch.get('/api/student/all-category');
            let remove = resp.data.data.filter((id) =>(id.title !== "General" ))
            let newData=remove.map(data=>{ return {label:data.title,value:data._id}})
            setCategoryData(newData)
        } catch (error) {
          console.log(error)
        }
    }

    const GetCampusData =async()=>{
        try {
          const resp = await authFetch.get('/api/student/all-campus');
          setCampusData(resp.data.data)
        } catch (error) {
          console.log(error)
        }
      }

    const SubmitProfileData =async(event)=>{
      event.preventDefault();
      try {
        const resp = await authFetch.patch('/api/student/update-specialization',{Category:selectCategory,campus:selectcampus});
        setMessage({message:resp.data.message,type:true})
        navigate('/auth/student')
        GetProfileData()
        setTimeout(() => {
          Data()
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
        setSelectcampus(resp.data.data.campus)
        let category = resp.data.data.Category.map(data=>({label:data.value.title,value:data.value._id}))
        setSelectCategory(category)
      } catch (error) {
        console.log(error)
      }
    } 

    useEffect(() => {
        GetProfileData()
        GetCategoryData()
        GetCampusData()
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
                Specialization
            </h2>
            <form onSubmit={SubmitProfileData}>
            <div className="mb-6">  
                    <select id='campus' value={!selectcampus?null:selectcampus._id} onChange={SpecializationHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500">
                        <option value=''>Choose a Campus</option>
                        {!campusData?null:campusData.map((data)=>{
                        return <option key={data._id} value={data._id}>{data.name}</option>
                        })}
                    </select>     
                </div>
                <div className="mb-6">  
                    <Select options={categoryData} value={selectCategory} onChange={values => setSelectCategory(values)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                     components={animatedComponents} placeholder="Choose area of interest " isMulti required/>
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