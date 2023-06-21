import * as React from 'react';
import { Breathing } from 'react-shimmer'
import LanguageDeleteModal from '../Language/LanguageDeleteModal'
import LanguageModal from './LanguageModal';


const Language = ({data,ProfileSubmit }) => {
    const [languId, setLanguId] = React.useState();
    const [open, setOpen] = React.useState(false);
    const [languageDelete, setLanguageDelete] = React.useState(false);

    const LanguageIdStore =(value)=>{
      setLanguId(value)
      setLanguageDelete(true)
    }

    const HandleOpen =()=>{
      setOpen(true)
    }
    
  return (
    <>
      <div className=" col text-sm font-medium text-slate-600">
      <div className="grid grid-cols-2 gap-4 bg-slate-100">
          <div>
            <h5 className=" p-2 font-medium leading-tight text-xl mt-0 mb-2 text-black">Language</h5>
          </div>
          <div className="p-2 text-end text-slate-600 text-sm pt-2">
          <i onClick={HandleOpen} className="fa-solid fa-plus border-solid  ring-2 ring-gray-200 p-2 rounded-full" />
          </div>
        </div>
        <hr />
        <div className="">
          <div className>
            {!data?<Breathing width={360} height={250} />:
            data.map((langu,index)=>{
              return(
                <>
                <div key={index} class="ml-2 p-1 grid grid-cols-4 gap-4">
                <div class="col-span-3">
                  <ul  className="list-none font-normal  text-base text-black">
                  <li>{langu}</li>
                </ul>
                </div>
                <div class="text-end text-slate-600 text-xs">
                  <i onClick={()=>LanguageIdStore(langu)} className="fa-solid fa-trash-can border-solid  ring-2 ring-gray-200 p-2 rounded-full" />
                </div>
                </div>
            </> 
              )
            })}     
          </div>
        </div>
      </div>
      <LanguageDeleteModal id={languId} setOpen={setLanguageDelete} open={languageDelete} ProfileSubmit={ProfileSubmit} />
      {open==true?<LanguageModal setOpen={setOpen} data={data} open={open} ProfileSubmit={ProfileSubmit}/>:null}
    </>
  )
}

export default Language;