import React,{useEffect} from 'react';
import { GetRequset } from '../features/Axios';
import {authFetch} from '../features/axios/intance'

const TestAxios = () => {
    const FetchData = async ()=>{
        try {
            const resp = await authFetch.post('posts',{name:'sandeep'});
            console.log(resp,'resp')
          } catch (error) {
            console.log(error)
          }
    }

    useEffect( ()  => {
        FetchData()
    }, [])
  return (
        <>
        <h1 className='text-center text-2xl'>Axios</h1>
       
        
    </>
  )
}

export default TestAxios;