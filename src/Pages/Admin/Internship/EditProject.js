import React, { useState, useEffect } from 'react';
import { authFetch } from '../../../Middleware/axios/Interceptors';
import { ToastError, ToastSucess } from '../../../features/DisplayMessage';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import EditProjectComponents from '../../../Components/ComanRegisterComponents/EditProjectComponents';


const EditProject = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const [formData, setFormData] = useState({ mentorId: "", companyId: "", title: "", intershipType: "",price:'',weeks:''})
  const [categoryData, setCategoryData] = useState()
  const [newCategoryData, setNewCategoryData] = useState()
  const [subCategoryData, setSubCategoryData] = useState([])
  const [keyword, setKeyword] = useState();
  const [companyData, setCompanyData] = useState()
  const [mentorData, setMentorData] = useState()
  const [description,setDescription]= useState('')

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
      const res = await authFetch('/admin/company');
        setCompanyData(res.data.data);
      } catch (error) { ToastError(error.data.message) }
  }

  const GetCategoryData = async () => {
    try {
      const res = await authFetch('/admin/subcategory-data');
        setCategoryData(res.data.data)
      } catch (error) { ToastError(error.data.message) }
  }

  const GetMentorData = async () => {
    try {
      const resp = await authFetch('/admin/mentor');
      setMentorData(resp.data.data);
    } catch (error) { ToastError(error) }
  }

  const FormSubmitHandler = async () => {
    try {
      const res = await authFetch.patch(`/admin/intership/${id}`, {mentorId:formData.mentorId,CompanyId:formData.companyId, title:formData.title,
        description:description, intershipWeek:formData.weeks, intershipType:formData.intershipType,
        price:formData.price, tags:subCategoryData
      });
      ToastSucess("Edit Successfully")
      setTimeout(() => {
        navigate('/auth/admin/internship')
      }, 1000)
      } catch (error) { ToastError(error.data.message) }
  }

  const GetInternshipData = async () => {
      try {
      const resp = await authFetch(`/admin/intership/${id}`);
        setFormData({companyId:resp.data.CompanyId._id, title:resp.data.title, intershipType:resp.data.intershipType,price:resp.data.price,weeks:resp.data.intershipWeek,mentorId:resp.data.mentorId._id,})
        setDescription(resp.data.description)
        let data = resp.data.tags.map(data=>{ return {id:data._id._id,name:data._id.name}} )
        setSubCategoryData(data)          
      } catch (error) { ToastError(error.data.message) }
  }

  useEffect(() => {
    GetInternshipData()
    GetCategoryData()
    GetCompanyData()
    GetMentorData()
  }, [])
  return (
    <>
      <EditProjectComponents TdClick={TdClick} RemoveTags={RemoveTags} data={{FormOnChangeHandler,FormSubmitHandler,formData,subCategoryData,keyword,UpdateKeyword,newCategoryData,companyData,mentorData,description,setDescription}}/>
      <ToastContainer />
    </>
  )
}

export default EditProject;