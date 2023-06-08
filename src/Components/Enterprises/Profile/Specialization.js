import React,{useState,useEffect} from 'react'
import { authFetch } from '../../../Middleware/axios/intance'
import Message from '../../../features/Message';
import { GetProfileDatas } from '../../../features/ProfileData';
import { useNavigate } from 'react-router-dom';



const Specialization = () => {
  const navigate = useNavigate()
    const [formValue,setformValue]=useState({ copationDate:'', industrytype:'', companyowername:'',
                                              phoneNumber:'',turnover:'',url:''})
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
      const resp = await authFetch.patch('/api/enterpricess/profile',{copationDate:formValue.copationDate,
      industrytype:formValue.industrytype,companyowername:formValue.companyowername,phoneNumber:formValue.phoneNumber,
      turnover:formValue.turnover, url:formValue.url});
      setMessage({message:resp.data.message,type:true})
      setTimeout(() => {
        navigate('/auth/enterpricess')
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
      const resp = await authFetch('/api/enterpricess/profile');
        setformValue({...formValue,copationDate:resp.data.data.Incorporation_Date,industrytype:resp.data.data.Industry_Type,
        companyowername:resp.data.data.companyOwnerName,phoneNumber:resp.data.data.phoneNumber,turnover:resp.data.data.Turn_Over,
        url:resp.data.data.Website})
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
            <h2 className="text-xl py-4 font-bold sm:mb-4 mt-2 sm:mt-0">Business Information</h2>
            <form onSubmit={SubmitProfileData}>
            <div className="mb-6">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Concerned Person Name</label>
              <input type="text" id="companyowername" name='companyowername' value={!formValue?null:formValue.companyowername} onChange={FromOnChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Enter Concerned Person Name" required />
            </div>
            <div className="mb-6">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Concerned Person Phone Number</label>
              <input type="text" id="phoneNumber" name='phoneNumber' value={!formValue?null:formValue.phoneNumber} onChange={FromOnChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Enter Concerned Person Phone Number" required />
            </div> 
            <div className="mb-6">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Incorporation Date</label>
              <input type="date" id="copationDate" name='copationDate' value={!formValue?null:formValue.copationDate} onChange={FromOnChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Enter Incorporation Date" required />
            </div>
            <div className="mb-6"> 
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Industry Type</label> 
              <select id='industrytype' name='industrytype' value={!formValue?null:formValue.industrytype} onChange={FromOnChangeHandler}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500">
                <option value="">Choose a Industry Type</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Services">Services</option>
                <option value="Trading">Trading</option>
              </select>     
            </div>
            <div className="mb-6"> 
              <label htmlFor="turnover" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Turn Over</label> 
              <select id='turnover' name='turnover' value={!formValue?null:formValue.turnover} onChange={FromOnChangeHandler}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500">
                <option value="">Choose a Turn Over</option>
                <option value="Upto 1 cr">Upto 1 cr</option>
                <option value="1-10 Cr">1-10 Cr</option>
                <option value="10 & above">10 & above</option>
              </select>     
            </div>
            <div className="mb-6">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Website</label>
              <input type="url" id="url" name='url' value={!formValue?null:formValue.url} onChange={FromOnChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Enter Designation" required />
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