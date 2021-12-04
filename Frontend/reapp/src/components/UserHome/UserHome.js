
import React, { useState,useEffect } from "react";
import axios from "axios";
import BlockTextFields from "../BlockTextFields/BlockTextFields";
import Button from "@mui/material/Button";
import UserSearch from "../UserSearch/UserSearch";
import FlightResults from "../FlightResults/FlightResults"
import ReactDOM from 'react-dom';
import { Stack } from "@mui/material";




function UserHome(props) {
  const [outboundFlights,setOutboundFlights] = useState([]);
  const [inboundFlights,setInboundFlights] = useState([]);
  const [adults,setAdults] = useState(0);
  const [children,setChildren] = useState(0);
  const [first,setFirst] = useState(false);
  const [business,setBusiness] = useState(false);
  const [economy,setEconomy] = useState(false);
  const [midsearch,setMidsearch]=useState(true);
  console.log(props.userID);
  const checkIfSeatsEnough = (flight,cabin)=>{

    if (cabin == "first"){
      return flight.FirstClassSeats >= parseInt(adults);
    }
    if (cabin == "business"){
      var c = children==""?0:parseInt(children);
      return flight.BusinessClassSeats >= parseInt(adults)+ c ;
    }
   else
      var c = children==""?0:parseInt(children);
      return flight.EconomyClassSeats >= parseInt(adults) + c;
    }
  const checkIfAfterDeparture = (flight)=>{
    const depDate = new Date(outboundFlights[0].DepartureDate);
    const compDate =new Date(flight.DepartureDate);

    return compDate> depDate;

  }
  const handleSearch = (outflights,inflights,adultcount,childcount,fir,bus,eco) => {
    
    setOutboundFlights(outflights);
    setInboundFlights(inflights);
    setAdults(adultcount);
    setChildren(childcount);
    setFirst(fir);
    setBusiness(bus);
    setEconomy(eco);
    setMidsearch(false);


  }
    return (
      <Stack direction="row" spacing={0}>

        <UserSearch onSearch = {handleSearch}/>
        {outboundFlights.length>0&&inboundFlights.length>0&&<FlightResults  userID = {props.userID} children = {children} adults = {adults} isAfter = {checkIfAfterDeparture} enoughSeats = {checkIfSeatsEnough} outFlights= {outboundFlights} inFlights = {inboundFlights} econ = {economy} bus = {business} first = {first}/>}
      </Stack>

    );

}
  export default UserHome;
  