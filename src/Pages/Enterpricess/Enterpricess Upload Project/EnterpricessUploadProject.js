import React,{useState,useEffect} from 'react';
import { authFetch } from '../../../Middleware/axios/intance';
import { States,Citys} from '../../../TestHandler/IndianState'


const EnterpricessUploadProject = () => {
    const [citys,setCitys]=useState()
    const [formData,setFormData]=useState({title:"", description:"", intershipType:"", number_of_opening:"",city:'',state:''})
    const [categoryData,setCategoryData]=useState()
    const [newCategoryData,setNewCategoryData]=useState()
    const [subCategoryData,setSubCategoryData]=useState([])
    const [keyword, setKeyword] = useState();

    
    const Cityhandler =(e)=>{
        setCitys(Citys[e.target.value].split(','))
        setFormData({...formData,state:States[e.target.value-1]})
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

    const FormOnChangeHandler =(e)=>{
        setFormData((pre)=>({
            ...pre,
            [e.target.name]:e.target.value
        }))
    }
    
    const GetCategoryData = async ()=>{
        try {
            const resp = await authFetch.get('/api/enterpricess/subcategory');
            setCategoryData(resp.data.data)
          } catch (error) {
            console.log(error)
          }
    }

    const FormSubmitHandler=async()=>{
        try {
            const resp = await authFetch.post('/api/enterpricess/intership',{title:formData.title,description:formData.description,
            tags:subCategoryData,intershipType:formData.intershipType,number_of_opening:formData.number_of_opening,city:formData.city,state:formData.state});
            console.log(resp,'resp')
          } catch (error) {
            console.log(error)
          }
    }

    useEffect(() => {
        GetCategoryData()
    },[])
  return (
        <>
        <div className="flex min-h-full items-center justify-center  px-4 sm:px-6 lg:px-8 ">
            <div className="w-full  space-y-8  rounded-lg px-5 py-5 ">
                <section className="border border-gray-200 rounded-lg px-4 py-10">
                <div className="grid grid-cols-2 gap-20  ">
                    <div className="mb-6">
                    <label htmlFor="large-input" className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">Project Title</label>
                    <input type="text" id="large-input" name='title' onChange={FormOnChangeHandler} className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" />
                    </div>
                    <div className="text-end">
                    <button type="button" onClick={FormSubmitHandler} className="text-white text-end bg-orange-600 hover:bg-orange-400 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800">Start
                        Now</button>
                    </div>
                </div>
                <br />
                <div className="grid gap-6 md:grid-cols-1 pt-2">
                    <div className="col-span-1">
                    <label htmlFor="bordered-checkbox-1" className="w-full py-4 mx-2 text-base font-medium text-gray-900 dark:text-gray-300">Internship:</label>
                    <input id="default-radio-1" type="radio" onChange={FormOnChangeHandler} name="intershipType" value='3 Month Winter' className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="bordered-checkbox-1" className="w-full py-4 ml-2 text-base font-medium text-gray-900 dark:text-gray-300">3 Month Winter</label>
                    <input id="default-radio-1" type="radio" onChange={FormOnChangeHandler} name="intershipType" value='6 Month Summer' className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="bordered-checkbox-1" className="w-full py-4 ml-2 text-base  font-medium text-gray-900 dark:text-gray-300">6 Month Summer</label>
                    </div>
                    <div>
                    </div>
                </div>
                <br />
                <div>
                    <div>Choose Tags</div><br />
                    {!subCategoryData?null:subCategoryData.map((data)=>{
                        return <span id="badge-dismiss-default" className="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-orange-600 bg-orange-100 rounded dark:bg-orange-900 dark:text-orange-300">
                        {data.name}
                        <button type="button" onClick={()=>RemoveTags(data._id)} className="inline-flex items-center p-0.5 ml-2 text-sm text-orange-400 bg-transparent rounded-sm hover:bg-orange-200 hover:text-orange-900 dark:hover:bg-orange-800 dark:hover:text-orange-300" data-dismiss-target="#badge-dismiss-default" aria-label="Remove">
                            <svg aria-hidden="true" className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                            <span className="sr-only">Remove badge</span>
                        </button>
                        </span>
                    })}
                    <div className="grid grid-cols-2 gap-20  ">
                        <div>
                            <label htmlFor="large-input" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">input search</label>
                            <input type="text" id="small-input" value={keyword} onChange={UpdateKeyword} className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" />
                            <table>
                            <tr>
                                {!newCategoryData?null:newCategoryData.map((data)=>{
                                    return <td onClick={()=>TdClick(data._id)} >{data.name}</td>
                                })} 
                            </tr>
                            </table>
                        </div>
                    </div>
                    </div>
                    <br />
                    <hr />
                    <br />
                    <br />
                    <div>
                    <label htmlFor="message" className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">Project Description
                    </label>
                    <textarea id="message" onChange={FormOnChangeHandler} name='description' rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Write your project description here..." defaultValue={""} />
                </div>
                <br />
                <div>
                    <div>
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number of Internships</label>
                    <input type="text" id="first_name" name='number_of_opening' onChange={FormOnChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter no. of internships" required />
                    </div>
                    <div className='grid gap-6 mb-6 md:grid-cols-2 mt-5'>
                    <div>
                      <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                      <select id="countries" onChange={Cityhandler} name='state' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option selected>Choose a State</option>
                      {States.map((state,index)=>{
                        return <option value={index+1}>{state}</option>
                      })}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                      <select id="countries" onChange={FormOnChangeHandler} name='city' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option selected>Choose a City</option>
                      {!citys?null:citys.map((city)=>{
                        return <option value={city}>{city}</option>
                      })}
                      </select>
                    </div>
                  </div>                         
                </div>
                </section>
            </div>
        </div>

    </>
  )
}

export default EnterpricessUploadProject;