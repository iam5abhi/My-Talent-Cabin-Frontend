import React,{useState,useEffect} from 'react';
import { authFetch } from '../../Middleware/axios/intance';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useNavigate } from 'react-router-dom';



const animatedComponents = makeAnimated();

const Student_profile_Prev = () => {
    const navigate = useNavigate()
        const AcademicDetails = ["Graduation","Post Graduation","PHD","done"]
        const [formValues, setFormValues] = useState([{academicname:"12th",institution:"",percentage:'',passingYear:''}])
        const [categoryData,setCategoryData]=useState()
        const [selectCategory,setSelectCategory]=useState()
        const [campusData,setCampusData]=useState()
        const [printAcademic,setPrintAcademic]=useState(0)
        const [profileStep,setProfileStep]=useState({dob:'',family_occupation:'',gender:'',Category:'',campus:''})
        const [uploadImage,setUploadImage]=useState({image:"",avatar:""})


        console.log(profileStep,"profileStep")
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

        const ProfileHandler =(e)=>{
            setProfileStep((pre)=>({
                ...pre,
                [e.target.name]:e.target.value,
            }))
        }
        
        let handleChange = (i, e) => {
            let newFormValues = [...formValues];
            newFormValues[i][e.target.name] = e.target.value;
            setFormValues(newFormValues);
          }
        
        let addFormFields = () => {
                setFormValues([...formValues,{academicname:AcademicDetails[printAcademic],institution:"",percentage:'',passingYear:''}])
            setPrintAcademic(printAcademic+1)
        }

        const SubmitProfileData =async(event)=>{
            event.preventDefault();
            setProfileStep({...profileStep,step:0,status:'complete'})
            try {
              const resp = await authFetch.post('/api/student/profile',{avatar:uploadImage.image,dob:profileStep.dob,family_occupation:profileStep.family_occupation,
                gender:profileStep.gender,campus:profileStep.campus,Category:selectCategory,education:formValues
              });
              navigate('/auth/student')
            } catch (error) {
              console.log(error)
            }
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
        
        useEffect(() => {
            GetCategoryData()
            GetCampusData()
        },[])

      return (
            <>
            <div className="min-h-screen bg-gray-100 text-gray-900 p-10 flex justify-center">
            <div className="max-w-screen-xl bg-white shadow sm:rounded-lg flex justify-center">
                <div className="xl:w-9/12">
                <div className="mt-4 flex flex-col items-center">
                    {/* <h1 className="text-2xl xl:text-3xl font-extrabold">
                    Profile Fillup
                    </h1> */}
                    <div className="w-full flex-1 mt-8">
                    <div className="mx-auto max-w-4xl">
                    <form onSubmit={SubmitProfileData}>
                    {/* <div className="grid gap-6 md:grid-cols-2">
                        <div className="mx-auto w-32 h-32 mb-2 border rounded-full relative bg-gray-100 mb-4 shadow-inset">
                            <img id="image" className="object-cover w-full h-32 rounded-full" src={uploadImage.image} />
                        </div>
                        <div>
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
                    </div> */}
                <div className="flex items-center mb-4">
                    <label htmlFor="email" className="font-bold mb-1 text-gray-700 block">Family Occupation</label>
                    <div className="flex items-center">
                    <label className="flex justify-start items-center text-truncate rounded-lg bg-white pl-4 pr-6 py-3 shadow-sm mr-4">
                        <div className="text-teal-600 mr-3">
                        <input type="radio" name='family_occupation' defaultValue="salaried" onChange={ProfileHandler} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                        </div>
                        <div className="select-none text-gray-700">Salaried</div>
                    </label>
                    <label className="flex justify-start items-center text-truncate rounded-lg bg-white pl-4 pr-6 py-3 shadow-sm">
                        <div className="text-teal-600 mr-3">
                        <input type="radio" name='family_occupation' defaultValue="agriculture" onChange={ProfileHandler} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                        </div>
                        <div className="select-none text-gray-700">Agriculture</div>
                    </label>
                    <label className="flex justify-start items-center text-truncate rounded-lg bg-white pl-4 pr-6 py-3 shadow-sm">
                        <div className="text-teal-600 mr-3">
                        <input type="radio" name='family_occupation' defaultValue="business" onChange={ProfileHandler} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                        </div>
                        <div className="select-none text-gray-700">Business</div>
                    </label>
                    </div>
                </div>
                <div className="flex items-center mb-4">
                    <label htmlFor="password" className="w-28 block mb-2 text-sm font-bold text-gray-900 dark:text-white">Date Of Birth</label>
                    <input type="date" name='dob' onChange={ProfileHandler} className="px-3 py-3 bg-gray-50 font-medium border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" required />
                </div>
                <div className="flex items-center mb-4">
                    <label htmlFor="email" className="font-bold mb-1 text-gray-700 block">Gender</label>
                    <div className="flex">
                    <label className="flex justify-start items-center text-truncate rounded-lg bg-white pl-4 pr-6 py-3 shadow-sm mr-4">
                        <div className="text-teal-600 mr-3">
                        <input type="radio" name="gender" onChange={ProfileHandler} defaultValue="Male" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div className="select-none text-gray-700">Male</div>
                    </label>
                    <label className="flex justify-start items-center text-truncate rounded-lg bg-white pl-4 pr-6 py-3 shadow-sm">
                        <div className="text-teal-600 mr-3">
                        <input type="radio" name="gender" onChange={ProfileHandler} defaultValue="Female" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div className="select-none text-gray-700">Female</div>
                    </label>
                    <label className="flex justify-start items-center text-truncate rounded-lg bg-white pl-4 pr-6 py-3 shadow-sm">
                        <div className="text-teal-600 mr-3">
                        <input type="radio" name="gender" onChange={ProfileHandler} defaultValue="Other" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className="select-none text-gray-700">Other</div>
                    </label>
                    </div>
                </div>
                <div className="mb-4">  
                    <select name='campus' onChange={ProfileHandler} className="bg-gray-50 border mr-10 border-gray-300 text-gray-900 text-lg font-normal rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" required>
                        <option value='' >Choose a Campus</option>
                        {!campusData?null:campusData.map((data)=>{
                        return <option key={data._id} value={data._id}>{data.name}</option>
                        })}
                    </select>     
                </div>
                <div className="mb-4">  
                    <Select options={categoryData} value={selectCategory} onChange={values => setSelectCategory(values)} className="bg-gray-50 border mr-10 border-gray-300 text-gray-900 text-lg font-normal rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                     components={animatedComponents} placeholder="Select a Category" isMulti required/>
                </div>
                    {/* {formValues.map((element, index) =>{   */}
                        {/* return <> */}
                    <div className="grid md:grid-cols-4"> 
                        <div className="flex items-center mb-2">
                            <h1 className="text-sm font-bold text-gray-900">12th</h1>
                        </div>
                        <div className="mb-5">
                            {/* <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white -ml-12">Institution</label> */}
                            <input type="text" name='institution' className="-ml-12 px-3 py-3 bg-gray-50 font-medium border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="College/Institution Name" required />
                        </div>
                        <div className="mb-5">
                            {/* <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white -ml-6">Percentage</label> */}
                            <input type="text" name='percentage' className="-ml-6 px-3 py-3 bg-gray-50 font-medium border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="CGPA/Percentage" required />
                        </div> 
                        <div className="mb-5">
                            {/* <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Passing Year</label> */}
                            <input type="month" name='passingYear' className="px-3 py-3 bg-gray-50 font-medium border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Passing Year" required />
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-4"> 
                        <div className="flex items-center mb-2">
                            <h1 className="text-sm font-bold text-gray-900">Graduation</h1>
                        </div>
                        <div className="mb-5">
                            {/* <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white -ml-12">Institution</label> */}
                            <input type="text" name='institution' className="-ml-12 px-3 py-3 bg-gray-50 font-medium border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Enter Your College/Institution Name" required />
                        </div>
                        <div className="mb-5">
                            {/* <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white -ml-6">Percentage</label> */}
                            <input type="text" name='percentage' className="-ml-6 px-3 py-3 bg-gray-50 font-medium border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Enter Your CGPA/Percentage" required />
                        </div> 
                        <div className="mb-5">
                            {/* <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Passing Year</label> */}
                            <input type="month" name='passingYear' className="px-3 py-3 bg-gray-50 font-medium border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Enter Your Passing Year" required />
                        </div>
                    </div>


                    <div className="grid gap-6 md:grid-cols-4"> 
                        <div className="flex items-center mb-2">
                            <h1 className="text-sm font-bold text-gray-900">Post Graduation</h1>
                        </div>
                        <div className="mb-5">
                            {/* <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white -ml-12">Institution</label> */}
                            <input type="text" name='institution' className="-ml-12 px-3 py-3 bg-gray-50 font-medium border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Enter Your College/Institution Name" required />
                        </div>
                        <div className="mb-5">
                            {/* <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white -ml-6">Percentage</label> */}
                            <input type="text" name='percentage' className="-ml-6 px-3 py-3 bg-gray-50 font-medium border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Enter Your CGPA/Percentage" required />
                        </div> 
                        <div className="mb-5">
                            {/* <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Passing Year</label> */}
                            <input type="month" name='passingYear' className="px-3 py-3 bg-gray-50 font-medium border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Enter Your Passing Year" required />
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-4"> 
                        <div className="flex items-center mb-2">
                            <h1 className="text-sm font-bold text-gray-900">PHD</h1>
                        </div>
                        <div className="mb-5">
                            {/* <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white -ml-12">Institution</label> */}
                            <input type="text" name='institution' className="-ml-12 px-3 py-3 bg-gray-50 font-medium border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Enter Your College/Institution Name" required />
                        </div>
                    </div>
                    {/* </> */}
                    {/* // })} */}
                    {/* {AcademicDetails[printAcademic]==="done"?null:<button type='button' onClick={addFormFields} className="w-32 focus:outline-none border border-transparent py-2 px-5 rounded-lg shadow-sm text-center text-white bg-orange-500 hover:bg-orange-600 font-medium">Add More</button>} */}


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

export default Student_profile_Prev