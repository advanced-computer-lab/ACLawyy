import "./Booking.css";
import BoardingPass from "./BoardingPass";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Booking(props) {
  const [myTickets, setMyTickets] = useState([]);
  const [myFlights, setMyFlights] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:8000/Tickets/findMyTickets", {
        UserID: props.UserID,
      })
      .then((res) => {
        console.log(res.data);
        setMyTickets(res.data);
        debugger;
      });
  }, []);

  useEffect(() => {
    myTickets.map((ticket) => {
      axios
        .post("http://localhost:8000/Tickets/getAwayDetails", {
          AwayFlight: ticket.AwayFlight,
        })
        .then((res) => {
          console.log(JSON.stringify(res.data));
          setMyFlights((prevFlights) => prevFlights.concat(res.data));
        });

      axios
        .post("http://localhost:8000/Tickets/getReturnDetails", {
          ReturnFlight: ticket.ReturnFlight,
        })
        .then((res) => {
          console.log(JSON.stringify(res.data));
          setMyFlights((prevFlights) => prevFlights.concat(res.data));
        });
    });
  }, [myTickets]);

  return (
    <div className="booking">
      <p>{myTickets}</p>
    </div>
  );
}

export default Booking;
