import React from 'react'
import { useLocation } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditProjectComponents = ({data,RemoveTags,TdClick}) => {
    const location = useLocation()
  return (
        <>
        <div className="flex min-h-full items-center justify-center  px-4 sm:px-6 lg:px-8 ">
            <div className="w-full  space-y-8  rounded-lg px-5 py-5 ">
            <section className="border border-gray-200 rounded-lg px-4 py-10">
                <div className="grid grid-cols-2 gap-20  ">
                <div className="mb-6">
                    <label htmlFor="large-input" className="block mb-2 text-xl font-medium text-gray-900">Project Title</label>
                    <input type="text" id="large-input" name='title' value={data.formData.title} onChange={data.FormOnChangeHandler} className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-orange-500 focus:border-orange-500 " />
                </div>
                <div className="text-end">
                    <button type="button" onClick={data.FormSubmitHandler} className="text-white text-end bg-orange-600 hover:bg-orange-400 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Edit Project</button>
                </div>
                </div>
                <br />
                <div className="grid gap-6 md:grid-cols-1 pt-2">
                <div className="col-span-1">
                    <label htmlFor="bordered-checkbox-1" className="w-full py-4 mx-2 text-base font-medium text-gray-900">Weeks:</label>
                    <input id="default-radio-1" type="radio" onChange={data.FormOnChangeHandler} checked={data.formData.weeks=='Winter'} name="weeks" value='Winter' className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " />
                    <label htmlFor="bordered-checkbox-1" className="w-full py-4 ml-2 text-base font-medium text-gray-900">Winter</label> &nbsp;
                    <input id="default-radio-1" type="radio" onChange={data.FormOnChangeHandler} checked={data.formData.weeks=='Summer'} name="weeks" value='Summer' className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " />
                    <label htmlFor="bordered-checkbox-1" className="w-full py-4 ml-2 text-base  font-medium text-gray-900">Summer</label>
                </div>
                <div>
                </div>
                </div>
                <div className="grid gap-6 md:grid-cols-1 pt-2">
                <div className="col-span-1">
                    <label htmlFor="bordered-checkbox-1" className="w-full py-4 mx-2 text-base font-medium text-gray-900">Type:</label>
                    <input id="default-radio-1" type="radio" onChange={data.FormOnChangeHandler} name="intershipType" checked={data.formData.intershipType=='paid'} value='paid' className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " />
                    <label htmlFor="bordered-checkbox-1" className="w-full py-4 ml-2 text-base font-medium text-gray-900">Paid</label> &nbsp;
                    <input id="default-radio-1" type="radio" onChange={data.FormOnChangeHandler} name="intershipType" checked={data.formData.intershipType=='unpaid'} value='unpaid' className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " />
                    <label htmlFor="bordered-checkbox-1" className="w-full py-4 ml-2 text-base  font-medium text-gray-900">Unpaid</label>
                </div>
                <div>
                </div>
                </div>
                {data.formData.intershipType == "paid" ? <>
                <div >
                    <label htmlFor="small-input" className="block mb-2 ml-2 text-md font-medium text-gray-900">Price</label>
                    <input type="text" id="small-input" name='price' onChange={data.FormOnChangeHandler} value={data.formData.price} placeholder='Enter Price' className="block w-full ml-2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-orange-500 focus:border-orange-500 " />
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
                        {!data.subCategoryData ? null : data.subCategoryData.map((data) => {
                            return <span id="badge-dismiss-default" className="mb-2 inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-orange-600 bg-orange-100 rounded">
                            {data.name}
                            <button type="button" onClick={() => RemoveTags(data._id)} className="inline-flex items-center p-0.5 ml-2 text-sm text-orange-400 bg-transparent rounded-sm hover:bg-orange-200 hover:text-orange-900" data-dismiss-target="#badge-dismiss-default" aria-label="Remove">
                                <svg aria-hidden="true" className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                <span className="sr-only">Remove badge</span>
                            </button>
                            </span>
                        })}
                        <input type="text" id="small-input" value={data.keyword} onChange={data.UpdateKeyword} className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-orange-500 focus:border-orange-500 " required />
                        {!data.newCategoryData ? null : data.newCategoryData.map((data) => {
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
                <ReactQuill theme="snow" value={data.description} onChange={data.setDescription} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500 " placeholder="Write your project description here..."/>      
                </div>
            </section>
            </div>
        </div>
    </>
  )
}

export default EditProjectComponents;