import * as React from 'react';
import { Breathing } from 'react-shimmer' 
import BioModal from './BioModal';

const Bio = ({data,ProfileSubmit}) => {
    const [open, setOpen] = React.useState(false)

    const openhandler =()=>{
      setOpen(true)
    }

  return (
    <>
      <div className=" col-span-2 text-sm font-medium text-slate-600 ">
      <div className="grid grid-cols-2 gap-4 bg-slate-100">
          <div>
            <h5 className="  p-2 font-medium leading-tight text-xl mt-0 mb-2 text-black">Bio</h5>
          </div>
          <div className="p-2 text-end text-slate-600 text-sm pt-2">
          {data?<i onClick={openhandler} className="fas fa-pencil ring-2 text-white ring-gray-200 p-2 rounded-full bg-green-600" />
          :<i onClick={openhandler} className="fa-solid fa-plus border-dashed text-white ring-2 ring-gray-200 p-2 rounded-full bg-red-600" />}
          </div>
        </div>
        <hr />
        <div className="ml-2 p-4">
          <div className="col-span-2">
            <p className=" font-normal text-base text-black" >{data?data:<Breathing width={780} height={250} />}
            </p>
          </div>
          <div className=" col  text-end text-slate-600 text-xs ">
            
          </div>
        </div>
      </div>
    <BioModal setOpen={setOpen} open={open} data={data} ProfileSubmit={ProfileSubmit} />
    </>
  )
}

export default Bio;
