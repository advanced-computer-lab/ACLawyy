import "./Seats.css";
import React, { useState,useEffect } from "react";
import axios from "axios";

//flightID and cabin type are props to seats function???
//seat chosen needs to be tied to backend
function Seats() {
    const [FirstClassSeats, setFirstClassSeats]= useState();
    const [BusinessSeats, setBusinessSeats]= useState();
    const [EconomySeats, setEconomySeats]= useState();
    const flightID= "61a0aaa76f8ca666a0b5a33f";
    const cabinType="business";
    var firstCss="firstNotAllowed";
    var businessCss="businessNotAllowed";
    var economyCss="economyNotAllowed";
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
//to pick seat onClick:
function handleSeatsFirst(index){
    console.log("seat is",index);
    let list=[...FirstAvailable];
    console.log(list[index]);
    list[index]=1;
    console.log("now it's index in list is ",list[index]);
    var popup= window.confirm("Book this seat?")
    if (popup == true) {
         //it doesnt set it in db, resets the value upon refresh.
        setFirstAvailable(list);
      } else {
      }
  }

  function handleSeatsBusiness(index){
    console.log("seat is",index);
    let list=[...BusinessAvailable];
    console.log(list[index]);
    list[index]=1;
    console.log("now it's index in list is ",list[index]);
    var popup= window.confirm("Book this seat?")
    if (popup == true) {
         //it doesnt set it in db, resets the value upon refresh.
        setBusinessAvailable(list);
      } else {
      }
  }

  function handleSeatsEconomy(index){
    console.log("seat is",index);
    let list=[...EconomyAvailable];
    console.log(list[index]);
    list[index]=1;
    console.log("now it's index in list is ",list[index]);
    var popup= window.confirm("Book this seat?")
    if (popup == true) {
         //it doesnt set it in db, resets the value upon refresh.
        setEconomyAvailable(list);
      } else {
      }
  }

  //to render the right cabin
    if(cabinType=="economy" ){
       economyCss="economy";
    }
    else if(cabinType=="first"){
        firstCss= "first";
    }
    else if(cabinType=="business"){
        businessCss= "business";
    }

    return (
  <div className= "seats">  
      <h1 className="header">Seat selection: </h1>
      <div className= "seatsTop" >
         <ul className= {firstCss}>
         {
         Array.from({length: FirstClassSeats/2 })
            .map((_, index) => (
                FirstAvailable[index]===1
                  ? (<li className= "notAv"> </li>)
                  : <li className="av" onClick={()=>handleSeatsFirst(index)} > </li>
              )) }
         </ul>
         <ul className= {businessCss}>
         {
         Array.from({length: BusinessSeats/2})
            .map((_, index) => (
                BusinessAvailable[index]===1
                  ? (<li className= "notAv"> </li>)
                  : <li className= "av" onClick={()=>handleSeatsBusiness(index)}> </li>
              )) }
         </ul>
         <ul className= {economyCss}>
         {
         Array.from({length: EconomySeats/2})
            .map((_, index) => (
                EconomyAvailable[index]===1
                  ? (<li className= "notAv"> </li>)
                  :<li className= "av" onClick={()=>handleSeatsEconomy(index)}> </li> 
              )) }
         </ul>
        </div>

        <img className="img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/BSicon_exFLUG.svg/500px-BSicon_exFLUG.svg.png" alt="plane"/>

        <div className= "seatsBottom" >
         <ul className= {firstCss}>
         {
         Array.from({length: FirstClassSeats/2})
            .map((_, index) => (
                FirstAvailable[index+(FirstClassSeats/2)+1]===1
                  ? (<li className= "notAv"> </li>)
                  : <li className= "av" onClick={()=>handleSeatsFirst(index+(FirstClassSeats/2))}> </li> 
              )) }
         </ul>
         <ul className= {businessCss}>
         {
         Array.from({length: BusinessSeats/2})
            .map((_, index) => (
                BusinessAvailable[index+(BusinessSeats/2)]===1
                  ? (<li className= "notAv"> </li>)
                  :<li className="av" onClick={()=>handleSeatsBusiness(index+(BusinessSeats/2))}> </li> 
              )) }
         </ul>
         <ul className= {economyCss}>
         {
         Array.from({length: EconomySeats/2})
            .map((_, index) => (
                EconomyAvailable[index+(EconomySeats/2)]===1
                  ? (<li className= "notAv"> </li>)
                  :<li className="av" onClick={()=>handleSeatsEconomy(index+(EconomySeats/2))}> </li> 
              )) }
         </ul>
        </div>
  </div> )
}
  export default Seats;