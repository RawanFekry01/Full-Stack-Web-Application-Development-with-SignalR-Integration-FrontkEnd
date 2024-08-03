import React from 'react';
import './App.css';
import LongRunningProcess from './Components/LongRunningProcess';

function App() {
  return (
            <div>
            <h1 className='header'>Long Running Process with SignalR</h1>
            <LongRunningProcess />
        </div>
  );
}
export default App;


