import "./UserSearch.css";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import BasicDatePicker from "../BasicDatePicker/BasicDatePicker";
import BasicTimePicker from "../BasicTimePicker/BasicTimePicker";
import { CgSearch } from "react-icons/cg";
import { CgAdd } from "react-icons/cg";
import { FiX } from "react-icons/fi";
import React, { useState } from "react";
import axios from "axios";

function UserSearch(props) {
  const [flightNumberC, setFlightNumber] = useState("");
  const [arrivalDateC, setArrivalDate] = useState("");
  const [departureDateC, setDepartureDate] = useState("");
  const [departureAirportC, setDepartureAirport] = useState("");
  const [arrivalAirportC, setArrivalAirport] = useState("");

  const [departureTimeC, setDepartureTime] = useState("");
  const [arrivalTimeC, setArrivalTime] = useState("");
  const [departureCityC, setDepartureCity] = useState("");
  const [arrivalCityC, setArrivalCity] = useState("");
  const [baggageAllowanceC, setBaggageAllowance] = useState("");
  const [firstClassSeatsC, setFirstClassSeats] = useState("");
  const [businessClassSeatsC, setBusinessClassSeats] = useState("");
  const [economyClassSeatsC, setEconomyClassSeats] = useState("");
  const [economyPriceC, setEconomyPrice] = useState("");

  function handleSearchFlights() {
    var obj = {};

    if (flightNumberC.length !== 0) {
      obj = { ...obj, ["FlightNumber"]: flightNumberC };
    }
    if (arrivalDateC.length !== 0) {
      obj = {
        ...obj,
        ["ArrivalDate"]: JSON.stringify(arrivalDateC).slice(0, 11),
      };
    }
    if (departureDateC.length !== 0) {
      obj = {
        ...obj,
        ["DepartureDate"]: JSON.stringify(departureDateC).slice(0, 11),
      };
    }
    if (departureAirportC.length !== 0) {
      obj = { ...obj, ["DepartureAirport"]: departureAirportC };
    }
    if (arrivalAirportC.length !== 0) {
      obj = { ...obj, ["ArrivalAirport"]: arrivalAirportC };
    }
    if (departureTimeC.length !== 0) {
      obj = {
        ...obj,
        ["DepartureTime"]: JSON.stringify(departureTimeC).slice(12, 17),
      };
    }
    if (arrivalTimeC.length !== 0) {
      obj = {
        ...obj,
        ["ArrivalTime"]: JSON.stringify(arrivalTimeC).slice(12, 17),
      };
    }
    if (departureCityC.length !== 0) {
      obj = { ...obj, ["DepartureCity"]: departureCityC };
    }
    if (arrivalCityC.length !== 0) {
      obj = { ...obj, ["ArrivalCity"]: arrivalCityC };
    }
    if (baggageAllowanceC.length !== 0) {
      obj = { ...obj, ["BaggageAllowance"]: baggageAllowanceC };
    }
    if (firstClassSeatsC.length !== 0) {
      obj = { ...obj, ["FirstClassSeats"]: firstClassSeatsC };
    }
    if (businessClassSeatsC.length !== 0) {
      obj = { ...obj, ["BusinessClassSeats"]: businessClassSeatsC };
    }
    if (economyClassSeatsC.length !== 0) {
      obj = { ...obj, ["EconomyClassSeats"]: economyClassSeatsC };
    }
    if (economyPriceC.length !== 0) {
      obj = { ...obj, ["EconomyPrice"]: economyPriceC };
    }

    axios
      .post("http://localhost:8000/Flights/Search", obj)
      .then((res) => {
        const x = res.data;
        props.searchHandler(x);
        //alert("search? fy datagrid");
      })
      .catch((e) => {
        alert("error");
        console.log(e);
      });

 
  }
    //search
    return (
      <div className="block">

      </div>
    );
  
    }
export default UserSearch;
