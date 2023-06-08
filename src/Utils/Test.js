import React, { useState } from 'react';
import { States,Citys } from './IndianState';

const Test = () => {
    const [citys,setCitys]=useState()

    const Cityhandler =(e)=>{
        setCitys(Citys[e.target.value].split(','))
    } 

  return (
        <>
        <div className='text-center mt-10'>
            <select className="form-control" onChange={Cityhandler}>
                <option >Select State</option>
                {States.map((state,index)=>{
                    return <option value={index+1}>{state}</option>
                })}
            </select>
            <select className="form-control" >
                <option>Select City</option>
                {!citys?null:citys.map((city)=>{
                    return <option>{city}</option>
                })} 
            </select>  
        </div>
    </>
  )
}

export default Test;