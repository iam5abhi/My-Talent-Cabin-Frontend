import React, { useState } from 'react'
import CompanyVideos from './company_videos/CompanyVideos'
import CompanyDescriptionModal from './CompanyDescriptionModal';

const CompanyDescription = (props) => {
  const ProfileSubmit = props.ProfileSubmit
  const [Open,setOpen] = React.useState(false);
  
 
  return (
    <>
      <div className="relative flex flex-col flex-auto min-w-0 mt-4 p-4 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border mb-4 draggable" draggable="true">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 ...">
          <div className="h-full mb-4">
            <h5 className="mb-1 text-xl font-semibold">Overview</h5>
          </div>
        </div>
        <div className="...">
          <div className="text-end text-slate-600 text-xs mb-4">
            <i onClick={()=>setOpen(true)} className="fa-solid fa-pen border-solid  ring-2 ring-gray-200 p-2 rounded-full" />
          </div>
        </div>
      </div>
      <div className="grid gap-6 mb-6 md:grid-cols-2 mt-2">
        <CompanyVideos data={props.data}/>        
       <div className="">
          <p width="30" className="text-justify">{props.data?props.data.bio:null}</p>
        </div>
        <div>
        </div>
      </div>
    </div>
    <CompanyDescriptionModal open={Open} setOpen={setOpen} data={props.data} ProfileSubmit={ProfileSubmit}/>
    </>
  )
}

export default CompanyDescription
