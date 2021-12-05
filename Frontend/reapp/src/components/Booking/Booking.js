import "./Booking.css";
import BoardingPass from "./BoardingPass";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { CgTrash } from "react-icons/cg";
import Button from "@mui/material/Button";

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
    if (props.p.Tickets != undefined && props.p.Tickets != null) {
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

  const handleDelete = () => {
    console.log(props.p.Tickets);
    console.log(props.p.Tickets[0]);
    console.log(props.p.Tickets[0]._id);
    const realAwaySeats = [];
    const realReturnSeats = [];

    for (let i = 0; i < props.p.Tickets.length; i++) {
      axios
        .post("http://localhost:8000/Tickets/findAwaySeat", {
          ticketID: props.p._id,
        })
        .then((res) => {
          console.log(res.data._id);
          console.log(res.data.AwaySeat);
          realAwaySeats.push(res.data.AwaySeat);
          realReturnSeats.push(res.data.ReturnSeat);

          axios
            .post("http://localhost:8000/Tickets/DeleteTicket", {
              _id: props.p._id,
            })
            .then((res) => {
              console.log("ticket deleted not nicely");
            })
            .catch((err) => console.log("Error: " + err));

          axios
            .post("http://localhost:8000/Tickets/DeletePurchase", {
              _id: props.p._id,
            })
            .then((res) => {
              console.log("purchase deleted smoothly or nicely");
            })
            .catch((err) => console.log("Error: " + err));
        });

      var seatsAvailable1 = [];
      var seatsAvailable2 = [];

      const flight1update = { _id: awayFlight._id };
      if (props.p.Tickets[0].AwayCabin === "first") {
        flight1update.FirstClassSeats =
          awayFlight.FirstClassSeats + props.p.NumberOfTickets;
        for (let i = 0; i < realAwaySeats.length; i++) {
          if (realAwaySeats[i] != -1) {
            seatsAvailable1 = [...awayFlight.FirstClassSeatsAvailable];
            seatsAvailable1[realAwaySeats[i]] = 0;
          }
        }
        flight1update.FirstClassSeatsAvailable = seatsAvailable1;
      }
      if (props.p.Tickets[0].AwayCabin === "business") {
        flight1update.BusinessClassSeats =
          awayFlight.BusinessClassSeats + props.p.NumberOfTickets;
        for (let i = 0; i < realAwaySeats.length; i++) {
          if (realAwaySeats[i] != -1) {
            seatsAvailable1 = [...awayFlight.BusinessClassSeatsAvailable];
            seatsAvailable1[realAwaySeats[i]] = 0;
          }
        }
        flight1update.BusinessClassSeatsAvailable = seatsAvailable1;
      } else {
        flight1update.EconomyClassSeats =
          awayFlight.EconomyClassSeats + props.p.NumberOfTickets;
        seatsAvailable1 = [...awayFlight.EconomyClassSeatsAvailable];
        for (let i = 0; i < realAwaySeats.length; i++) {
          if (realAwaySeats[i] != -1) {
            seatsAvailable1[realAwaySeats[i]] = 0;
          }
        }
        flight1update.EconomyClassSeatsAvailable = seatsAvailable1;
        console.log("seats avail 1 " + seatsAvailable1);
      }
      axios
        .post("http://localhost:8000/flights/updateflight", flight1update)
        .then((res) => {})
        .catch(() => {
          alert("error");
        });

      const flight2update = { _id: returnFlight._id };
      if (props.p.Tickets[0].ReturnCabin === "first") {
        flight2update.FirstClassSeats =
          returnFlight.FirstClassSeats + props.p.NumberOfTickets;
        for (let i = 0; i < realReturnSeats.length; i++) {
          if (realReturnSeats[i] != -1) {
            seatsAvailable2 = [...returnFlight.FirstClassSeatsAvailable];
            seatsAvailable2[realReturnSeats[i]] = 0;
          }
        }
        flight2update.FirstClassSeatsAvailable = seatsAvailable2;
      }
      if (props.p.Tickets[0].ReturnCabin === "business") {
        flight2update.BusinessClassSeats =
          returnFlight.BusinessClassSeats + props.p.NumberOfTickets;
        for (let i = 0; i < realReturnSeats.length; i++) {
          if (realReturnSeats[i] != -1) {
            seatsAvailable2 = [...returnFlight.BusinessClassSeatsAvailable];
            seatsAvailable2[realReturnSeats[i]] = 0;
          }
        }
        flight2update.BusinessClassSeatsAvailable = seatsAvailable2;
      } else {
        flight2update.EconomyClassSeats =
          returnFlight.EconomyClassSeats + props.p.NumberOfTickets;
        seatsAvailable2 = [...returnFlight.EconomyClassSeatsAvailable];
        for (let i = 0; i < realReturnSeats.length; i++) {
          if (realReturnSeats[i] != -1) {
            seatsAvailable2[realReturnSeats[i].ReturnSeat] = 0;
          }
        }
        flight2update.EconomyClassSeatsAvailable = seatsAvailable2;
        console.log("seats avail 2 " + seatsAvailable2);
      }

      axios
        .post("http://localhost:8000/flights/updateflight", flight2update)
        .then((res) => {})
        .catch(() => {
          alert("error");
        });
    }
  };

  if (awayFlight === null || user === null || returnFlight === null)
    return <div> Loading...</div>;

  return (
    <div className="booking">
      <div className="header">
        <div className="labels">
          <label>Booking Number:</label>
          <label>{props.p._id}</label>
          <label>Number of Tickets:</label>
          <label>{props.p.NumberOfTickets}</label>
          <label>Total Price of Booking:</label>
          <label>{props.p.TotalPrice}</label>
        </div>
        <div>
          <Button onClick={handleDelete}>
            <CgTrash size="25px" />
          </Button>
        </div>
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
