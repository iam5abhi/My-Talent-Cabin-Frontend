import * as React from 'react';
import { Breathing } from 'react-shimmer'
import ExperienceModal from '../Experience/ExperienceModal'
import ExperienceDeleteModal from '../Experience/ExperienceDeleteModal'


const Experience_Certificate = ({data,ProfileSubmit}) => {
  const [experienceDeleteId,setExperienceDeleteId]=React.useState()
  const [open, setOpen] = React.useState(false);
  const [experienceDelete, setExperienceDelete] = React.useState(false);

  const HandleOpen =()=>{
    setOpen(true)
  }

const ExperienceIdStore =(id)=>{
  setExperienceDeleteId(id)
  setExperienceDelete(true)
}

  return (
    <>
    
    <div className=" col-span-2">
      <div className="text-sm font-medium text-slate-600 ">
        <div className="grid grid-cols-2 gap-4 bg-slate-100">
          <div>
            <h5 className="  p-2 font-medium leading-tight text-xl mt-0 mb-2 text-black">Experience</h5>
          </div>
          <div className="p-2 text-end text-slate-600 text-sm pt-2">
            <i onClick={HandleOpen} className="fa-solid fa-plus border-solid  ring-2 ring-gray-200 p-2 rounded-full" />
          </div>
        </div>
        <hr />
        <div className="ml-2 p-4 grid grid-cols-1 gap-2">
          <div>
            {!data?<Breathing width={1200} height={250} />:
            data.map((data)=>{
              return(
                <>
               <div className="grid grid-cols-5 gap-4">
                 <div className="col-span-4 ...">
                  <p className=" text-black text-base ">{data.position}</p>
                  <p className="  font-normal text-blue-800 text-base ">{data.company}</p>
                  <p className="   font-normal  text-black text-slate-600"><i className="fa-solid fa-calendar-days" /> {data.startDate}
                    - {data.endDate}</p>
                </div>
                <div className=" col  text-end text-slate-600 text-xs ">
                  <i onClick={()=>ExperienceIdStore(data._id)} className="fa-solid fa-trash-can border-solid  ring-2 ring-gray-200 p-2 rounded-full" />
                </div>
               </div>
               <br />
               </>
              )
            })}
          </div>
        </div>
      </div>
    </div>
    <hr />
    <ExperienceModal setOpen={setOpen} open={open} ProfileSubmit={ProfileSubmit} />
    <ExperienceDeleteModal id={experienceDeleteId} setOpen={setExperienceDelete} open={experienceDelete} ProfileSubmit={ProfileSubmit} />
    </>
  )
}

export default Experience_Certificate;
