import React, { useState,useEffect } from 'react'
import { authFetchStudent } from '../features/axios/intance'

const Quiz = () => {
    const [QuestionData,setQuestionData]=useState()
    const [tryData,setTryData]=useState([])
    const [printAcademic,setPrintAcademic]=useState(0)
    const [correctAnswerData,setCorrectAnswerData]=useState([])
    const [profileStep,setProfileStep]=useState({
        step:1,status:''})

        console.log(tryData,correctAnswerData,"tryData")
    const BacktoHome=()=>{
        setProfileStep({...profileStep,step:1,status:''})
    } 

    const PreviousHandler=()=>{
        setProfileStep({...profileStep,step:profileStep.step-1})
        setPrintAcademic(printAcademic- 1)
    }  

    const AnswerOnChangeHandler=(id,ans)=>{
        let filtered = correctAnswerData.filter(lang => {
            return lang.id === id;
         });
          if (correctAnswerData.includes(filtered[0])){
           let myIndex = correctAnswerData.indexOf(filtered[0]);
           correctAnswerData[myIndex].id=id
           correctAnswerData[myIndex].Correct_Answer=ans
         }
         else{
            setCorrectAnswerData([...correctAnswerData,{id:id,Correct_Answer:ans}])
         }
         setTryData([...tryData,{id:id,Correct_Answer:ans}])

    }

    const NextHandler=()=>{
         setProfileStep({...profileStep,step:profileStep.step+1,})
         setPrintAcademic(printAcademic+1)
    }

    const CompleteHandler=()=>{
        setProfileStep({...profileStep,step:0,status:'complete'})
    } 

    const GetCategoryData =async()=>{
        try {
          const resp = await authFetchStudent('/api/student/get-quiz-question');
          setQuestionData(resp.data.data)
        } catch (error) {
          console.log(error)
        }
      }
    
      useEffect(() => {
        GetCategoryData()
      },[])
    
  return (
        <>
        <div className="max-w-3xl mx-auto px-4 py-10">
            {profileStep.status === 'complete'? <div> 
            <div className="bg-white rounded-lg p-10 flex items-center shadow justify-between">
                <div>
                <svg className="mb-4 h-20 w-20 text-green-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <h2 className="text-2xl mb-4 text-gray-800 text-center font-bold">Registration Success</h2>
                <div className="text-gray-600 mb-8">
                    Thank you. We have sent you an email to demo@demo.test. Please click the link in the message to activate your account.
                </div>
                <button  onClick={BacktoHome} className="w-40 block mx-auto focus:outline-none py-2 px-5 rounded-lg shadow-sm text-center text-gray-600 bg-white hover:bg-gray-100 font-medium border">Back to home</button>
                </div>
            </div>
            </div> :null}
            {profileStep.status !== 'complete'?<><div className="border-b-2 py-4">
                <div className="uppercase tracking-wide text-xs font-bold text-gray-500 mb-1 leading-tight" x-text="`Step: ${step} of 3`" />
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    STEP: {profileStep.step} OF {!QuestionData?null:QuestionData.length}
                    <div className="text-lg font-bold text-gray-700 leading-tight">Your Profile</div>
                </div> 
                <div className="flex items-center md:w-64">
                    <div className="w-full bg-white rounded-full mr-2">
                    <div className="rounded-full bg-green-500 text-xs leading-none h-3 text-center text-white" 
                    style={{width:`${parseInt(profileStep.step / 20 * 100)}%`}}
                    />
                </div>
                <div className="text-xs w-10 text-gray-600"/>{parseInt(profileStep.step / 20 * 100) +'%'}
                </div>
            </div>
                {!QuestionData?null:QuestionData.map((item,index)=>{
                  return <div key={index+1} className="flex-1">
                    {profileStep.step === index+1? <>
                     <div className="text-xl font-bold text-gray-700 leading-tight mt-5">Q.{index+1} {item.question}</div>  
                    {item.choices.map((choice)=>{
                       return <div className="text-lg text-gray-700 leading-tight mt-3">
                            <input id="list-radio-license" onChange={()=>AnswerOnChangeHandler(item._id,choice.option)} 
                            defaultChecked={!correctAnswerData[printAcademic]?null:correctAnswerData[printAcademic].Correct_Answer===choice.option}
                                type="radio" name="list-radio" value={choice.option} className="w-4 h-4 mr-3 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />{choice.option}
                        </div>
                    })}
                    </>
                    :null}
                </div>
                })} 
                </> :null}
            </div>
        {/* Bottom Navigation */}
        {profileStep.status != 'complete'?
        <div className="fixed bottom-0 left-0 right-0 py-5 bg-white shadow-md" >
            <div className="max-w-3xl mx-auto px-4">
            <div className="flex justify-between">
                <div className="w-1/2">
                {profileStep.step != 1?
                <button onClick={PreviousHandler}
                className="w-32 focus:outline-none py-2 px-5 rounded-lg shadow-sm text-center text-gray-600 bg-white hover:bg-gray-100 font-medium border">Previous</button>
                :null}
                </div>
                <div className="w-1/2 text-right">
                {profileStep.step != 20?
                <button onClick={NextHandler} className="w-32 focus:outline-none border border-transparent py-2 px-5 rounded-lg shadow-sm text-center text-white bg-blue-500 hover:bg-blue-600 font-medium">Next</button>
                :
                <button onClick={CompleteHandler} className="w-32 focus:outline-none border border-transparent py-2 px-5 rounded-lg shadow-sm text-center text-white bg-blue-500 hover:bg-blue-600 font-medium">Complete</button>
                }   
                </div>
            </div>
            </div>
        </div> :null}
    </>
  )
}

export default Quiz