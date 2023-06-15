import React from 'react';
import CompanySocialMediaModal from './CompanySocialMediaModal';
import linkedin from '../../../../Assets/Images/linkedin.png'

const SocialMedia = (props) => {
  let ProfileSubmit = props.ProfileSubmit
  const [Open,setOpen] = React.useState(false);
  return (
    <>
      <div className="basis-1/2">
          <div className="flex flex-wrap -mx-3 justify-end items-end">
            <div className="flex-none w-auto max-w-full px-3">
              <p className="mb-1 mt-9 text-md font-semibold">Follow us:</p>
              <div className="flex items-center">
                <a href={props.data?props.data.linkedin_url:null} className="text-gray-500 hover:text-gray-900" target="_blank">
                  <img className="w-8 h-8" src={linkedin} />
                </a>
              </div>
            </div>
            <div className="text-end text-slate-600 text-xs mb-4">
            <i onClick={()=>setOpen(true)} className="fa-solid fa-pen border-solid ring-2 ring-gray-200 p-2 rounded-full bottom-32 right-6 absolute ring-2 rounded-full" />
          </div>                                      
          </div>
        </div>
        <CompanySocialMediaModal open={Open} setOpen={setOpen} ProfileSubmit={ProfileSubmit}/>
    </>
  )
}

export default SocialMedia;
