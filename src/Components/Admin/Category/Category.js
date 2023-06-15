import React,{useState,useEffect} from 'react';
import DataTable from 'react-data-table-component';
import { customStyles } from '../../../features/DataTable'
import AddCategory from './AddCategory';
import StatusCategory from './StatusCategory';
import EditCategory from './EditCategory';
import AddSubCategory from './AddSubCategory';
import StatusSubCategory from './StatusSubCategory';
import EditSubCategory from './EditSubCategory';
import { authFetch } from '../../../Middleware/axios/Interceptors';
import { ToastError } from '../../../features/DisplayMessage';
import { ToastContainer } from 'react-toastify';
import AdminHeader from '../../../Layouts/Header/AdminHeader';



const Category = () => {
  const [categoryData,setCategoryData]=useState()
  const [subCategoryAllData,setSubCategoryAllData]=useState()
  const [subCategoryData,setSubCategoryData]=useState()
  const [addCategoryOpen,setAddCategoryOpen]=useState(false)
  const [statusOpen, setStatusOpen]=useState(false)
  const [editCategoryOpen, setEditCategoryOpen]=useState(false)
  const [editSubCategoryOpen, setEditSubCategoryOpen]=useState(false)
  const [StatusSubCategoryOpen, setStatusSubCategoryOpen]=useState(false)
  const [addSubCategoryOpen, setAddSubCategoryOpen]=useState(false)
  const [pending, setPending] = useState(true);
  const [ids,setIds]=useState()
  const [categoryId,setCategoryId]=useState()

  
  const ExpandableComponent = ({ data }) =>{
    setCategoryId(data._id)
    return(
    <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50"  style={{"border":"1px solid gray"}}>
            <tr>
              <th scope="col" class="px-6 py-3" >
                    Sr
                </th>
                <th scope="col" class="px-6 py-3" >
                    SubCategory name
                </th>
                <th scope="col" class="px-6 py-3">
                    status
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
          {!subCategoryAllData?null:subCategoryAllData.map((subcategorydata,index)=>{
            if(data._id.toString()==subcategorydata.categoryId.toString()){
              return <tr class="bg-white border-b">
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {index+1}
                </td>
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {subcategorydata.name}
                </td>
                <td class="px-6 py-4">
                    {subcategorydata.status === 'enable' ? <span className='bg-green-100 p-2 px-4 rounded-full text-green-600'>{subcategorydata.status}</span>:<span className='bg-red-100 p-2 px-4 rounded-full text-red-600'>{subcategorydata.status}</span>}
                </td>
                <td class="px-6 py-4">
                <button type="button" data-tooltip-sub="Edit SubCategory" onClick={()=>SubCategoryEditHandler(subcategorydata._id)} >
                    <i className="fa fa-pen-to-square text-xs bg-orange-500 px-1 py-1 rounded-full text-white"></i></button>
                    &nbsp; <button type="button" data-tooltip-sub="Change SubCategory Status" onClick={()=>SubCategoryStatusHandler(subcategorydata._id)} >
                    <i className="fa-solid fa-trash text-xs bg-orange-500 px-1 py-1 rounded-full text-white"></i></button>
                </td>
              </tr>
            }
          })}
        </tbody>
    </table>
  </div> )}
 
  const columns = [
    { name: 'Sr.', selector: (row,index) => index+1,},
    { name: 'Category', selector: row => row.title,},
    { name: 'Status', selector: row => row.status === 'active' ? <span className='bg-green-100 p-2 px-4 rounded-full text-green-600'>Activate</span>:<span className='bg-red-100 p-2 px-4 rounded-full text-red-600'>Deactivate</span>,},
    { name: 'Action', selector: row =><div>
    <button type="button" data-tooltip="Add Sub-Category" onClick={()=>SubCategoryAddHandler(row._id)} className="px-2 py-1 rounded-full focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-text-orange-600 font-medium mr-2 mb-2 text-sm">
    <i className="fa-sharp fa-solid fa-circle-plus"></i></button>
    <button type="button" data-tooltip="Edit Category" onClick={()=>CategoryEditHandler(row._id)} className="px-2 py-1 rounded-full focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-text-orange-600 font-medium mr-2 mb-2 text-sm">
    <i className="fa-solid fa-pen-to-square "></i></button>
    <button type="button" data-tooltip="Change Category Status" onClick={()=>CategoryStatusHandler(row._id)} className="px-2 py-1 rounded-full focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-text-orange-600 font-medium mr-2 mb-2 text-sm">
    <i className="fa-solid fa-check"></i></button>
    </div>, width:"10rem"},
  ];

  const CategoryEditHandler=(id)=>{
    setIds(id)
    setEditCategoryOpen(true)
  }

  const SubCategoryAddHandler=(id)=>{
    setIds(id)
    setAddSubCategoryOpen(true)
    let filterData = categoryData.filter(data => data._id === id)
    setSubCategoryData(filterData[0])
  }

  const SubCategoryEditHandler=(id)=>{
    setIds(id)
    setEditSubCategoryOpen(true)
  }

  const SubCategoryStatusHandler=(id)=>{
    setIds(id)
    setStatusSubCategoryOpen(true)
  }
  
  const CategoryStatusHandler=(id)=>{
    setIds(id)
    setStatusOpen(true)
  }

  const titleFuntion=()=>{
    return(
        <div className='flex justify-between '>
            <h1 className='font-semibold'>Category</h1>
            <button type="button" onClick={()=>setAddCategoryOpen(true)} className="text-white text-sm bg-orange-600 hover:bg-orange-400 focus:ring-4 focus:ring-orange-300 rounded-full px-4 py-1.5">
              <i class="fa-solid fa-plus"></i> Add Category</button>
        </div>
    )
  }

  const GetCategoryData = async ()=>{
    try {
      const res = await authFetch('/admin/category');
      setCategoryData(res.data.data)
      setPending(false) 
    } catch (error) { ToastError(error.message) }
  }

  const GetSubCategoryData = async ()=>{
    if(categoryId){
    try {
      const res = await authFetch(`/admin/subcategory?id=${categoryId}`);
      setSubCategoryAllData(res.data)
    } catch (error) { ToastError(error.message) }
    }
  }

  useEffect(() => {
    GetCategoryData()
  },[])
  
  useEffect(() => {
    GetSubCategoryData()
  },[categoryId])

  return (
        <>
          <div className="max-w-screen mx-auto mt-10 overflow-auto">
            <div className="container px-4 mx-auto">
            <div>
            <div className="flex justify-between items-center px-1 bg-white">
                </div>
                <hr />
                <div className="inline-block min-w-full px-10 shadow-md rounded-lg overflow-auto">
                  <DataTable
                    columns={columns}
                    title={titleFuntion()}
                    data={categoryData}
                    customStyles={customStyles}
                    progressPending={pending}
                    responsive={true}
                    pagination 
                    expandableRows
                    expandableRowsComponent={ExpandableComponent}
                  />
                </div>
            </div>
            </div>
          </div>  
          <ToastContainer />
          <AddCategory open={addCategoryOpen} setOpen={setAddCategoryOpen} GetCategoryData={GetCategoryData}/>
          <AddSubCategory open={addSubCategoryOpen} setOpen={setAddSubCategoryOpen} id={ids} subCategoryData={subCategoryData} GetCategoryData={GetSubCategoryData}/> 
          {editCategoryOpen ===true?<EditCategory open={editCategoryOpen} setOpen={setEditCategoryOpen} id={ids} GetCategoryData={GetCategoryData}/> :null}
          {editSubCategoryOpen ===true?<EditSubCategory open={editSubCategoryOpen} setOpen={setEditSubCategoryOpen} id={ids} GetSubCategoryData={GetSubCategoryData}/> :null}
          <StatusCategory open={statusOpen} setOpen={setStatusOpen} id={ids} GetCategoryData={GetCategoryData} />
          <StatusSubCategory open={StatusSubCategoryOpen} setOpen={setStatusSubCategoryOpen} id={ids} GetSubCategoryData={GetSubCategoryData} />
    </>
  ) 
}

export default Category;