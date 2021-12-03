import "./BlockTextFields.css";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import BasicDatePicker from "../BasicDatePicker/BasicDatePicker";
import BasicTimePicker from "../BasicTimePicker/BasicTimePicker";
import { CgSearch } from "react-icons/cg";
import { CgAdd } from "react-icons/cg";
import { FiX } from "react-icons/fi";
import React, { useState } from "react";
import axios from "axios";

function BlockTextFields(props) {
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

  function handleAllFlights() {
    axios
      .get("http://localhost:8000/Flights/")
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

  function handleSearchFlights() {
    props.blockRemover();
    handleAllFlights();
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

  function handleCreateFlight() {
    props.blockRemover();
    axios
      .post("http://localhost:8000/Flights/CreateFlight", {
        FlightNumber: flightNumberC,
        ArrivalDate: JSON.stringify(arrivalDateC).slice(0, 11),
        DepartureDate: JSON.stringify(departureDateC).slice(0, 11),
        DepartureAirport: departureAirportC,
        ArrivalAirport: arrivalAirportC,
        DepartureTime: JSON.stringify(departureTimeC).slice(12, 17),
        ArrivalTime: JSON.stringify(arrivalTimeC).slice(12, 17),
        DepartureCity: departureCityC,
        ArrivalCity: arrivalCityC,
        BaggageAllowance: baggageAllowanceC,
        FirstClassSeats: firstClassSeatsC,
        BusinessClassSeats: businessClassSeatsC,
        EconomyClassSeats: economyClassSeatsC,
        EconomyPrice: economyPriceC,
      })
      .then((res) => {
        console.log("Create");
        alert(
          "Flight created successfully UwU, Please click show all flights to see your new flight!"
        );
      })
      .catch(() => {
        alert("error");
      });
  }

  if (props.type === 0) {
    return <div></div>;
  } else if (props.type === 1) {
    //search
    return (
      <div className="block">
        <label className="flightInfo">Flight Information</label>
        <div className="container">
          <div className="field">
            <TextField
              id="flightNumber"
              label="Flight Number"
              variant="outlined"
              onChange={(e) => setFlightNumber(e.target.value)}
            />
          </div>
          <div className="field">
            <TextField
              id="baggageAllowance"
              label="Baggage Allowance"
              variant="outlined"
              type="Number"
              onChange={(e) => setBaggageAllowance(e.target.value)}
            />
          </div>
          <div className="field">
            <TextField
              id="economyPrice"
              label="Basic Price"
              variant="outlined"
              onChange={(e) => setEconomyPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="container">
          <div className="field">
            <TextField
              id="firstClassSeats"
              label="First Class Seats"
              variant="outlined"
              type="Number"
              onChange={(e) => setFirstClassSeats(e.target.value)}
            />
          </div>
          <div className="field">
            <TextField
              id="businessClassSeats"
              label="Business Class Seats"
              variant="outlined"
              type="Number"
              onChange={(e) => setBusinessClassSeats(e.target.value)}
            />
          </div>
          <div className="field">
            <TextField
              id="economyClassSeats"
              label="Economy Class Seats"
              variant="outlined"
              type="Number"
              onChange={(e) => setEconomyClassSeats(e.target.value)}
            />
          </div>
        </div>

        <div className="align">
          <div>
            <label className="depInfo">Departure Information</label>
            <div className="container">
              <div className="field">
                <BasicDatePicker
                  label="Departure Date"
                  changeHandler={setDepartureDate}
                />
              </div>
              <div className="field">
                <TextField
                  id="depatureAirport"
                  label="Departure Airport"
                  variant="outlined"
                  onChange={(e) => setDepartureAirport(e.target.value)}
                />
              </div>
            </div>
            <div className="container">
              <div className="field">
                <BasicTimePicker
                  label="Departure Time"
                  changeHandler={setDepartureTime}
                />
              </div>
              <div className="field">
                <TextField
                  id="depatureCity"
                  label="Departure City"
                  variant="outlined"
                  onChange={(e) => setDepartureCity(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div>
            <label className="depInfo">Arrival Information</label>

            <div className="container">
              <div className="field">
                <BasicDatePicker
                  label="Arrival Date"
                  changeHandler={setArrivalDate}
                />
              </div>
              <div className="field">
                <TextField
                  id="arrivalAirport"
                  label="Arrival Airport"
                  variant="outlined"
                  onChange={(e) => setArrivalAirport(e.target.value)}
                />
              </div>
            </div>
            <div className="container">
              <div className="field">
                <BasicTimePicker
                  label="Arrival Time"
                  changeHandler={setArrivalTime}
                />
              </div>
              <div className="field">
                <TextField
                  id="arrivalCity"
                  label="Arrival City"
                  variant="outlined"
                  onChange={(e) => setArrivalCity(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="block-button">
          <Button
            variant="contained"
            color="error"
            endIcon={<FiX />}
            onClick={props.blockRemover}
          >
            Cancel
          </Button>
          <div className="spacer"></div>
          <Button
            variant="contained"
            endIcon={<CgSearch />}
            onClick={handleSearchFlights}
          >
            Search
          </Button>
        </div>
      </div>
    );
  } else {
    //create
    return (
      <div className="block">
        <label className="flightInfo">Flight Information</label>
        <div className="container">
          <div className="field">
            <TextField
              id="flightNumber"
              label="Flight Number"
              variant="outlined"
              onChange={(e) => setFlightNumber(e.target.value)}
            />
          </div>
          <div className="field">
            <TextField
              id="baggageAllowance"
              label="Baggage Allowance"
              variant="outlined"
              type="Number"
              onChange={(e) => setBaggageAllowance(e.target.value)}
            />
          </div>
          <div className="field">
            <TextField
              id="economyPrice"
              label="Basic Price"
              variant="outlined"
              onChange={(e) => setEconomyPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="container">
          <div className="field">
            <TextField
              id="firstClassSeats"
              label="First Class Seats"
              variant="outlined"
              type="Number"
              onChange={(e) => setFirstClassSeats(e.target.value)}
            />
          </div>
          <div className="field">
            <TextField
              id="businessClassSeats"
              label="Business Class Seats"
              variant="outlined"
              type="Number"
              onChange={(e) => setBusinessClassSeats(e.target.value)}
            />
          </div>
          <div className="field">
            <TextField
              id="economyClassSeats"
              label="Economy Class Seats"
              variant="outlined"
              type="Number"
              onChange={(e) => setEconomyClassSeats(e.target.value)}
            />
          </div>
        </div>

        <div className="align">
          <div>
            <label className="depInfo">Departure Information</label>
            <div className="container">
              <div className="field">
                <BasicDatePicker
                  label="Departure Date"
                  changeHandler={setDepartureDate}
                />
              </div>
              <div className="field">
                <TextField
                  id="depatureAirport"
                  label="Departure Airport"
                  variant="outlined"
                  onChange={(e) => setDepartureAirport(e.target.value)}
                />
              </div>
            </div>
            <div className="container">
              <div className="field">
                <BasicTimePicker
                  label="Departure Time"
                  changeHandler={setDepartureTime}
                />
              </div>
              <div className="field">
                <TextField
                  id="depatureCity"
                  label="Departure City"
                  variant="outlined"
                  onChange={(e) => setDepartureCity(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div>
            <label className="depInfo">Arrival Information</label>

            <div className="container">
              <div className="field">
                <BasicDatePicker
                  label="Arrival Date"
                  changeHandler={setArrivalDate}
                />
              </div>
              <div className="field">
                <TextField
                  id="arrivalAirport"
                  label="Arrival Airport"
                  variant="outlined"
                  onChange={(e) => setArrivalAirport(e.target.value)}
                />
              </div>
            </div>
            <div className="container">
              <div className="field">
                <BasicTimePicker
                  label="Arrival Time"
                  changeHandler={setArrivalTime}
                />
              </div>
              <div className="field">
                <TextField
                  id="arrivalCity"
                  label="Arrival City"
                  variant="outlined"
                  onChange={(e) => setArrivalCity(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="block-button">
          <Button
            variant="contained"
            color="error"
            endIcon={<FiX />}
            onClick={props.blockRemover}
          >
            Cancel
          </Button>
          <div className="spacer"></div>
          <Button
            variant="contained"
            endIcon={<CgAdd />}
            onClick={handleCreateFlight}
          >
            Create
          </Button>
        </div>
      </div>
    );
  }
}
export default BlockTextFields;
