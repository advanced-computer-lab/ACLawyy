import "./BoardingPass.css";
import EconomyTicket from "./TicketImg/EconomyTicket.png";
import BusinessTicket from "./TicketImg/BusinessTicket.png";
import FirstClassTicket from "./TicketImg/FirstClassTicket.png";
import { FaPlane } from "react-icons/fa";
import Popover from '@mui/material/Popover';
import Seats from "../Seats/Seats"
import React, { useState,useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch
} from 'react-router-dom';




function BoardingPass({ props, type, isAway, user }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

const open = Boolean(anchorEl);
const id = open ? 'simple-popover' : undefined;











  console.log(props);
  console.log(props.DepartureAirport);
  var cabin = {};
  var mySeat = type.AwaySeat;

  if (isAway) {
    cabin = type.AwayCabin;
    if (
      type.AwaySeat === -1 ||
      type.AwaySeat === undefined ||
      type.AwaySeat === "-1"
    ) {
      mySeat = <a onClick = {handleClick}>Assign Seat</a>;
    } else {
      mySeat = type.AwaySeat;
    }
  } else {
    cabin = type.ReturnCabin;
    if (
      type.ReturnSeat === -1 ||
      type.ReturnSeat === undefined ||
      type.AwaySeat === "-1"
    ) {
      mySeat = <a onClick = {handleClick}>Assign Seat</a>;
    } else {
      mySeat = type.ReturnSeat;
    }
  }

  if (cabin === "economy" || cabin === "Economy") {
    return (
      <div className="ticket">

<Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 300, left: 600 }}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
 

      <Seats userID = {user._id} flightID = {props._id} ticketID = {type._id} cabinType = {cabin} nbOfSeats = {1} isAway={isAway}/>

      </Popover>





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
              <label className="big-label-bottom">{mySeat}</label>
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
            <label className="big-label-bottom">{mySeat}</label>
          </div>
        </div>
      </div>
    );
  } else if (cabin === "business"||cabin === "Business") {
    return (
      <div className="ticket">
<Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 300, left: 600 }}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
 

      <Seats userID = {user._id} flightID = {props._id} ticketID = {type._id} cabinType = {cabin.toLowerCase()} nbOfSeats = {5} isAway={isAway}/>

      </Popover>


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
              <label className="big-label-bottom">{mySeat}</label>
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
            <label className="big-label-bottom">{mySeat}</label>
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
              <label className="big-label-bottom">{mySeat}</label>
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
            <label className="big-label-bottom">{mySeat}</label>
          </div>
        </div>
      </div>
    );
  }
}

export default BoardingPass;
