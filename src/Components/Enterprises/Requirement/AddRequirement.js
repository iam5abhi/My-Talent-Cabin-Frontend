import React, { useState } from 'react';
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { authFetch } from "../../../Middleware/axios/intance"
import Message from '../../../features/Message';


export default function AddRequirement({ setOpen, open, GetNoticeData }) {
  const cancelButtonRef = useRef(null)
  const [message, setMessage] = useState({ message: '', type: '' })
  const [notice, setNotice] = useState({ title: '', description: "" ,MSMEID:"",minexp:'', maxexp:'', 
  minsalary:'', maxSalary:'',vancancy:'', location:''})
  const [subCategory, setSubcategory] = useState([])
  const [newCategoryData,setNewCategoryData]=useState()
  const [subCategoryData,setSubCategoryData]=useState([])
  const [keyword, setKeyword] = useState();


  const UpdateKeyword = (e) => {
    const filtered = subCategory.filter((data) => {
          return data.name.toLowerCase().includes(e.target.value.toLowerCase());
        });
      setKeyword(e.target.value)
      setNewCategoryData(filtered);
  }

  const TdClick=(id)=>{
    const Addfiltered = subCategory.filter((data) => {
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

  const NoticeHandler = (event) => {
    setNotice((pre) => ({
      ...pre,
      [event.target.name]: event.target.value
    }))
  }

  const SubmitQuesHandler = async (event) => {
    event.preventDefault();
    try {
      const resp = await authFetch.post('/api/enterpricess/notice-board', { title:notice.title,description:notice.description,
      tags:subCategoryData,MSMEID:notice.MSMEID, minexp:notice.minexp, maxexp:notice.maxexp, minsalary:notice.minsalary, 
      maxSalary:notice.maxSalary,vancancy:notice.vancancy, location:notice.location});
      setMessage({ message: resp.data.message, type: true })
      setTimeout(() => {
        setOpen(false)
        GetNoticeData()
        setMessage({ message: '', type: '' })
      }, 1000);
    } catch (error) {
      console.log(error)
    }
  }

  const GetSubcategoryData = async () => {
    try {
      const resp = await authFetch('/api/enterpricess/subcategory');
      setSubcategory(resp.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    GetSubcategoryData()
  }, [])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full md:max-w-xl">
                <div className="max-w-screen mx-auto">
                  <div className="container mx-auto">
                    <div className="col-span-2">
                      <div className=" border-b border-gray-200 rounded">
                        <div className="text-end p-2">
                          <i onClick={() => setOpen(false)} className="fa-solid fa-xmark text-xs font-extrabold bg-gray-400 h-5 leading-5 w-5 z-50 rounded-full text-center text-white"></i>
                        </div>
                        <Dialog.Title as="h2" className=" text-xl text-center font-semibold">
                          Add Requirement
                        </Dialog.Title>
                        <div className="overflow-auto">
                          <div className=" max-w-screen-lg mx-auto">
                            <form onSubmit={SubmitQuesHandler} className="px-4 py-6">
                              <ul className="w-full text-sm font-medium text-gray-900bg-white ">
                                <li className="w-full rounded-t-lg mb-2">
                                  <div className="items-center px-3">
                                    <label htmlFor="first_name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Title <span class="text-red-600">*</span></label>
                                      <input type="text" id="default-input" name='title' onChange={NoticeHandler} placeholder="Enter Title" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg font-normal rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-1.5" required />
                                  </div>
                                </li>
                                <li className="w-full rounded-t-lg mb-2">
                                  <div className="items-center px-3">
                                    <label htmlFor="first_name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Minimum Exprience <span class="text-red-600">*</span></label>
                                      <input type="Number" id="default-input" name='minexp' onChange={NoticeHandler} placeholder="Enter Minimum Exprience" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg font-normal rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-1.5" required />
                                  </div>
                                </li>
                                <li className="w-full rounded-t-lg mb-2">
                                  <div className="items-center px-3">
                                    <label htmlFor="first_name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Maximum Exprience <span class="text-red-600">*</span></label>
                                      <input type="Number" id="default-input" name='maxexp' onChange={NoticeHandler} placeholder="Enter Maximum Exprience" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg font-normal rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-1.5" required />
                                  </div>
                                </li>
                                <li className="w-full rounded-t-lg mb-2">
                                  <div className="items-center px-3">
                                    <label htmlFor="first_name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Minimum Salary <span class="text-red-600">*</span></label>
                                      <input type="text" id="default-input" name='minsalary' onChange={NoticeHandler} placeholder="Enter Minimum Salary" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg font-normal rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-1.5" required />
                                  </div>
                                </li>
                                <li className="w-full rounded-t-lg mb-2">
                                  <div className="items-center px-3">
                                    <label htmlFor="first_name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Maximum Salary <span class="text-red-600">*</span></label>
                                      <input type="text" id="default-input" name='maxSalary' onChange={NoticeHandler} placeholder="Enter Maximum Salary" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg font-normal rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-1.5" required />
                                  </div>
                                </li>
                                <li className="w-full rounded-t-lg mb-2">
                                  <div className="items-center px-3">
                                    <label htmlFor="first_name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Number Of Vancancy <span class="text-red-600">*</span></label>
                                      <input type="Number" id="default-input" name='vancancy' onChange={NoticeHandler} placeholder="Enter Number Of Vancancy" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg font-normal rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-1.5" required />
                                  </div>
                                </li>
                                <li className="w-full rounded-t-lg mb-2">
                                  <div className="items-center px-3">
                                    <label htmlFor="first_name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Location <span class="text-red-600">*</span></label>
                                      <input type="text" id="default-input" name='location' onChange={NoticeHandler} placeholder="Enter Location" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg font-normal rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-1.5" required />
                                  </div>
                                </li>
                                <li className="w-full rounded-t-lg mb-2">
                                  <div className="items-center px-3">
                                    <label htmlFor="first_name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Description <span class="text-red-600">*</span></label>
                                      <textarea type="text" id="default-input" name='description' onChange={NoticeHandler} placeholder="Enter Description" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg font-normal rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-1.5" required />
                                    </div>
                                </li>
                                <li className="w-full rounded-t-lg mb-2">
                                  <div className="items-center px-3 ">
                                <div className={subCategoryData.length>0?'mb-2':''}>
                                  Choose Tags <span class="text-red-600">*</span>
                                </div>
                                {!subCategoryData ? null : subCategoryData.map((data) => {
                                  return <span id="badge-dismiss-default" className="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-orange-600 bg-orange-100 rounded">
                                    {data.name}
                                    <button type="button" onClick={() => RemoveTags(data._id)} className="inline-flex items-center p-0.5 ml-2 text-sm text-orange-400 bg-transparent rounded-sm hover:bg-orange-200 hover:text-orange-900" data-dismiss-target="#badge-dismiss-default" aria-label="Remove">
                                      <svg aria-hidden="true" className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                      <span className="sr-only">Remove badge</span>
                                    </button>
                                  </span>
                                })}
                                  <div>
                                    <div className="rounded my-2 relative pin-t pin-l">
                                      <ul className="list-reset">
                                        <input type="text" value={keyword} onChange={UpdateKeyword} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg font-normal rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-1.5" placeholder='Chooose Tags' />
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
                              </li>
                              </ul>
                              <div className=" w-full text-center pt-6">
                                <button type="submit" className="text-white text-end bg-orange-600 hover:bg-orange-400 focus:ring-4 focus:ring-orange-300 
                            font-semibold rounded-full text-lg px-20 py-2.5 mr-2 focus:outline-none">Submit</button>
                              </div>
                            </form>
                          </div>
                          {message.type !== '' ? message.type === false ?
                            <Message message={message.message} css='flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-gray-800' />
                            :
                            <Message message={message.message} css='flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-gray-800' />
                            : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
