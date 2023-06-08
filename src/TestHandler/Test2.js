import React, { useState,useEffect,useRef } from 'react'

const datas = ['game','home','work','alexa']
// const data = [{name:'game',added:false}]
const Test2 = () => {
    const [newData,setnewData]=useState([])


    const SkillsHandler =(e)=>{
        if(e.target.checked){
            setnewData([...newData,{
                id:e.target.value,name:e.target.value
            }])
        }else{
            let remove = newData.filter((id) => id.id !== e.target.value)
            setnewData(remove)
        }
    }

    const RemoveSkills =(ids)=>{
        let remove = newData.filter((id) => id.id !== ids)
        setnewData(remove)      
    }

  return (
        <>
        <div className=" px-2  py-4 lg:py-8  max-w-screen-lg mx-auto">
            <div className="border border-gray-200 rounded-lg px-4 py-10">
                <div className="flex items-center space-x-4 pt-4">
                <div className="relative">
                    <img className="w-10 h-10 rounded" src="assets/img/man.png" alt />
                    <span className="absolute top-0 left-9 transform -translate-y-1/2   dark:border-gray-800 rounded-full">
                    <i className="fa-solid fa-pen text-orange-500" />                  </span>
                </div>
                <div className="font-medium dark:text-white">
                    <div>
                    <p className="title text-sm lg:text-xl  font-bold">
                        John Doe
                    </p>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Joined in August </div>
                </div>
                </div>
            </div>
            <br />
            <div className="grid  grid-flow-col gap-4">
                <div className="col-span-2 ...">
                <div className="border border-gray-200 rounded-lg px-4 py-10">
                    <input id="default-radio-1" type="radio" defaultValue name="default-radio" className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Industry Mentor</label>      </div>
                </div>
                <div className="row-span-2 col-span-2 ...">
                <div className="border border-gray-200 rounded-lg px-4 py-10">
                    <input id="default-radio-1" type="radio" defaultValue name="default-radio" className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Faculty Mentor</label>          </div>
                </div>
            </div>
            <form className=" space-y-2">
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                <div>
                    <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Organisation Name</label>
                    <input type="text" name="text" id="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-blue-500" placeholder required />
                </div>
                <br />
                <div>
                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Designation</label>
                    <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Choose a designation</option>
                    <option value>1</option>
                    <option value>2</option>
                    <option value>3</option>
                    </select>
                </div>
                </div>
            </form>
            <br />
            <div clas="w-3/5">
                <div className="pt-2">
                <div className="space-x-4 border border-gray-200 rounded-lg px-4 py-10 ">
                    <label htmlFor="bordered-checkbox-1" className="w-full py-4 mx-2 text-base font-medium text-gray-900 dark:text-gray-300">Area Of Mentoring</label>
                    <input id="default-checkbox" type="checkbox" defaultValue className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="bordered-checkbox-1" className="w-full py-4 ml-2 text-base font-medium text-gray-900 dark:text-gray-300">Marketing</label>
                    <input id="default-checkbox" type="checkbox" defaultValue className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="bordered-checkbox-1" className="w-full py-4 ml-2 text-base  font-medium text-gray-900 dark:text-gray-300">Finance</label>
                    <input id="default-checkbox" type="checkbox" defaultValue className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="bordered-checkbox-1" className="w-full py-4 ml-2 text-base  font-medium text-gray-900 dark:text-gray-300">Marketing</label>
                </div>
                <div>
                    <br />            
                    <div>
                    Choose Tags
                    </div>    
                    <br />
                    {newData.map((data)=>{
                        return <span id="badge-dismiss-default" className="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-orange-600 bg-orange-100 rounded dark:bg-orange-900 dark:text-orange-300">
                        {data.name}
                        <button type="button" onClick={()=>RemoveSkills(data.id)} className="inline-flex items-center p-0.5 ml-2 text-sm text-orange-400 bg-transparent rounded-sm hover:bg-orange-200 hover:text-orange-900 dark:hover:bg-orange-800 dark:hover:text-orange-300" data-dismiss-target="#badge-dismiss-default" aria-label="Remove">
                            <svg aria-hidden="true" className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                            <span className="sr-only">Remove badge</span>
                        </button>
                        </span>
                    })}
                    <br />
                    <br />
                    <div id="accordion-collapse" data-accordion="collapse">
                    <h2 id="accordion-collapse-heading-1">
                        <button type="button" className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
                        <span>Marketing</span>
                        <svg data-accordion-icon className="w-6 h-6 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        </button>
                    </h2>
                    <div id="accordion-collapse-body-1" className="hidden" aria-labelledby="accordion-collapse-heading-1">
                        <div className="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                            {datas.map((data)=>{
                                return(
                                    <>
                                    <div key={data} className="flex items-center mb-4">
                                     <input value={data} onChange={(e)=>SkillsHandler(e)} type="checkbox" className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                     <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{data}</label>
                                    </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                    <h2 id="accordion-collapse-heading-2">
                        <button type="button" className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-2" aria-expanded="false" aria-controls="accordion-collapse-body-2">
                        <span>Finance</span>
                        <svg data-accordion-icon className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        </button>
                    </h2>
                    <div id="accordion-collapse-body-2" className="hidden" aria-labelledby="accordion-collapse-heading-2">
                        <div className="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700">
                        <div className="flex items-center mb-4">
                            <input id="default-checkbox" type="checkbox" defaultValue className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default checkbox</label>
                        </div>
                        <div className="flex items-center">
                            <input defaultChecked id="checked-checkbox" type="checkbox" defaultValue className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="checked-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Checked state</label>
                        </div>
                        </div>
                    </div>
                    <h2 id="accordion-collapse-heading-3">
                        <button type="button" className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-3" aria-expanded="false" aria-controls="accordion-collapse-body-3">
                        <span>IT</span>
                        <svg data-accordion-icon className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        </button>
                    </h2>
                    <div id="accordion-collapse-body-3" className="hidden" aria-labelledby="accordion-collapse-heading-3">
                        <div className="p-5 font-light border border-t-0 border-gray-200 dark:border-gray-700">
                        <div className="flex items-center mb-4">
                            <input id="default-checkbox" type="checkbox" defaultValue className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default checkbox</label>
                        </div>
                        <div className="flex items-center">
                            <input defaultChecked id="checked-checkbox" type="checkbox" defaultValue className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="checked-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Checked state</label>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="text-center mt-2 ">
                    <button type="button" className="text-white text-end bg-orange-600 hover:bg-orange-400
                    focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-xs lg:text-sm  px-2 py-2 lg:px-5 lg:py-2.5 mr-2 
                    mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none 
                    dark:focus:ring-orange-800">Save</button>
                    </div>
                </div>
                <div>
                </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default Test2