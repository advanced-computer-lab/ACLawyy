import "./BoardingPass.css";
import EconomyTicket from "./TicketImg/EconomyTicket.png";
import BusinessTicket from "./TicketImg/BusinessTicket.png";
import FirstClassTicket from "./TicketImg/FirstClassTicket.png";
import { FaPlane } from "react-icons/fa";
import axios from "axios";
import React, { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
  Link,
} from "react-router-dom";

function BoardingPass({ props, type, isAway, user }) {
  const [mySeat, setMySeat] = useState();

  console.log(props);
  console.log(props.DepartureAirport);
  var cabin = {};
  var realSeat;
  const cabinType = isAway ? type.AwayCabin : type.ReturnCabin;
  const seatParams = {
    userID: user._id,
    flightID: props._id,
    ticketID: type._id,
    cabinType: cabinType.toLowerCase(),
    seats: 1,
    isAway: isAway,
  };

  if (isAway) {
    cabin = type.AwayCabin;
    axios
      .post("http://localhost:8000/Tickets/findAwaySeat", {
        ticketID: type._id,
      })
      .then((res) => {
        console.log(res.data._id);
        console.log(res.data.AwaySeat);
        setMySeat(res.data.AwaySeat);
      });
    console.log(mySeat);
    if (mySeat === -1 || mySeat === undefined || mySeat === "-1") {
      console.log(mySeat);
      realSeat = (
        <Link to={`/chooseSeats/${JSON.stringify(seatParams)}`}>
          Assign Seat
        </Link>
      );
    } else {
      console.log(mySeat);
      realSeat = cabin.charAt(0).toUpperCase() + "" + mySeat;
    }
  } else {
    cabin = type.ReturnCabin;
    axios
      .post("http://localhost:8000/Tickets/findReturnSeat", {
        ticketID: type._id,
      })
      .then((res) => {
        console.log(res.data);
        setMySeat(res.data.ReturnSeat);
      });
    if (mySeat === -1 || mySeat === undefined || mySeat === "-1") {
      realSeat = (
        <Link to={`/chooseSeats/${JSON.stringify(seatParams)}`}>
          Assign Seat
        </Link>
      );
    } else {
      realSeat = cabin.charAt(0).toUpperCase() + "" + mySeat;
    }
  }

  if (cabin === "economy" || cabin === "Economy") {
    return (
      <div className="ticket">
        <img src={EconomyTicket} alt="Economy Ticket" />
        <div className="big">
          <div className="left">
            <div className="top">
              <label className="big-label">{props.DepartureAirport}</label>
              <div className="plane">
                <FaPlane size="24pt" />
              </div>

              <label className="big-label">{props.ArrivalAirport}</label>
              <label className="smol-label-left">{props.DepartureCity}</label>
              <div className="spacer"></div>
              <label className="smol-label-right">{props.ArrivalCity}</label>
            </div>
            <div className="bottom">
              <label className="big-label-bottom">{props.DepartureDate}</label>
              <div className="spacer"></div>
              <label className="big-label-bottom">{props.ArrivalDate}</label>
              <label className="smol-label-left">{props.DepartureTime}</label>
              <div className="spacer"></div>
              <label className="smol-label-right">{props.ArrivalTime}</label>
            </div>
          </div>
          <div className="right">
            <div className="right-top">
              <label className="smol-label-left">Flight Number:</label>
              <label className="big-label-bottom">{props.FlightNumber}</label>
            </div>
            <div className="right-middle">
              <label className="smol-label-left">Passenger Name:</label>
              <label className="big-label-bottom">
                {user.FirstName} {user.LastName}
              </label>
            </div>
            <div className="right-bottom">
              <label className="smol-label-left">Seat:</label>
              <label className="big-label-bottom">{realSeat}</label>
            </div>
          </div>
        </div>
        <div className="smol">
          <div className="right-top">
            <label className="smol-label-left">Passenger Name:</label>
            <label className="big-label-bottom">
              {user.FirstName} {user.LastName}
            </label>
          </div>
          <div className="right-middle">
            <label className="smol-label-left">Dep. Date:</label>
            <label className="big-label-bottom">{props.DepartureDate}</label>
          </div>
          <div className="right-bottom">
            <label className="smol-label-left">From:</label>
            <label className="big-label-bottom">
              {props.DepartureCity}/{props.DepartureAirport}/
              {props.DepartureTime}
            </label>
          </div>
          <div className="right-top">
            <label className="smol-label-left">To:</label>
            <label className="big-label-bottom">
              {props.ArrivalCity}/{props.ArrivalAirport}/{props.ArrivalTime}
            </label>
          </div>
          <div className="right-middle">
            <label className="smol-label-left">Seat:</label>
            <label className="big-label-bottom">{realSeat}</label>
          </div>
        </div>
      </div>
    );
  } else if (cabin === "business" || cabin === "Business") {
    return (
      <div className="ticket">
        <img src={BusinessTicket} alt="Business Ticket" />
        <div className="big">
          <div className="left">
            <div className="top">
              <label className="big-label">{props.DepartureAirport}</label>
              <div className="plane">
                <FaPlane size="24pt" />
              </div>

              <label className="big-label">{props.ArrivalAirport}</label>
              <label className="smol-label-left">{props.DepartureCity}</label>
              <div className="spacer"></div>
              <label className="smol-label-right">{props.ArrivalCity}</label>
            </div>
            <div className="bottom">
              <label className="big-label-bottom">{props.DepartureDate}</label>
              <div className="spacer"></div>
              <label className="big-label-bottom">{props.ArrivalDate}</label>
              <label className="smol-label-left">{props.DepartureTime}</label>
              <div className="spacer"></div>
              <label className="smol-label-right">{props.ArrivalTime}</label>
            </div>
          </div>
          <div className="right">
            <div className="right-top">
              <label className="smol-label-left">Flight Number:</label>
              <label className="big-label-bottom">{props.FlightNumber}</label>
            </div>
            <div className="right-middle">
              <label className="smol-label-left">Passenger Name:</label>
              <label className="big-label-bottom">
                {user.FirstName} {user.LastName}
              </label>
            </div>
            <div className="right-bottom">
              <label className="smol-label-left">Seat:</label>
              <label className="big-label-bottom">{realSeat}</label>
            </div>
          </div>
        </div>
        <div className="smol">
          <div className="right-top">
            <label className="smol-label-left">Passenger Name:</label>
            <label className="big-label-bottom">
              {user.FirstName} {user.LastName}
            </label>
          </div>
          <div className="right-middle">
            <label className="smol-label-left">Dep. Date:</label>
            <label className="big-label-bottom">{props.DepartureDate}</label>
          </div>
          <div className="right-bottom">
            <label className="smol-label-left">From:</label>
            <label className="big-label-bottom">
              {props.DepartureCity}/{props.DepartureAirport}/
              {props.DepartureTime}
            </label>
          </div>
          <div className="right-top">
            <label className="smol-label-left">To:</label>
            <label className="big-label-bottom">
              {props.ArrivalCity}/{props.ArrivalAirport}/{props.ArrivalTime}
            </label>
          </div>
          <div className="right-middle">
            <label className="smol-label-left">Seat:</label>
            <label className="big-label-bottom">{realSeat}</label>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="ticket">
        <img src={FirstClassTicket} alt="First Class Ticket" />
        <div className="big">
          <div className="left">
            <div className="top">
              <label className="big-label">{props.DepartureAirport}</label>
              <div className="plane">
                <FaPlane size="24pt" />
              </div>

              <label className="big-label">{props.ArrivalAirport}</label>
              <label className="smol-label-left">{props.DepartureCity}</label>
              <div className="spacer"></div>
              <label className="smol-label-right">{props.ArrivalCity}</label>
            </div>
            <div className="bottom">
              <label className="big-label-bottom">{props.DepartureDate}</label>
              <div className="spacer"></div>
              <label className="big-label-bottom">{props.ArrivalDate}</label>
              <label className="smol-label-left">{props.DepartureTime}</label>
              <div className="spacer"></div>
              <label className="smol-label-right">{props.ArrivalTime}</label>
            </div>
          </div>
          <div className="right">
            <div className="right-top">
              <label className="smol-label-left">Flight Number:</label>
              <label className="big-label-bottom">{props.FlightNumber}</label>
            </div>
            <div className="right-middle">
              <label className="smol-label-left">Passenger Name:</label>
              <label className="big-label-bottom">
                {user.FirstName} {user.LastName}
              </label>
            </div>
            <div className="right-bottom">
              <label className="smol-label-left">Seat:</label>
              <label className="big-label-bottom">{realSeat}</label>
            </div>
          </div>
        </div>
        <div className="smol">
          <div className="right-top">
            <label className="smol-label-left">Passenger Name:</label>
            <label className="big-label-bottom">
              {user.FirstName} {user.LastName}
            </label>
          </div>
          <div className="right-middle">
            <label className="smol-label-left">Dep. Date:</label>
            <label className="big-label-bottom">{props.DepartureDate}</label>
          </div>
          <div className="right-bottom">
            <label className="smol-label-left">From:</label>
            <label className="big-label-bottom">
              {props.DepartureCity}/{props.DepartureAirport}/
              {props.DepartureTime}
            </label>
          </div>
          <div className="right-top">
            <label className="smol-label-left">To:</label>
            <label className="big-label-bottom">
              {props.ArrivalCity}/{props.ArrivalAirport}/{props.ArrivalTime}
            </label>
          </div>
          <div className="right-middle">
            <label className="smol-label-left">Seat:</label>
            <label className="big-label-bottom">{realSeat}</label>
          </div>
        </div>
      </div>
    );
  }
}

export default BoardingPass;
