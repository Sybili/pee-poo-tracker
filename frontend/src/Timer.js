import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Timer = ({ onStop }) => {  // Added onStop prop here
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      if (time > 0) {
        onStop(time);  // Call onStop prop function with the time
        setTime(0);    // Reset the time
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, onStop, time]);  // Added onStop and time as dependencies

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };
  
  return (
    <div>
      <h2>Ready? Set? Go! ⏱️</h2>
      <div className="d-flex align-items-center">
        <button className="btn btn-primary btn-lg mr-3" onClick={handleStartStop}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <div className="p-3" style={{ fontSize: '1.5rem', fontWeight: 'bold'}}>
          {time}s
        </div>
      </div>
    </div>
  );
};


export default Timer;
