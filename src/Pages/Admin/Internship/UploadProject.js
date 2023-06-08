import React, { useState, useEffect } from 'react';
import { ToastError, ToastSucess } from '../../../features/DisplayMessage';
import { useNavigate } from 'react-router-dom';
import { authFetch } from '../../../Middleware/axios/intance';



const UploadProject = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ companyId: "", title: "", description: "", intershipType: "",price:'',weeks:''})
  const [categoryData, setCategoryData] = useState()
  const [newCategoryData, setNewCategoryData] = useState()
  const [subCategoryData, setSubCategoryData] = useState([])
  const [keyword, setKeyword] = useState();
  const [companyData, setCompanyData] = useState()


  const UpdateKeyword = (e) => {
    const filtered = categoryData.filter((data) => {
      return data.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setKeyword(e.target.value)
    setNewCategoryData(filtered);
  }

  const TdClick = (id) => {
    const Addfiltered = categoryData.filter((data) => {
      return data._id === id
    });
    setKeyword('')
    setSubCategoryData([...subCategoryData, {
      name: Addfiltered[0].name, _id: Addfiltered[0]._id
    }])
    setNewCategoryData([])
  }

  const RemoveTags = (id) => {
    let remove = subCategoryData.filter((data) => data._id !== id)
    setSubCategoryData(remove)
  }

  const FormOnChangeHandler = (e) => {
    setFormData((pre) => ({
      ...pre,
      [e.target.name]: e.target.value
    }))
  }

  const GetCompanyData = async ()=> {
    try {
      const resp = await authFetch('company/accounts/api/v1/all-company-registerd-data');
      setCompanyData(resp.data.data);
    } catch (error) { ToastError(error) }
  }

  const GetCategoryData = async () => {
      try {
        const resp = await authFetch('admin/api/v1/subcategory');
        setCategoryData(resp.data);
      } catch (error) { ToastError(error) }
  }

  const FormSubmitHandler = async () => {
    try {
      const resp = await authFetch('admin/api/v1/intership', {CompanyId:formData.companyId, title:formData.title,
        description:formData.description, intershipWeek:formData.weeks, intershipType:formData.intershipType,
        price:formData.price, tags:subCategoryData
      });
      ToastSucess(resp.data.message)
      setTimeout(() => {
        navigate('/auth/admin/projects')
      }, 1000)
    } catch (error) { ToastError(error) }
  }

  useEffect(() => {
    GetCategoryData()
    GetCompanyData()
  }, [])
  return (
    <>
      <div className="flex min-h-full items-center justify-center  px-4 sm:px-6 lg:px-8 ">
        <div className="w-full  space-y-8  rounded-lg px-5 py-5 ">
          <section className="border border-gray-200 rounded-lg px-4 py-10">
            <div className="grid grid-cols-2 gap-20  ">
              <div className="mb-6">
                <label htmlFor="large-input" className="block mb-2 text-xl font-medium text-gray-900">Project Title</label>
                <input type="text" id="large-input" name='title' onChange={FormOnChangeHandler} className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-orange-500 focus:border-orange-500 " />
              </div>
              <div className="text-end">
                <button type="button" onClick={FormSubmitHandler} className="text-white text-end bg-orange-600 hover:bg-orange-400 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Add Project</button>
              </div>
            </div>
            <br />
            <div className="grid gap-6 md:grid-cols-1 pt-2">
              <div className="col-span-1">
                <label htmlFor="bordered-checkbox-1" className="w-full py-4 mx-2 text-base font-medium text-gray-900">Weeks:</label>
                <input id="default-radio-1" type="radio" onChange={FormOnChangeHandler} name="weeks" value='Winter' className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " />
                <label htmlFor="bordered-checkbox-1" className="w-full py-4 ml-2 text-base font-medium text-gray-900">Winter</label> &nbsp;
                <input id="default-radio-1" type="radio" onChange={FormOnChangeHandler} name="weeks" value='Summer' className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " />
                <label htmlFor="bordered-checkbox-1" className="w-full py-4 ml-2 text-base  font-medium text-gray-900">Summer</label>
              </div>
              <div>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-1 pt-2">
              <div className="col-span-1">
                <label htmlFor="bordered-checkbox-1" className="w-full py-4 mx-2 text-base font-medium text-gray-900">Type:</label>
                <input id="default-radio-1" type="radio" onChange={FormOnChangeHandler} name="intershipType" value='paid' className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " />
                <label htmlFor="bordered-checkbox-1" className="w-full py-4 ml-2 text-base font-medium text-gray-900">Paid</label> &nbsp;
                <input id="default-radio-1" type="radio" onChange={FormOnChangeHandler} name="intershipType" value='unpaid' className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " />
                <label htmlFor="bordered-checkbox-1" className="w-full py-4 ml-2 text-base  font-medium text-gray-900">Unpaid</label>
              </div>
              <div>
              </div>
            </div>
            {formData.intershipType == "paid" ? <>
              <div >
                <label htmlFor="small-input" className="block mb-2 ml-2 text-md font-medium text-gray-900">Price</label>
                <input type="text" id="small-input" name='price' onChange={FormOnChangeHandler} placeholder='Enter Price' className="block w-full ml-2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-orange-500 focus:border-orange-500 " />
              </div>
              <br />
            </>
              : null}
            <div>
              <div className="grid grid-cols-2 gap-20  ">
                <div>
                  <div className="rounded shadow-md my-2 relative pin-t pin-l">
                    <ul className="list-reset">
                      <label htmlFor="large-input" className="block mb-2 text-lg font-medium text-gray-900">Choose Tags</label>
                      {!subCategoryData ? null : subCategoryData.map((data) => {
                        return <span id="badge-dismiss-default" className="mb-2 inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-orange-600 bg-orange-100 rounded">
                          {data.name}
                          <button type="button" onClick={() => RemoveTags(data._id)} className="inline-flex items-center p-0.5 ml-2 text-sm text-orange-400 bg-transparent rounded-sm hover:bg-orange-200 hover:text-orange-900" data-dismiss-target="#badge-dismiss-default" aria-label="Remove">
                            <svg aria-hidden="true" className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                            <span className="sr-only">Remove badge</span>
                          </button>
                        </span>
                      })}
                      <input type="text" id="small-input" value={keyword} onChange={UpdateKeyword} className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-orange-500 focus:border-orange-500 " required />
                      {!newCategoryData ? null : newCategoryData.map((data) => {
                        return <li onClick={() => TdClick(data._id)} ><p className="p-2 block text-black hover:bg-grey-light cursor-pointer">
                          {data.name}
                          <svg className="float-right" xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18"><path d="M6.61 11.89L3.5 8.78 2.44 9.84 6.61 14l8.95-8.95L14.5 4z" /></svg>
                        </p></li>
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <hr />
            <br />
            <br />
            <div>
              <label htmlFor="message" className="block mb-2 text-xl font-medium text-gray-900">Project Description
              </label>
              <textarea id="message" onChange={FormOnChangeHandler} name='description' rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500 " placeholder="Write your project description here..." defaultValue={""} />
            </div>
            <br />
            <div>
              <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900">Select an option</label>
              <select id="countries" onChange={FormOnChangeHandler} name='companyId' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                <option selected>Choose a Company</option>
                {!companyData ? null : companyData.map((data, index) => {
                  return <option value={data._id}>{data.name}</option>
                })}
              </select>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default UploadProject;