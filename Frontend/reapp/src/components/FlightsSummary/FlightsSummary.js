import { useEffect, useState } from "react";
import popupStyles from "./FlightsSummary.css";
import FlightCard from "../FlightCard/FlightCard"
import { Button } from '@mui/material';
function FlightsSummary (props)  {
  const {flight1,cabin1,flight2,cabin2} = props;


  return (
    <div className = "container2">
    <div className = "container">
      <FlightCard cabin = {cabin1} flight = {flight1} onClick = {()=>{return}} isSelected = {() => {return false}} perm = { true} className = "elem"/>
      <FlightCard cabin = {cabin2} flight = {flight2} onClick = {()=>{return}} isSelected = {() => {return false}} perm = { true} className = "elem"/>
    </div>
    < Button  className = "button2"  >Reserve</Button>


    </div>
  );
};


export default FlightsSummary;

