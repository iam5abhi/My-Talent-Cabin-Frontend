import React,{useState,useEffect} from 'react'
import { authFetch } from '../../../Middleware/axios/intance'
import Message from '../../../features/Message';
import { GetProfileDatas } from '../../../features/ProfileData';
import { useNavigate } from 'react-router-dom';



const Specialization = () => {
  const navigate = useNavigate()
    const [categoryData,setCategoryData]=useState()
    const [campusData,setCampusData]=useState()
    const [newCategoryData,setNewCategoryData]=useState()
    const [subCategoryData,setSubCategoryData]=useState([])
    const [keyword, setKeyword] = useState();
    const [formValue,setformValue]=useState({organization:'',designation:''})
    const [message,setMessage]=useState({message:'',type:''})

    const FromOnChangeHandler=(e)=>{
      setformValue((pre)=>({
          ...pre,
          [e.target.name]:e.target.value
      }))
  }

  const UpdateKeyword = (e) => {
    const filtered = categoryData.filter((data) => {
          return data.name.toLowerCase().includes(e.target.value.toLowerCase());
        });
      setKeyword(e.target.value)
      setNewCategoryData(filtered);
  }

  const TdClick=(id)=>{
    const Addfiltered = categoryData.filter((data) => {
        return data._id === id
      });
    setKeyword('')
    setSubCategoryData([...subCategoryData,{
        name:Addfiltered[0].name,_id:Addfiltered[0]._id
    }])
    setNewCategoryData([])
  }

  const RemoveTags =(id)=>{
    let remove = subCategoryData.filter((data) => data._id !== id)
    setSubCategoryData(remove) 
}
    const GetCategoryData =async()=>{
        try {
          const resp = await authFetch.get('/api/mentor/all-skill');
            setCategoryData(resp.data.data)
        } catch (error) {
          console.log(error)
        }
    }

    const GetCampusData =async()=>{
        try {
          const resp = await authFetch.get('/api/mentor/all-campus');
          setCampusData(resp.data.data)
        } catch (error) {
          console.log(error)
        }
      }

    const SubmitProfileData =async(event)=>{
      event.preventDefault();
      try {
        const resp = await authFetch.patch('/api/mentor/update-specialization',{organization:formValue.organization,
        designation:formValue.designation,category:subCategoryData});
        setMessage({message:resp.data.message,type:true})
        navigate('/auth/mentors')
        // await GetProfileDatas()
        setTimeout(() => {
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
         setformValue({...formValue,organization:resp.data.data.organization.name,designation:resp.data.data.designation})
         let categoryData = resp.data.data.category.map(data=>({_id:data._id._id,name:data._id.name}))
         console.log(categoryData,"categoryData")
         setSubCategoryData(categoryData)
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
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Organization</label> 
                    <select id='campus' name='organization' value={!formValue?null:formValue.organization} onChange={FromOnChangeHandler}
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500">
                        <option value="" >{!formValue.organization?"Choose a Organization":formValue.organization}</option>
                        {!campusData?null:campusData.map((data)=>{
                        return <option key={data._id} value={data._id}>{data.name}</option>
                        })}
                    </select>     
                </div>
                <div className="mb-6">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Designation</label>
                <input type="text" id="name" name='designation' value={!formValue?null:formValue.designation} onChange={FromOnChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Enter Designation" required />
                </div>
                <div className="mb-6">  
                    {!subCategoryData?null:subCategoryData.map((data)=>{
                        return <span id="badge-dismiss-default" className="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-orange-600 bg-orange-100 rounded dark:bg-orange-900 dark:text-orange-300">
                        {data.name}
                        <button type="button" onClick={()=>RemoveTags(data._id)} className="inline-flex items-center p-0.5 ml-2 text-sm text-orange-400 bg-transparent rounded-sm hover:bg-orange-200 hover:text-orange-900 dark:hover:bg-orange-800 dark:hover:text-orange-300" data-dismiss-target="#badge-dismiss-default" aria-label="Remove">
                            <svg aria-hidden="true" className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                            <span className="sr-only">Remove badge</span>
                        </button>
                        </span>
                    })}
                      <ul className="list-reset">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose your interest of domain</label>
                        <input type="text" name="interest_of_domain" value={keyword} onChange={UpdateKeyword} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="interest of domain" />
                        {!newCategoryData?null:newCategoryData.map((data)=>{
                            return <li onClick={()=>TdClick(data._id)} ><p className="p-2 block text-black hover:bg-grey-light cursor-pointer">
                              {data.name}
                                <svg className="float-right" xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18"><path d="M6.61 11.89L3.5 8.78 2.44 9.84 6.61 14l8.95-8.95L14.5 4z" /></svg>
                              </p></li>
                            })} 
                      </ul>
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