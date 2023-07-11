import React, { useState, useEffect } from 'react';
import { authFetch } from '../../../Middleware/axios/Interceptors';
import { ToastError, ToastSucess } from '../../../features/DisplayMessage';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import EditProjectComponents from '../../../Components/ComanRegisterComponents/EditProjectComponents';


const EditInternship = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const [formData, setFormData] = useState({ mentorId: "", companyId: "", title: "", intershipType: "",price:'',weeks:''})
  const [categoryData, setCategoryData] = useState()
  const [newCategoryData, setNewCategoryData] = useState()
  const [subCategoryData, setSubCategoryData] = useState([])
  const [keyword, setKeyword] = useState();
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

  const GetCategoryData = async () => {
    try {
      const res = await authFetch('/mentor/skill');
        setCategoryData(res.data)
      } catch (error) { ToastError(error.data.message) }
  }

  const FormSubmitHandler = async () => {
    try {
      const res = await authFetch.patch(`/mentor/intership/${id}`, { title:formData.title, description:description, 
        intershipWeek:formData.weeks, intershipType:formData.intershipType, price:formData.price, tags:subCategoryData
      });
      ToastSucess("Edit Successfully")
      setTimeout(() => {
        navigate('/auth/mentor/internship')
      }, 1000)
      } catch (error) { ToastError(error.data.message) }
  }

  const GetInternshipData = async () => {
      try {
      const resp = await authFetch(`/mentor/intership/${id}`);
        setFormData({title:resp.data.title, intershipType:resp.data.intershipType,price:resp.data.price,weeks:resp.data.intershipWeek})
        setDescription(resp.data.description)
        let data = resp.data.tags.map(data=>{ return {id:data._id._id,name:data._id.name}} )
        console.log(data,"data")
        setSubCategoryData(data)          
      } catch (error) { ToastError(error.data.message) }
  }

  useEffect(() => {
    GetInternshipData()
    GetCategoryData()
  }, [])
  return (
    <>
      <EditProjectComponents RemoveTags={RemoveTags} TdClick={TdClick} data={{FormOnChangeHandler,FormSubmitHandler,formData,subCategoryData,keyword,UpdateKeyword,newCategoryData,description,setDescription}}/>
      <ToastContainer />
    </>
  )
}

export default EditInternship;