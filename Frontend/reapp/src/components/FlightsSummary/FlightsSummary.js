import { useEffect, useState } from "react";
import popupStyles from "./FlightsSummary.css";
import FlightCard from "../FlightCard/FlightCard"
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import axios from "axios";


const calculatePrice = (flight,cabin)=>{
  if  (cabin == "first")
    return 2* flight.EconomyPrice;
  if  (cabin == "business")
    return 1.5* flight.EconomyPrice;
  return flight.EconomyPrice;

}


function FlightsSummary (props)  {
  const {flight1,cabin1,flight2,cabin2,adults,children,u} = props;
  const price1 = calculatePrice(flight1,cabin1);
  const price2 = calculatePrice(flight2,cabin2);

  const userID = props.userID;



  const confirmPurchase = () => {
    const adultTicket = {UserID : userID , AwayFlight : flight1._id,ReturnFlight: flight2._id , AwayCabin : cabin1, ReturnCabin : cabin2,AwayPrice:price1,ReturnPrice :price2 ,Type : "Adult"};
    const childTicket = {UserID : userID , AwayFlight : flight1._id,ReturnFlight: flight2._id , AwayCabin : cabin1, ReturnCabin : cabin2,AwayPrice:price1/2,ReturnPrice :price2 ,Type : "Child"};
    console.log(adultTicket);

    const tickets = [];
    for(let i = 0 ; i< adults; i++){
      tickets.push(adultTicket);

      axios
      .post("http://localhost:8000/Tickets/CreateTicket", adultTicket)
      .then((res) => {  })
      .catch((e) => {  alert("error"); });

    }
  

    for(let i = 0 ; i< children; i++){
      tickets.push(childTicket);

      axios
      .post("http://localhost:8000/Tickets/CreateTicket", childTicket)
      .then((res) => {  })
      .catch((e) => {  alert("error"); });

    }



    const purchaseBody = {UserID : userID , NumberOfTickets:parseInt(adults) + parseInt(children), TotalPrice : children*price1/2 + children*price2/2 +adults * price1+ adults * price2, Tickets : tickets };
    axios
    .post("http://localhost:8000/Tickets/CreatePurchase", purchaseBody)
    .then((res) => {})
    .catch((e) => {  alert("error"); });

    window.location.href = "http://localhost:3000/ReservedFlights";
  }
  
  return (
    <div className = "container2">
      <h2 className = "title" >Summary</h2>
      <Stack direction="row" spacing={1} justifyContent="center">
        <div>
          <FlightCard cabin = {cabin1} flight = {flight1} onClick = {()=>{return}} isSelected = {() => {return false}} perm = { true} className = "elem"/>
          <h3>Away Price</h3>
          <div>
          {[...Array(parseInt(adults))].map((e, i) => <PermIdentityIcon key ={i}/>)
          }
          <h4 > {adults} * {price1} = {adults * price1} $</h4>
          </div>
          <div>
          {[...Array(parseInt(children))].map((e, i) => <ChildCareIcon key ={i}/>)
          }
          {parseInt(children)>0&&<h4 > {children} * {price1/2} = {children * price1/2} $</h4>}
          <h3>Total Price : { children*price1/2 + children*price2/2 +adults * price1+ adults * price2} $</h3>
          </div>
          
        </div>
      
        <div>
          <FlightCard cabin = {cabin2} flight = {flight2} onClick = {()=>{return}} isSelected = {() => {return false}} perm = { true} className = "elem"/>
          <h3>Return Price</h3>
          <div>
          {[...Array(parseInt(adults))].map((e, i) => <PermIdentityIcon key ={i}/>)
          }
          <h4 > {adults} * {price2} = {adults * price2} $</h4>
          </div>
          <div>
          {[...Array(parseInt(children))].map((e, i) => <ChildCareIcon key ={i}/>)
          }
          {parseInt(children)>0&&<h4 > {children} * {price2/2} = {children * price2/2} $</h4>}
          </div>
          
        </div>
    </Stack>
    <Stack direction = "row" spacing = {30}>
    < Button  variant = "outlined" onClick = {confirmPurchase}  ><h4>Reserve</h4></Button>
          </Stack>
    </div>
  );
};


export default FlightsSummary;

