import React from 'react'
import DataTable from 'react-data-table-component';
import { customStyles } from '../../features/DataTable';
import { useNavigate } from 'react-router-dom';

const ProjectComponents = ({data}) => {
    const navigate = useNavigate()
    const AddProjectComponent=()=>{
        return(
          <div className='flex justify-between mt-3 -mb-7'>
          <h1 className='font-semibold'>Internships</h1>
          <div className='grid grid-cols-2 gap-4'>
            <div>
            <input type='text' onChange={(e)=>data.setSearchText(e.target.value)} 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-orange-500 focus:border-orange-500 block w-full p-3" placeholder='Search' />  &nbsp;
              </div>
              <div>
              <button type="button" onClick={()=>navigate(data.path)} className="text-white text-lg bg-orange-600 hover:bg-orange-400 focus:ring-4 focus:ring-orange-300 rounded-full px-4 py-2">
                <i class="fa-solid fa-plus"></i> Add Internship</button>
              </div>
          </div>
      </div>
        )
      }
  return (
        <>
        <div className="max-w-screen mx-auto mt-10">
        <div className="container px-4 mx-auto">
        <div>
        <div className="flex justify-between items-center px-1 bg-white">
            </div>
            <hr />
            <div className="inline-block min-w-full px-10 pb-10 shadow-md rounded-lg overflow-hidden">
                <DataTable
                columns={data.columns}
                title={AddProjectComponent()}
                data={!data.categoryData?[]:data.categoryData.filter((item) => {
                    if (data.searchText === "") { return item;}
                    else if (item.title.toLowerCase().includes(data.searchText.toLowerCase())){return item;}
                })}
                customStyles={data.customStyles} 
                />
            </div>
        </div>
        </div>
        </div>   
    </>
  )
}

export default ProjectComponents