import "./FlightResults.css";
import React, { useState,useEffect } from "react";
import { Button } from '@mui/material';
import Fab from '@mui/material/Fab';
import FlightCard from "../FlightCard/FlightCard"
import FlightsSummary from "../FlightsSummary/FlightsSummary"
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import axios from "axios";


import UserSearch from "../FlightsSummary/FlightsSummary"

function FlightResults(props) {
    const [flights,setFlights] = useState([]);
    const [inboundFlight,setInboundFlight] = useState(null);
    const [outboundFlight,setOutboundFlight] = useState(null);
    const [outboundCabin,setOutboundCabin] = useState(null);
    const [inboundCabin,setInboundCabin] = useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const outFlights = props.outFlights;
    const inFlights = props.inFlights;
    const adults = props.adults;
    const children =props.children;
    console.log(props.userID);
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
    const isSelectedOut = (id,cab)=>{
        if (outboundFlight!= null)
            return outboundFlight._id === id && outboundCabin === cab;
        return false;
    }
    const isSelectedIn = (id,cab)=>{
        if (inboundFlight!= null)
         return inboundFlight._id === id && inboundCabin === cab;
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
        <div className = "container1">
    <Stack direction="row" spacing={5} >
        <div className = "outbound">
            <h2 style = {{textAlign : 'center'}}> Outbound</h2>
        {outFlights.map((flight) => (
             <Stack direction="column" spacing={2} >
            {props.econ&&props.enoughSeats(flight,"economy")?<FlightCard key = {flight._id +"e" }cabin = "economy" flight = {flight} onClick = {handleOut} isSelected = {isSelectedOut}/>:null}
            {props.bus&&props.enoughSeats(flight,"business")?<FlightCard key = {flight._id +"b"}cabin = "business" flight = {flight} onClick = {handleOut} isSelected = {isSelectedOut}/>:null}
            {props.first&&props.enoughSeats(flight,"first")?<FlightCard key = {flight._id +"f"}cabin = "first" flight = {flight} onClick = {handleOut} isSelected = {isSelectedOut}/>:null}
            </Stack>
            )
          )}
        </div>

        <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 300, left: 600 }}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
 

        <FlightsSummary flight1 = {outboundFlight}  cabin1 = {outboundCabin} flight2 = {inboundFlight}  cabin2 = {inboundCabin} adults = {adults} children ={children} userID = {props.userID}></FlightsSummary>
     

      </Popover>

       

        <div className = "inbound">
 
        <h2 style = {{textAlign : 'center'}}> Inbound</h2>
        {inFlights.map((flight) => (
              <Stack direction="column" spacing={2} >
              {props.isAfter(flight)&&props.econ&&props.enoughSeats(flight,"economy")?<FlightCard key = {flight._id +"e" }cabin = "economy" flight = {flight} onClick = {handleIn} isSelected = {isSelectedIn}/>:null}
              {props.isAfter(flight)&&props.bus&&props.enoughSeats(flight,"business")?<FlightCard key = {flight._id +"b"}cabin = "business" flight = {flight} onClick = {handleIn} isSelected = {isSelectedIn}/>:null}
              {props.isAfter(flight)&&props.first&&props.enoughSeats(flight,"first")?<FlightCard key = {flight._id +"f"}cabin = "first" flight = {flight} onClick = {handleIn} isSelected = {isSelectedIn}/>:null}
              </Stack>
            )
          )}
        </div>

</Stack>
{bothSelected()&&
 < Fab className = "button" variant="extended" size = "medium" disabled = {!bothSelected()}  onClick={handleClick}>Select</Fab>}
       </div>
    );


}
export default FlightResults;
