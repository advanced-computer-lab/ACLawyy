import "./MiniUserSearch.css";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import BasicDatePicker from "../BasicDatePicker/BasicDatePicker";
import React, { useState } from "react";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { inflateSync } from "zlib";

function MiniUserSearch(props) {


  const formatCityName = (name) => {
    let formattedName = name.trim();
    formattedName = formattedName.toLowerCase();

    for (var i = 0; i < formattedName.length; i++) {
      if (i === 0 || (i > 0 && formattedName.charAt(i - 1) === " ")) {
        formattedName =
          formattedName.substring(0, i) +
          formattedName.charAt(i).toUpperCase() +
          formattedName.substring(i + 1);
      }
    }
    return formattedName;
  };


  const [departureCityC, setDepartureCity] = useState("");
  const [arrivalCityC, setArrivalCity] = useState("");
  const [passengersC, setPassengers] = useState(0);

  const [outboundFlights, setOutboundFlights] = useState([]);
  const [inboundFlights, setInboundFlights] = useState([]);

  const setPassengersBig = (e) => {
    const finalValue = parseInt(e.target.value) > 0 ? e.target.value : 1;

    setPassengers(finalValue);
  };

  const isMissing = () => {
    if (departureCityC == "" || arrivalCityC == "" || passengersC == "")
      return true;
    return false;
  };

  function handleSearchFlights() {
    var obj = {};
    var obj2 = {};

    if (departureCityC.length !== 0) {
      obj = { ...obj, ["DepartureCity"]: departureCityC };
      obj2 = { ...obj2, ["DepartureCity"]: arrivalCityC };
    }
    if (arrivalCityC.length !== 0) {
      obj = { ...obj, ["ArrivalCity"]: arrivalCityC };

      obj2 = { ...obj2, ["ArrivalCity"]: departureCityC };
    }

    axios
      .post("http://localhost:8000/Flights/Search", obj)
      .then((res) => {
        var x1 = res.data;
        setOutboundFlights(x1);

        axios
          .post("http://localhost:8000/Flights/Search", obj2)
          .then((res) => {
            var x2 = res.data;

            setInboundFlights(x2);

            props.onSearch(x1, x2, passengersC);
          })
          .catch((e) => {
            alert("error");
            console.log(e);
          });
      })
      .catch((e) => {
        alert("error");
        console.log(e);
      });
  }
  return (
    <div className="container70">
      <div className="alldetails">
        <Stack spacing={2}>
          <div>
            <TextField
              id="outlined-basic"
              label="Departing City"
              variant="outlined"
              onChange={(e) => setDepartureCity(formatCityName(e.target.value))}
            />
          </div>
        </Stack>
        <Stack spacing={2}>
          <div>
            <TextField
              id="outlined-basic"
              label="Arrival City"
              variant="outlined"
              onChange={(e) => setArrivalCity(formatCityName(e.target.value))}
            />
          </div>
        </Stack>
        <Stack spacing={2}>
          <div>
            <TextField
              id="outlined-basic"
              label="Number of Passengers"
              variant="outlined"
              type="number"
              onChange={(e) => setPassengersBig(e)}
              value={passengersC}
            />
          </div>
        </Stack>
      </div>
      <Stack direction="row" spacing={10}>
        <Button
          disabled={isMissing()}
          variant="contained"
          onClick={handleSearchFlights}
        >
          Search
        </Button>
      </Stack>
    </div>
  );
}
export default MiniUserSearch;
