import "./FlightResults.css";
import React, { useState,useEffect } from "react";
import { Button } from '@mui/material';
import Fab from '@mui/material/Fab';
import FlightCard from "../FlightCard/FlightCard"
import FlightsSummary from "../FlightsSummary/FlightsSummary"
import Popover from '@mui/material/Popover';

import axios from "axios";


import UserSearch from "../FlightsSummary/FlightsSummary"

function FlightResults() {
    const [flights,setFlights] = useState([]);

    const [inboundFlight,setInboundFlight] = useState(null);
    const [outboundFlight,setOutboundFlight] = useState(null);
    const [outboundCabin,setOutboundCabin] = useState(null);
    const [inboundCabin,setInboundCabin] = useState(null);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
 const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;



    const handleOut = (flight,cabin) => {
        setOutboundFlight(flight);
        setOutboundCabin(cabin);
    }
    const handleIn = (flight,cabin) => {
        setInboundFlight(flight);
        setInboundCabin(cabin);
    }
    const isSelectedOut = (id)=>{
        if (outboundFlight!= null)
            return outboundFlight._id === id;
        return false;
    }
    const isSelectedIn = (id)=>{
        if (inboundFlight!= null)
         return inboundFlight._id === id;
        return false;
    }
    function handleAllFlights() {
        axios
        .get("http://localhost:8000/flights")
        .then((res) => {
          const x = res.data;
          setFlights(x.map(obj=> ({ ...obj, id:obj._id})));
        })
        .catch(() => {
          alert("error");
        });
    }
    useEffect(() => {
       handleAllFlights();
      },[]);
    const bothSelected = ()=> {
        return outboundFlight!=null&&inboundFlight!=null

    }

    return(
        <div>
    <div className = "page" >
   
        <div className = "outbound">
            <h2 style = {{textAlign : 'center'}}> Outbound</h2>
        {flights.map((flight) => (
            <FlightCard cabin = "economy" flight = {flight} onClick = {handleOut} isSelected = {isSelectedOut}/>
            )
          )}
        </div>
 
        <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
      >
        <FlightsSummary flight1 = {outboundFlight}  cabin1 = {outboundCabin} flight2 = {inboundFlight}  cabin2 = {inboundCabin}></FlightsSummary>
     

      </Popover>

        < Fab className = "button" variant="extended" size = "medium" disabled = {!bothSelected()}  onClick={handleClick}>Select</Fab>
      

        <div className = "inbound">
        <h2 style = {{textAlign : 'center'}}> Inbound</h2>
        {flights.map((flight) => (
            <FlightCard cabin = "business" flight = {flight} isSelected = {isSelectedIn} onClick = {handleIn} id = {flight._id}/>
            )
          )}
        </div>

    </div>
    

</div>
    );


}
export default FlightResults;
