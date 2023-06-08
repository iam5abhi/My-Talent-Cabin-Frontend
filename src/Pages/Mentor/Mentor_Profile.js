import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { authFetch } from '../../Middleware/axios/intance';

const Mentor_Profile = () => {
    const navigate = useNavigate()
    const [campusData,setCampusData]=useState()
    const [categoryData,setCategoryData]=useState()
    const [newCategoryData,setNewCategoryData]=useState()
    const [subCategoryData,setSubCategoryData]=useState([])
    const [keyword, setKeyword] = useState();
    const [uploadImage,setUploadImage]=useState({image:"",avatar:""})
    const [formValue,setformValue]=useState({organization:'',domain:'',designation:'',interest_of_domain:''})
    

    const FromOnChangeHandler=(e)=>{
        setformValue((pre)=>({
            ...pre,
            [e.target.name]:e.target.value
        }))
    }

    const ImageHandler =(e)=>{
        setUploadImage((pre)=>({
            ...pre,
            avatar:e.target.files[0],
        }))
        let reader = new FileReader();
            reader.onloadend = function() {
                return setUploadImage({...uploadImage,image:reader.result})
            }
            reader.readAsDataURL(e.target.files[0])
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

    const SubmitProfileData =async(event)=>{
        event.preventDefault();
        try {
          const resp = await authFetch.post('/api/mentor/profile',{avatar:uploadImage.image,
            category:subCategoryData,organization:formValue.organization,domain:formValue.domain,
            designation:formValue.designation,interest_of_domain:formValue.interest_of_domain
          });
          navigate('/auth/mentors')
        } catch (error) {
          console.log(error)
        }
      }

    const GetCategoryData = async ()=>{
        try {
            const resp = await authFetch.get('/api/admin/subcategory');
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

    useEffect(() => {
        GetCategoryData()
        GetCampusData()
    },[])
  return (
        <>
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl bg-white shadow sm:rounded-lg flex justify-center flex-1">
            <div className="xl:w-7/12">
            <div className="mt-4 border-x-2 flex flex-col items-center">
                <h1 className="text-2xl xl:text-3xl font-extrabold">
                Profile Fillup
                </h1>
                <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-2xl">
                <form onSubmit={SubmitProfileData}>
                    <div className="mb-5 text-center">
                        <div className="mx-auto w-32 h-32 mb-2 border rounded-full relative bg-gray-100 mb-4 shadow-inset">
                            <img id="image" className="object-cover w-full h-32 rounded-full" src={uploadImage.image} />
                        </div>
                        <label htmlFor="fileInput" type="button" className="cursor-pointer inine-flex justify-between items-center focus:outline-none border py-2 px-4 rounded-lg shadow-sm text-left text-gray-600 bg-white hover:bg-gray-100 font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" className="inline-flex flex-shrink-0 w-6 h-6 -mt-1 mr-1" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <rect x={0} y={0} width={24} height={24} stroke="none" />
                            <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
                            <circle cx={12} cy={13} r={3} />
                            </svg>						
                            Browse Photo
                        </label>
                        <div className="mx-auto w-48 text-gray-500 text-xs text-center mt-1">Click to add profile picture</div>
                        <input name="photo" id="fileInput" onChange={ImageHandler} accept="image/*" className="hidden" type="file" />
                    </div>
                    <div className="mb-4">  
                    <select name='organization' onChange={FromOnChangeHandler} className="bg-gray-50 border mr-10 border-gray-300 text-gray-900 text-lg font-normal rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" required>
                        <option value='' >Choose a Organization</option>
                        {!campusData?null:campusData.map((data)=>{
                        return <option key={data._id} value={data._id}>{data.name}</option>
                        })}
                    </select>     
                    </div>
                    <input onChange={FromOnChangeHandler} className="block w-full p-4 mb-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" type="text" name='domain' placeholder="Domain" />
                    <input onChange={FromOnChangeHandler} className="block w-full p-4 mb-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" type="text" name='designation' placeholder="Designation" />
                    <input onChange={FromOnChangeHandler} className="block w-full p-4 mb-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" type="text" name='interest_of_domain' placeholder="Interest of Domain" />
                    <div className='mt-2'>   
                    <div>Choose Tags</div>    <br />
                    {!subCategoryData?null:subCategoryData.map((data)=>{
                        return <span id="badge-dismiss-default" className="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-orange-600 bg-orange-100 rounded dark:bg-orange-900 dark:text-orange-300">
                        {data.name}
                        <button type="button" onClick={()=>RemoveTags(data._id)} className="inline-flex items-center p-0.5 ml-2 text-sm text-orange-400 bg-transparent rounded-sm hover:bg-orange-200 hover:text-orange-900 dark:hover:bg-orange-800 dark:hover:text-orange-300" data-dismiss-target="#badge-dismiss-default" aria-label="Remove">
                            <svg aria-hidden="true" className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                            <span className="sr-only">Remove badge</span>
                        </button>
                        </span>
                    })}
                    <br /><br />
                    <div className="grid grid-cols-2 gap-20  ">
                        <div>
                        <div className="rounded shadow-md my-2 relative pin-t pin-l">
                              <ul className="list-reset">
                            <label htmlFor="large-input" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">input search</label>
                            <input type="text" id="small-input" value={keyword} onChange={UpdateKeyword} className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" />
                            {!newCategoryData?null:newCategoryData.map((data)=>{
                                return <li onClick={()=>TdClick(data._id)} ><p className="p-2 block text-black hover:bg-grey-light cursor-pointer">
                                 {data.name}
                                    <svg className="float-right" xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18"><path d="M6.61 11.89L3.5 8.78 2.44 9.84 6.61 14l8.95-8.95L14.5 4z" /></svg>
                                  </p></li>
                                })} 
                              </ul>
                            </div>
                        </div>
                    </div>
                    </div>
                    <button type='submit' className="mt-5 tracking-wide font-semibold bg-orange-600 text-gray-100 w-full py-4 rounded-lg hover:bg-orange-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                    <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy={7} r={4} />
                        <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span className="ml-3">
                        Update Profile
                    </span>
                    </button>
                </form>
                </div>
                </div>
            </div>
            </div>
            
        </div>
    </div>
    </>
  )
}

export default Mentor_Profile;