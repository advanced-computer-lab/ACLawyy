import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import FlightResults from "../../FlightResults/FlightResults";
import ReactDOM from "react-dom";
import { Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import "./MiniWrapper.css";
import MiniUserSearch from "../MiniUserSearch.js";

function MiniWrapper(props) {
  const [outboundFlights, setOutboundFlights] = useState([]);
  const [inboundFlights, setInboundFlights] = useState([]);
  const [passengers, setPassengers] = useState(0);

  const [midsearch, setMidsearch] = useState(true);
  console.log(props.userID);
  const UserID = props.userID;
  const checkIfSeatsEnough = (flight, cabin) => {
    if (cabin == "first") {
      return flight.FirstClassSeats >= parseInt(passengers);
    }
    if (cabin == "business") {
      return flight.BusinessClassSeats >= parseInt(passengers);
    } else return flight.EconomyClassSeats >= parseInt(passengers);
  };
  const checkIfAfterDeparture = (flight1, flight2) => {
    const depDate = new Date(flight1.DepartureDate);
    const compDate = new Date(flight2.DepartureDate);

    return compDate > depDate;
  };
  const handleSearch = (outflights, inflights, passengerscount) => {
    setOutboundFlights(outflights);
    setInboundFlights(inflights);
    setPassengers(passengerscount);
    setMidsearch(false);
    if (outflights.length === 0) {
      window.alert(
        "Unfortunately, no flights depart from your chosen departure city."
      );
    } else if (inflights.length === 0) {
      window.alert("There are no return flights for your outbound flights.");
    }
  };
  return (
    <div>
      <Stack direction="column" spacing={0}>
        <div className="search-div">
          <div>
            <MiniUserSearch onSearch={handleSearch} />
          </div>
        </div>
        {outboundFlights.length > 0 && inboundFlights.length > 0 && (
          <div className="flight-container">
            <FlightResults
              userID={UserID}
              children={0}
              adults={passengers}
              isSmol={true}
              isAfter={null}
              enoughSeats={checkIfSeatsEnough}
              outFlights={outboundFlights}
              inFlights={inboundFlights}
              econ={true}
              bus={true}
              first={true}
            />
          </div>
        )}
      </Stack>
      <div className="spacing"></div>
    </div>
  );
}
export default MiniWrapper;
