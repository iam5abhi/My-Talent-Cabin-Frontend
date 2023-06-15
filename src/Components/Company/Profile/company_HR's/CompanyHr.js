import React,{useState,useEffect} from 'react';
import CompanyHrModal from './CompanyHrModal';
import DeleteHr from './DeleteHr';

const CompanyHr = (props) => {
  const data = props.data
  const ProfileSubmit = props.ProfileSubmit
  const [Open,setOpen] = React.useState(false);
  const [deleteOpen,setdeleteOpen] = React.useState(false);
  const [hrData,setHrData]=useState()
  const [Ids,setIds]=useState('')

  const DeleteHrHandler =(id)=>{
      setdeleteOpen(true)
      setIds(id)
  }

  useEffect(()=>{
    setHrData(data)
  },[props.data])
  return (
    <>
      <div className="container  w-11/15 mx-auto px-4  mt-4 border border-slate-300 bg-white rounded ">
      <div className="relative flex flex-col flex-auto min-w-0 mt-4 p-4 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border mb-4 draggable" draggable="true">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 ...">
            <div className="h-full mb-4">
              <h5 className="mb-1 text-xl font-semibold">Current Company</h5>
            </div>
          </div>
          <div className="...">
            <div className="text-end text-slate-600 text-lg mb-4">
              <i onClick={()=>setOpen(true)} className="fa-solid fa-plus border-solid  ring-2 ring-gray-200 p-2 rounded-full" />&nbsp;
            </div>
          </div>
        </div>
        <div className="grid gap-2 mb-6 md:grid-cols-4">
          {!hrData?null:
           hrData.map((data)=>{
            return(
              <>
            <div className="p-3 gap-4 relative bg-white rounded-xl shadow-lg flex items-center  border border-gray-300">
            <div>
              <img className=" w-24 h-24  rounded-full" src={data.image} alt />
            </div>
            <div>
              <div className="text-md font-medium text-black">{data.name}</div>
              <p className="text-slate-500 text-sm">{data.designation}</p>
            </div>
            <div className="text-slate-600 text-xs">
            <i onClick={()=>DeleteHrHandler(data._id)} className="fa-solid fa-trash-can border-solid flex absolute right-2 top-2 ring-2 ring-gray-200 p-2 rounded-full" />
            </div>
            </div>
          </>
            )
          })}
          <div>
          </div>
        </div>
      </div>
    </div>
    <CompanyHrModal open={Open} setOpen={setOpen} ProfileSubmit={ProfileSubmit}/>
    <DeleteHr open={deleteOpen} id={Ids} setOpen={setdeleteOpen} ProfileSubmit={ProfileSubmit} />
    </>
  )
}

export default CompanyHr;


