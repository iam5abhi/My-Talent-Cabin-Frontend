import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Quiz_Terms = () => {
    const navigate = useNavigate()
    const [enable,setDisable]=useState(true)


    const TermOnChangeHandler=()=>{
        if(enable===false){
            setDisable(true)
        }else{
            setDisable(false) 
        }
    }

    const StartTextHandler=()=>{
        // document.body.requestFullscreen();
        navigate('/auth/student/quiz')
    }

  return (
    <>
        <div className="max-w-3xl mx-auto px-4 py-10">
            <h1 className='text-center font-bold text-2xl'>The Ultimate Trivia Quiz</h1>
            <div className="bg-white rounded-lg p-10 shadow">
                <h1 className='mb-3'><span className='font-bold'>01.</span> In this round each team has its own quota of 4 questions and other questions passed to it from the previous team that did not answer.</h1>
                <h1 className='mb-3'><span className='font-bold'>02.</span> A team gets 30 seconds to answer the question intended for it, and is awarded 20 points for answering it.</h1>
                <h1 className='mb-3'><span className='font-bold'>03.</span> In this round each team has its own quota of 4 questions and other questions passed to it from the previous team that did not answer.</h1>
                <h1 className='mb-3'><span className='font-bold'>04.</span> A team gets 30 seconds to answer the question intended for it, and is awarded 20 points for answering it.</h1>
                <h1 className='mb-3'><span className='font-bold'>05.</span> In this round each team has its own quota of 4 questions and other questions passed to it from the previous team that did not answer.</h1>
                <input id="list-radio-license" onChange={TermOnChangeHandler} type="checkbox" name="list-radio" className="w-4 h-4 mr-3 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />Agree<br/>
                <div className="text-end">
                     <button disabled={enable} onClick={StartTextHandler} className={`w-32 mx-auto text-white bg-orange-600 hover:bg-orange-400 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800 ${enable===true?"opacity-60 cursor-not-allowed":null}`}>Start Now</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Quiz_Terms;