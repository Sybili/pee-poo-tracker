import React, { useState } from 'react';
import DropdownMenu from './DropdownMenu';
import axios from 'axios';
import Timer from './Timer';
import BestList from './BestList';
import Footer from './Footer';

function App() {
  const [selectedName, setSelectedName] = useState('');
  const [updateList, setUpdateList] = useState(false);
  const BACKEND_IP = process.env.REACT_APP_BACKEND_IP;

  const handleNameSelect = (name) => {
    setSelectedName(name);
  };

  const handleTimerStop = (time) => {
    // Post the time to the backend
    axios.post(`http://${BACKEND_IP}/post-time`, { name: selectedName, time: time })
      .then(response => {
        console.log('Time posted:', response);
        // Trigger a refresh of the BestList component
        setUpdateList(prev => !prev);
      })
      .catch(error => console.error('Error posting time:', error));
  };

  return (
    <div className="App container mt-5">
    <div className="d-flex flex-row p-3">
    <h1>Peepee and Poopoo Time Tracker 💩</h1>
    </div>
    
    <div className="d-flex flex-row p-3">
        <div className="card">
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>Our management theme for 2023 is the 'Year of Efficiency' and we're focused on becoming a stronger and more nimble organization.</p>
            <footer className="blockquote-footer">The Zucc @ <cite title="Source Title">Meta fourth-quarter earnings report</cite></footer>
          </blockquote>
        </div>
      </div>
    </div>
      <div className="d-flex flex-row p-3">
          <DropdownMenu onSelect={handleNameSelect} />
      </div>
      <div className="d-flex flex-row p-3">
        <Timer onStop={handleTimerStop} />
      </div>
      <div className="d-flex flex-row p-3">
      <BestList updateTrigger={updateList}/> 
         </div>
        <Footer />
    </div>
  );
}

export default App;