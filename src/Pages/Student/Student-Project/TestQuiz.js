import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Fireworks from '../../../features/Crackers/Fireworks'
import { StudentToken } from '../../../features/Token'
import { authFetch } from '../../../Middleware/axios/intance'
import TimerQuiz from '../../../features/TimerQuiz'


const TestQuiz = () => {
    const navigate = useNavigate()
    const [QuestionData,setQuestionData]=useState()
    const [printAcademic,setPrintAcademic]=useState(0)
    const [correctAnswerData,setCorrectAnswerData]=useState([])
    const [profileStep,setProfileStep]=useState({
        step:1,status:'',clear:''})

    const BacktoHome=()=>{
        navigate(-2)
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
    }

    const NextHandler=()=>{
         setProfileStep({...profileStep,step:profileStep.step+1,})
         setPrintAcademic(printAcademic+1)
    }

    const FormSubmitHandler=async()=>{
        if (document.fullscreenElement) {
            document.exitFullscreen()}
        try {
            const resp = await authFetch.post('/api/student/submitquiz',{data:correctAnswerData});
            setProfileStep({...profileStep,step:0,status:'complete',clear:resp.data.message})
            
          } catch (error) {
            console.log(error)
          }
    }

    const GetCategoryData =async()=>{
        try {
          const resp = await authFetch('/api/student/get-quiz-question');
          setQuestionData(resp.data)
        } catch (error) {
          console.log(error)
        }
      }
      
    // const onBlur = () => {
    //     FormSubmitHandler();
    // };

    const KeyboardEvent=()=>{
        // if (document.fullscreenElement) {
            if(QuestionData){
                document.addEventListener("fullscreenchange", function(e) {
                    FormSubmitHandler()
                    console.log(e.key,"key")
                    // if (e.key==undefined) {
                    //     // FormSubmitHandler()
                    // }
                  });
            // }
        }
       
    }
    
    useEffect(() => {
        GetCategoryData();
        //     window.addEventListener("blur", onBlur);
        // return () => {
        //     window.removeEventListener("blur", onBlur);
        // };
    },[])

    useEffect(() => {
        KeyboardEvent()
    },[QuestionData])
    
  return (
        <>
        <div className="max-w-3xl mx-auto px-4 py-10">
            {profileStep.status === 'complete'? <div> 
                {profileStep.result==="Pass"?<>
                <div className="tsparticlescontainer">
                    <Fireworks />
                    <div id="your-div">
                        <svg className="mb-4 h-20 w-20 text-green-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        <h2 className="text-2xl mb-4 text-gray-800 text-center font-bold">!Hurray</h2>
                        <div className="text-gray-600 mb-8">
                        You Are Pass Examination
                        </div>
                        <button  onClick={BacktoHome} className="w-40 block mx-auto focus:outline-none py-2 px-5 rounded-lg shadow-sm text-center text-gray-600 bg-white hover:bg-gray-100 font-medium border">Back To Apply</button>
                    </div>
                </div>
                </>:<>
                    <svg className="mb-4 h-20 w-20 text-red-500 mx-auto" viewBox="0 0 329.26933 329" fill="currentColor"><path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"/></svg>
                    <h2 className="text-2xl mb-4 text-gray-800 text-center font-bold">!Oops</h2>
                    <div className="text-gray-600 mb-8 text-center">
                    You Are Fail?
                    </div>
                    <button  onClick={BacktoHome} className="w-40 block mx-auto focus:outline-none py-2 px-5 rounded-lg shadow-sm text-center text-gray-600 bg-white hover:bg-gray-100 font-medium border">Back To Apply</button>
                </>}
            </div> :null}
           {/* <div className='text-end text-xl font-bold text-gray-700 leading-tight'><TimerQuiz FormSubmitHandler={FormSubmitHandler}/></div> */}
            {profileStep.status !== 'complete'?<>
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
                <button onClick={NextHandler} className="w-32 focus:outline-none border border-transparent py-2 px-5 rounded-lg shadow-sm text-center text-white bg-orange-500 hover:bg-orange-600 font-medium">Next</button>
                :
                <button onClick={FormSubmitHandler} className="w-32 focus:outline-none border border-transparent py-2 px-5 rounded-lg shadow-sm text-center text-white bg-orange-500 hover:bg-orange-600 font-medium">Submit</button>
                }   
                </div>
            </div>
            </div>
        </div> :null}
        
    </>
  )
}

export default TestQuiz