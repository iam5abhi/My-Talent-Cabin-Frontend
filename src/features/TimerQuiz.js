import React from 'react'
import { useState, useEffect } from 'react';

const TimerQuiz = ({ delayResend = "1800",FormSubmitHandler}) => {
  const [delay, setDelay] = useState(+delayResend);
  const minutes = Math.floor(delay / 60);
  const seconds = Math.floor(delay % 60);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setDelay(delay - 1);
    }, 1000);

    if (delay === 0) {
      clearInterval(timer);
     
    }
    return () => {
      clearInterval(timer);

    };
  });

  useEffect(() => {
    if (delay === 0) {
      FormSubmitHandler()
    }
  },[delay]);

  return (
    <>
    {delay === 0?null:
      <span>
        {minutes}:{seconds}
      </span>
    }
    </>
  );
};

export default TimerQuiz;