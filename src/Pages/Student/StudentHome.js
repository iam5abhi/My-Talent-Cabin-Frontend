import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router';
import { authFetch } from '../../Middleware/axios/intance';

const StudentHome = () => {
  const navigate = useNavigate()
  const [projects,setProjects]=useState([])
  const [message,setMessage]=useState({message:'',type:''})

  const GetProjects = async ()=>{
    try {
      const resp = await authFetch.get(`/api/student/get-project`);
      setProjects(resp.data.data)
    } catch (error) {
      setMessage({message:error,type:false})
    }
  }

  useEffect(() => {
      GetProjects()
  },[])

  return (
       <>
       Student Home
       </>
  )
}

export default StudentHome;