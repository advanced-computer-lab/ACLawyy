import "./Booking.css";
import BoardingPass from "./BoardingPass";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Booking(props) {
  const [myTickets, setMyTickets] = useState([]);
  const [myFlights, setMyFlights] = useState([]);
  const [myPurchases, setMyPurchases] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:8000/Tickets/findMyTickets", {
        UserID: props.UserID,
      })
      .then((res) => {
        console.log(res.data);
        setMyTickets(res.data);
      });
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:8000/Tickets/findMyPurchases", {
        UserID: props.UserID,
      })
      .then((res) => {
        console.log(res.data);
        setMyPurchases(res.data);
      });
  }, []);

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
      {myFlights.map((f, i) => {
        var x = parseInt(i / 2);
        var away = false;
        if (i % 2 == 0) {
          away = true;
        }
        return (
          <BoardingPass
            props={f}
            type={myTickets[x]}
            isAway={away}
            user={user}
          />
        );
      })}
    </div>
  );
}

export default Booking;
