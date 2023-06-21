import * as React from 'react';
import { Breathing } from 'react-shimmer'
import SkillModal from './SkillModal';
import SkillDeleteModal from './SkillDeleteModal';


const Skill = ({data,ProfileSubmit}) => {
  const [skillsId, setSkills] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [skillDelete, setSkillDelete] = React.useState(false);

  const HandleOpen =()=>{
    setOpen(true)
  }
  const SkillsIdStore=(id)=>{
    setSkills(id)
    setSkillDelete(true)
  }

  return (
    <>
      <div className=" col text-sm font-medium text-slate-600">
      <div className="grid grid-cols-2 gap-4 bg-slate-100">
          <div>
            <h5 className="p-2 font-medium leading-tight text-xl mt-0 mb-2 text-black">Skills</h5>
          </div>
          <div className="p-2 justify-self-end text-slate-600 text-sm pt-2">
          <i onClick={HandleOpen} className="fa-solid fa-plus border-solid  ring-2 ring-gray-200 p-2 rounded-full" />
          </div>
        </div>
        <hr />
          <div className="col-span-2">
            {!data?<Breathing width={340} height={250} />:
            data.map((skill)=>{
              return(
                <>
                <div key={skill._id} class="ml-2 p-1 grid grid-cols-4 gap-4">
                <div class="col-span-3">
                <ul className="list-none font-normal  text-base text-black" >
                <li className="rounded-full  text-center bg-blue-100 text-blue-800 my-2">
                  <span><a href className>
                    {skill.name}</a></span>
                  </li>
                </ul>
                </div>
                <div class="text-end text-slate-600 text-xs">
                <i onClick={()=>SkillsIdStore(skill._id)} className="fa-solid fa-trash-can border-solid  ring-2 ring-gray-200 p-2 rounded-full" />
                </div>
                </div>
                </>
              )
            })}
          </div>
        </div>
       {open==true? <SkillModal data={data} setOpen={setOpen} open={open} ProfileSubmit={ProfileSubmit}/>:null}
        <SkillDeleteModal id={skillsId} setOpen={setSkillDelete} open={skillDelete} ProfileSubmit={ProfileSubmit} />
    </>
  )
}

export default React.memo(Skill);