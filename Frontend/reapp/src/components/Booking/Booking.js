import "./Booking.css";
import BoardingPass from "./BoardingPass";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Booking(props) {
  // const purchase = props.purchase;
  // const tickets = props.Tickets;
  const { number, tickets, price, userID, _id } = props.p;

  const [user, setUser] = useState(null);
  const [awayFlight, setAwayFlight] = useState(null);
  const [returnFlight, setReturnFlight] = useState(null);

  useEffect(() => {
    axios
      .post("http://localhost:8000/Tickets/getUserDetails", {
        UserID: props.UserID,
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      });
  }, []);

  useEffect(() => {
    console.log(props.p.NumberOfTickets);
    console.log(props.p.Tickets);
    console.log(props.p.Tickets[0].ReturnFlight);
    console.log(props.p.Tickets[0].AwaySeat);
    if (props.p.Tickets != undefined) {
      console.log(props.p.Tickets);
      axios
        .post("http://localhost:8000/Tickets/getReturnDetails", {
          ReturnFlight: props.p.Tickets[0].ReturnFlight,
        })
        .then((res) => {
          console.log(JSON.stringify(res.data));
          setReturnFlight(res.data);
        })
        .catch((err) => console.log("Error: " + err));
      axios
        .post("http://localhost:8000/Tickets/getAwayDetails", {
          AwayFlight: props.p.Tickets[0].AwayFlight,
        })
        .then((res) => {
          console.log(JSON.stringify(res.data));
          setAwayFlight(res.data);
        })
        .catch((err) => console.log("Error: " + err));
    }
  }, []);

  //   useEffect(() => {
  //     axios
  //       .post("http://localhost:8000/Tickets/findMyPurchases", {
  //         UserID: props.UserID,
  //       })
  //       .then((res) => {
  //         console.log(res.data);
  //         setMyPurchases(res.data);

  //              });
  //   }, []);

  //   useEffect(() => {

  // setCurrPurchase(myPurchases[0]);

  //    setMyTickets((prevTickets) => [].concat(currPurchase.Tickets));

  //    console.log("halloooooo");

  // }, [myPurchases]);

  if (awayFlight == null || user == null) return <div> </div>;

  return (
    <div className="booking">
      <div>
        <label>Booking Number:</label>
        <label>{props.p._id}</label>
        <label>Number of Tickets:</label>
        <label>{props.p.NumberOfTickets}</label>
        <label>Total Price of Booking:</label>
        <label>{props.p.TotalPrice}</label>
      </div>
      <div>
        {props.p.Tickets.map((ticket) => {
          console.log(ticket.AwayCabin);
          return (
            <div>
              <BoardingPass
                props={awayFlight}
                type={ticket}
                isAway={true}
                user={user}
              ></BoardingPass>
              <BoardingPass
                props={returnFlight}
                type={ticket}
                isAway={false}
                user={user}
              ></BoardingPass>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Booking;
