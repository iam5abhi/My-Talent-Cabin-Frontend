import * as React from 'react';
import axios from 'axios';
import { Breathing } from 'react-shimmer'
import EducationModal from './EducationModal';
import EducationDeleteModal from './EducationDeleteModal';


const Education = ({data,ProfileSubmit}) => {

const [educationDeleteId,setEducationDeleteId]=React.useState()
const [educationOpen, setEducationOpen] = React.useState(false);
const [educationDelete, setEducationDelete] = React.useState(false);

const educationHandleOpen =()=>{
    setEducationOpen(true)
}
  
const EducationIdStore =(id)=>{
  setEducationDeleteId(id)
  setEducationDelete(true)
}


  return (
    <>
      <div className="col-span-2 text-sm font-medium text-slate-600 ">
        <div className="grid grid-cols-2 gap-4 bg-slate-100">
          <div>
            <h5 className="  p-2 font-medium leading-tight text-xl mt-0 mb-2 text-black">Education</h5>
          </div>
          <div className="p-2 text-end text-slate-600 text-sm pt-2">
            <i onClick={educationHandleOpen} className="fa-solid fa-plus border-solid  ring-2 ring-gray-200 p-2 rounded-full" />
          </div>
        </div>
        <hr />
        {!data?<Breathing width={820} height={270} />
        :data.map((data)=>{
           return(
                  <>
            <div key={data._id} className="ml-2 p-4 grid grid-cols-1 gap-2" >
              <div className="grid grid-cols-5 gap-4" >
                <div className="col-span-4 ..." >
                  <p className=" text-black text-base ">{data.degreeName}</p>
                  <p className="  font-normal text-blue-800 text-base ">{data.collegeName}</p>
                  <p className="   font-normal  text-black text-slate-600"><i className="fa-solid fa-calendar-days" />{data.startDate}
                    - {data.endDate}</p>
                </div>
                <div className=" col text-end text-slate-600 text-xs ">
                  <i onClick={()=>EducationIdStore(data._id)} className="fa-solid fa-trash-can border-solid  ring-2 ring-gray-200 p-2 rounded-full" />
                </div>
              </div>
            </div>
          </>
           )
       })
        }
      </div>
      {/* <!-- Button trigger modal --> */}
    {/* <!-- Modal --> */}
      {/* ------------------------------Education modal-------------------------- */}
    <EducationModal setOpen={setEducationOpen} open={educationOpen} ProfileSubmit={ProfileSubmit} />
    <EducationDeleteModal id={educationDeleteId} setOpen={setEducationDelete} open={educationDelete} ProfileSubmit={ProfileSubmit} />
    </>
  )
}

export default Education;
