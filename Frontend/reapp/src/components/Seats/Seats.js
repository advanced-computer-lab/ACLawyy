import "./Seats.css";
import React, { useState,useEffect } from "react";
import axios from "axios";

//flightID is prop to seats function???
//should also have cabin type
function Seats() {
    const [FirstClassSeats, setFirstClassSeats]= useState();
    const [BusinessSeats, setBusinessSeats]= useState();
    const [EconomySeats, setEconomySeats]= useState();
    const flightID= "61a0aaa76f8ca666a0b5a33f";
    const[FirstAvailable, setFirstAvailable]= useState([]);
    const[BusinessAvailable, setBusinessAvailable]= useState([]);
    const[EconomyAvailable, setEconomyAvailable]= useState([]);

    useEffect(() => {
    axios
    .post("http://localhost:8000/Flights/Search", {_id: flightID})
    .then((res) => {
      const x = res.data;
      setFirstClassSeats(x[0].FirstClassSeats);
      setBusinessSeats(x[0].BusinessClassSeats);
      setEconomySeats(x[0].EconomyClassSeats);
      setFirstAvailable(x[0].FirstClassSeatsAvailable);
      setBusinessAvailable(x[0].BusinessClassSeatsAvailable);
      setEconomyAvailable(x[0].EconomyClassSeatsAvailable);
    })
    .catch((e) => {
      alert("error");
      console.log(e);
    });

}, []);

    return (
  <div className= "seats">  
      <div className= "seatsTop" >
         <ul className= "first">
         {
         Array.from({length: FirstClassSeats/2 })
            .map((_, index) => (
                FirstAvailable[index]==1
                  ? (<li className= "notAv"> </li>)
                  : <li className="av"> </li>
              )) }
         </ul>
         <ul className= "business">
         {
         Array.from({length: BusinessSeats/2})
            .map((_, index) => (
                BusinessAvailable[index]==1
                  ? (<li className= "notAv"> </li>)
                  : <li className= "av" > </li>
              )) }
         </ul>
         <ul className= "economy">
         {
         Array.from({length: EconomySeats/2})
            .map((_, index) => (
                EconomyAvailable[index]==1
                  ? (<li className= "notAv"> </li>)
                  :<li className= "av"> </li> 
              )) }
         </ul>
        </div>

        <img className="img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/BSicon_exFLUG.svg/500px-BSicon_exFLUG.svg.png"/>

        <div className= "seatsBottom" >
         <ul className= "first">
         {
         Array.from({length: FirstClassSeats/2})
            .map((_, index) => (
                FirstAvailable[index+(FirstClassSeats/2)+1]==1
                  ? (<li className= "notAv"> </li>)
                  : <li className= "av"> </li> 
              )) }
         </ul>
         <ul className= "business">
         {
         Array.from({length: BusinessSeats/2})
            .map((_, index) => (
                BusinessAvailable[index+(BusinessSeats/2)]==1
                  ? (<li className= "notAv"> </li>)
                  :<li className="av"> </li> 
              )) }
         </ul>
         <ul className= "economy">
         {
         Array.from({length: EconomySeats/2})
            .map((_, index) => (
                EconomyAvailable[index+(EconomySeats/2)]==1
                  ? (<li className= "notAv"> </li>)
                  :<li className="av" > </li> 
              )) }
         </ul>
        </div>
  </div> )
}
  export default Seats;