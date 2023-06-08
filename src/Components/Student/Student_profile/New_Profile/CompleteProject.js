import React,{useState,useEffect} from 'react'
import { authFetch } from '../../../../Middleware/axios/intance'
import Message from '../../../../features/Message';
import { useNavigate } from 'react-router-dom';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import Certificate from '../../Certificate/Certificate';
                        
const CompleteProject = ({Data}) => {
  const navigate = useNavigate()
  const [projectData,setProjectData]=useState([])
  const [message,setMessage]=useState({message:'',type:''})

  const GetProjectData =async()=>{
      try {
        const resp = await authFetch.get('/api/student/get-complete-project-data');
        setProjectData(resp.data)
      } catch (error) {
        setMessage({message:error,type:''})
      }
    }

  useEffect(() => {
      GetProjectData()
  },[])

  return (
         <>
        <div className="p-4 bg-white w-full">
        <section>
            <div className="w-full py-4 ">
            {message.type !==''?message.type===false?
            <Message message={message.message} css='flex p-4 mb-1 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-gray-800 dark:text-red-400' />
            :
            <Message message={message.message} css='flex p-4 mb-1 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-gray-800 dark:text-green-400' />
            :null}
            <h2 className="text-xl py-4 font-bold sm:mb-4 mt-2 sm:mt-0">
              Achievement's
            </h2>
            <div className="grid grid-cols-3">
                {projectData.length<=0?<div className='text-lg'>No Achievement's.....</div>:projectData.map((data,index)=>{
                    return <div className='text-lg text-center border shadow-sm rounded py-10'>
                      <h1>Unique Id {data._id}</h1>
                      <h1 className='text-blue-500 cursor-pointer' onClick={()=>navigate(`/auth/mentor/view-project/${data._id}`)}>{data.title}</h1>
                      <PDFDownloadLink document={<Certificate
                        internName="John Doe"
                        companyName="ABC Company"
                        internshipDuration="June 2023 - August 2023"
                        signatoryName="Jane Smith"
                        signatoryTitle="HR Manager"
                        companyLogo="/path/to/company_logo.png"
                      />} fileName="my_document.pdf">
                        {({ blob, url, loading, error }) =>
                          loading ? 'Loading document...' : 'Generate PDF'
                        }
                      </PDFDownloadLink>
                    </div>
                  })}
                </div> 
            </div>
        </section>
        </div>
    </>
  )
}

export default CompleteProject