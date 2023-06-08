import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MentorHome = () => {
  const navigate = useNavigate()

  useEffect(()=>{
    navigate('/auth/mentor/request')
  },[])
  return (
        <>
        <div>MentorHome</div>
    </>
  )
}

export default MentorHome;