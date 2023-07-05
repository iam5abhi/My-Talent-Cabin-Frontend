import * as React from 'react';
import { Breathing } from 'react-shimmer';
import Username_imageModal from './Username_imageModal';
import { createImageFromInitials, getRandomColor } from '../../../../features/ImageGenerate';

const Username_image = ({data,ProfileSubmit}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      <div className="container w-11/15 mx-auto border border-slate-300 bg-white rounded ">
        <div className="relative flex flex-col flex-auto min-w-0 mt-4  overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border mb-4 draggable" draggable="true">
          <div className="flex flex-wrap mt-5">
            <div className="flex-none w-auto max-w-full px-3">
              <div  onClick={handleOpen} className="relative">
              <img className="w-32 h-32 rounded-full" src={!data?"loading...": createImageFromInitials(500, data.name, getRandomColor())
                        } fallback={<Breathing  />}/>
                <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full" />
                <div className="relative">
                  <i className="fa-solid fa-pencil text-slate-600 text-md bottom-24 left-24 absolute p-2 w-10 h-10 bg-slate-100 border-4 border-slate-100 dark:border-gray-800 rounded-full" />
                </div>
            </div>
            </div>
            <div className="flex-none w-auto max-w-full px-3 my-auto">
              <div className="h-full">
                <h5 className="mb-1 text-2xl font-semibold">{data?data.name:"Sandeep Sharma"}</h5>
                <p className="mb-0 leading-normal text-slate-600 text-size-sm"><i className="fa-solid fa-location-dot" />{data?data.location:''}</p>
              </div>
              </div>
            </div>
          </div>
      </div>
      <Username_imageModal setOpen={setOpen} open={open} ProfileSubmit={ProfileSubmit}/>
    </>
  )
}

export default Username_image;
