
import './App.css';
import Dropdown from './components/Dropdown'
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
function App() {
  const [startDate, setStartDate] = useState(new Date());
  
  const [startDate2, setStartDate2] = useState(new Date());
  return (
    <div className="App">
      <div style = {{width : '10%' , 
                  position:'absolute',
                   top: 300, 
                   left:400}}>
        <h4>Class :  </h4> 
        <Dropdown options ={[
    { value: 'economy', label: 'Economy' },
    { value: 'first', label: 'First' },
    { value: 'business', label: 'Business bla' },
    { value: 'all', label: 'All' },
  ]} />
       </div>
       <div style = {{width : '10%' , 
                    position:'absolute',
                   top: 300, 
                   left:600}}>
        <h4>Departure Date :  </h4> 
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
       </div>
       <div style = {{width : '10%' , 
                  position:'absolute',
                   top: 300, 
                   left:800}}>
        <h4>Arrival Date :  </h4> 
        <DatePicker selected={startDate2} onChange={(date) => setStartDate2(date)} />
       </div>
        
    </div>
  );
}

export default App;