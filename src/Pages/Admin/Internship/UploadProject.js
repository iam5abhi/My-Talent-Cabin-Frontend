import React, { useState, useEffect } from 'react';
import { ToastError, ToastSucess } from '../../../features/DisplayMessage';
import { useNavigate } from 'react-router-dom';
import { authFetch } from '../../../Middleware/axios/Interceptors';
import UploadProjectComponents from '../../../Components/ComanRegisterComponents/UploadProjectComponents';


const UploadProject = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ companyId: "", mentorId: "", title: "", intershipType: "", price:'', weeks:'', endDate:'', startDate:'',number_of_opening: "", meetingLink: ""})
  const [categoryData, setCategoryData] = useState()
  const [newCategoryData, setNewCategoryData] = useState()
  const [subCategoryData, setSubCategoryData] = useState([])
  const [keyword, setKeyword] = useState();
  const [companyData, setCompanyData] = useState()
  const [mentorData, setMentorData] = useState()
  const [description,setDescription]= useState('') 

  console.log(description,"description")
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
      const resp = await authFetch('/admin/company');
      setCompanyData(resp.data.data);
    } catch (error) { ToastError(error) }
  }

  const GetCategoryData = async () => {
      try {
        const resp = await authFetch('/admin/subcategory-data');
        setCategoryData(resp.data.data);
      } catch (error) { ToastError(error) }
  }

  const GetMentorData = async () => {
    try {
      const resp = await authFetch('/admin/mentor');
      setMentorData(resp.data.data);
    } catch (error) { ToastError(error) }
  }

  const FormSubmitHandler = async () => {
    try {
      const resp = await authFetch.post('/admin/intership', {mentorId:formData.mentorId, CompanyId:formData.companyId, title:formData.title,
        description:description, intershipWeek:formData.weeks, intershipType:formData.intershipType,
        price:formData.price, tags:subCategoryData,number_of_opening:formData.number_of_opening, meetingLink:formData.meetingLink,
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
    GetMentorData()
  }, [])
  return (
    <>
     <UploadProjectComponents TdClick={TdClick} RemoveTags={RemoveTags} data={{FormOnChangeHandler,FormSubmitHandler,formData,subCategoryData,keyword,UpdateKeyword,newCategoryData,companyData,mentorData,description,setDescription}} />
    </>
  )
}

export default UploadProject;