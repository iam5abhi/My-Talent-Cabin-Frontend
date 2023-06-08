import React,{useState,useEffect} from 'react';
import DataTable from 'react-data-table-component';
import { customStyles } from '../../features/DataTable';
import { authFetch } from '../../Middleware/axios/intance';
import { useNavigate } from 'react-router-dom';


const AllProjects = () => {
  const navigate = useNavigate()
  const [searchText, setSearchText] = React.useState("");
  const [categoryData,setCategoryData]=useState()


  const columns = [
    { name: 'Sr.', selector: (row,index) => index+1, width:"4rem"},
    { name: 'Project Name', selector: row => row.title, width:"21rem"},
    { name: 'Company Name', selector: row => row.userId.name, width:"13rem"},
    { name: 'Posted', selector: row => row.userId.role, width:"10rem"}, 
    { name: 'Intership Type', selector: row => row.intershipType,width:"15rem"},
    { name: 'No. of Opening', selector: row => row.number_of_opening,},
  ];

  const titleFuntion=()=>{
    return(
      <div className='flex justify-between '>
        <h1 className='font-semibold'>All Projects</h1>
        <div className='flex'>
          <input type='text' onChange={(e)=>setSearchText(e.target.value)} 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder='Search' />  &nbsp;
        </div>
      </div>
    )
  }

  const GetCategoryData = async ()=>{
    try {
      const resp = await authFetch.get('/api/admin/internship');
      setCategoryData(resp.data.data)
      console.log(resp.data.data,"datatatat")
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    GetCategoryData()
  },[])
  
  return (
        <>   
          {/* --------------All project----------------- */}
          <div className="max-w-screen mx-auto mt-10">
            <div className="container px-4 mx-auto">
            <div>
            <div className="flex justify-between items-center px-1 bg-white dark:bg-gray-800">
                </div>
                <hr />
                <div className="inline-block min-w-full px-10 shadow-md rounded-lg overflow-hidden">
                  <DataTable
                    columns={columns}
                    title={titleFuntion()}
                    data={!categoryData?[]:categoryData.filter((item) => {
                      if (searchText === "") { return item;} 
                      // else if (item.status.toLowerCase().includes(searchText.toLowerCase())){return item;}
                      // else if (item.phoneNumber.toString().includes(searchText)){return item;}
                      else if (item.title.toLowerCase().includes(searchText.toLowerCase())){return item;}
                      // else if (item.email.toLowerCase().includes(searchText.toLowerCase())){return item;}  
                    })}
                    customStyles={customStyles}
                    pagination 
                  />
                </div>
            </div>
            </div>
          </div>
    </>
  )
}

export default AllProjects