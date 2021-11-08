import "./App.css";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

function App() {
  const [body, setBody] = useState([]);
  const [rows, setRows] = useState([]);
  const [id, setID] = useState("");
  const [flightNumberC, setFlightNumber] = useState("");
  const [cabinC, setCabin] = useState("");
  const [seatsAvailableC, setSeatsAvailable] = useState("");
  const [arrivalDateC, setArrivalDate] = useState("");
  const [departureDateC, setDepartureDate] = useState("");
  const [departureAirportC, setDepartureAirport] = useState("");
  const [arrivalAirportC, setArrivalAirport] = useState("");
  const [departureTimeC, setDepartureTime] = useState("");
  const [arrivalTimeC, setArrivalTime] = useState("");

  const columns = [
    { field: "id", headerName: "ID", width: 230 },
    {
      field: "FlightNumber",
      headerName: "Flight #",
      type: "number",
      width: 150,
    },
    {
      field: "Cabin",
      headerName: "Cabin",
      width: 140,
    },
    {
      field: "SeatsAvailable",
      headerName: "Seats",
      type: "number",
      width: 130,
      editable: true,
    },
    {
      field: "DepartureAirport",
      headerName: "Departure Airport",
      width: 220,
    },
    {
      field: "DepartureDate",
      headerName: "Departure Date",
      width: 200,
    },
    {
      field: "DepartureTime",
      headerName: "Departure Time",
      width: 200,
    },
    {
      field: "ArrivalAirport",
      headerName: "Arrival Airport",
      width: 180,
    },
    {
      field: "ArrivalDate",
      headerName: "Arrival Date",
      width: 160,
    },
    {
      field: "ArrivalTime",
      headerName: "Arrival Time",
      width: 160,
    },
  ];
 

  function handleAllFlights() {
    const data = axios
      .get("http://localhost:8000/flights")
      .then((res) => {
        const x = res.data;
        setBody(x);
        setRows(x.map(obj=> ({ ...obj, id:obj._id})));
        console.log("hallooo");
      })
      .catch(() => {
        alert("error");
      });
  }
  function handleDeleteFlights(deleteID) {
    const data = axios
      .post("http://localhost:8000/Flights/DeleteFlight", {
        id: deleteID,
      })
      .then((res) => {
        console.log("delet");
        alert(
          "please click show all flights to see your changes! (you can search as well)"
        );
          handleAllFlights();
      })
      .catch(() => {
        alert("error");
      });
  }

  function handleUpdateFlights(  ) {
    var obj = {};
    if (id.length !== 0) {
      obj = { ...obj, ["_id"]: id };
    }
    if (flightNumberC.length !== 0) {
      obj = { ...obj, ["FlightNumber"]: flightNumberC };
    }
    if (cabinC.length !== 0) {
      obj = { ...obj, ["Cabin"]: cabinC };
    }
    if (seatsAvailableC.length !== 0) {
      obj = { ...obj, ["SeatsAvailable"]: seatsAvailableC };
    }
    if (arrivalDateC.length !== 0) {
      obj = { ...obj, ["ArrivalDate"]: arrivalDateC };
    }
    if (departureDateC.length !== 0) {
      obj = { ...obj, ["DepartureDate"]: departureDateC };
    }
    if (departureAirportC.length !== 0) {
      obj = { ...obj, ["DepartureAirport"]: departureAirportC };
    }
    if (arrivalAirportC.length !== 0) {
      obj = { ...obj, ["ArrivalAirport"]: arrivalAirportC };
    }
    if (departureTimeC.length !== 0) {
      obj = { ...obj, ["DepartureTime"]: departureTimeC };
    }
    if (arrivalTimeC.length !== 0) {
      obj = { ...obj, ["ArrivalTime"]: arrivalTimeC };
    }
    const data = axios
      .post("http://localhost:8000/Flights/UpdateFlight", obj)
      .then(() => {
        console.log("Update");
        alert(
          "Flight updated successfully >w<, please click show all flights to see your updated flight! (you can search as well)"
        );
        handleAllFlights()
      })
      .catch(() => {
        alert("error");
      });
  }
  function handleCreateFlights(
    flightNumber1,
    cabin1,
    seatsAvailable1,
    arrivalDate1,
    departureDate1,
    departureAirport1,
    arrivalAirport1,
    departureTime1,
    arrivalTime1
  ) {
    const data = axios
      .post("http://localhost:8000/Flights/CreateFlight", {
        FlightNumber: flightNumber1,
        Cabin: cabin1,
        SeatsAvailable: seatsAvailable1,
        ArrivalDate: arrivalDate1,
        DepartureDate: departureDate1,
        DepartureAirport: departureAirport1,
        ArrivalAirport: arrivalAirport1,
        DepartureTime: departureTime1,
        ArrivalTime: arrivalTime1,
      })
      .then((res) => {
        console.log("Create");
        alert(
          "Flight created successfully UwU, Please click show all flights to see your new flight!"
        );

        handleAllFlights()
      })
      .catch(() => {
        alert("error");
      });
  }

  function handleSearchFlights() {
    var obj = {};
    if (id.length !== 0) {
      obj = { ...obj, ["_id"]: id };
    }
    if (flightNumberC.length !== 0) {
      obj = { ...obj, ["FlightNumber"]: flightNumberC };
    }
    if (cabinC.length !== 0) {
      obj = { ...obj, ["Cabin"]: cabinC };
    }
    if (seatsAvailableC.length !== 0) {
      obj = { ...obj, ["SeatsAvailable"]: seatsAvailableC };
    }
    if (arrivalDateC.length !== 0) {
      obj = { ...obj, ["ArrivalDate"]: arrivalDateC };
    }
    if (departureDateC.length !== 0) {
      obj = { ...obj, ["DepartureDate"]: departureDateC };
    }
    if (departureAirportC.length !== 0) {
      obj = { ...obj, ["DepartureAirport"]: departureAirportC };
    }
    if (arrivalAirportC.length !== 0) {
      obj = { ...obj, ["ArrivalAirport"]: arrivalAirportC };
    }
    if (departureTimeC.length !== 0) {
      obj = { ...obj, ["DepartureTime"]: departureTimeC };
    }
    if (arrivalTimeC.length !== 0) {
      obj = { ...obj, ["ArrivalTime"]: arrivalTimeC };
    }
    const data = axios
      .post("http://localhost:8000/Flights/Search", obj)
      .then((res) => {
        const x = res.data;
        setBody(x);
        setRows(x.map(obj=> ({ ...obj, id:obj._id})));
        //alert("search? fy datagrid");
      })
      .catch(() => {
        alert("error");
      });
  }

  return (
    <div>
      <div>
        <h4>Flight Information:</h4>
        <label>
          Flight ID:
          <input type="text" onChange={(e) => setID(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Flight Number:
          <input
            placeholder="ex. 123"
            type="text"
            onChange={(e) => setFlightNumber(e.target.value)}
          />
        </label>
        <label>
          Cabin:
          <input
            placeholder="ex. Economy"
            type="text"
            onChange={(e) => setCabin(e.target.value)}
          />
        </label>
        <label>
          Seats Available:
          <input
            placeholder="ex. 20"
            type="Number"
            onChange={(e) => setSeatsAvailable(e.target.value)}
          />
        </label>
      </div>
      <div className="Departure">
        <h4>Departure Information:</h4>
        <label>
          Departure Airport:
          <input
            placeholder="Departure Airport"
            type="text"
            onChange={(b) => setDepartureAirport(b.target.value)}
          />
        </label>
        <label>
          Departure Date:
          <input
            placeholder="DD/MM/YYYY"
            type="date"
            onChange={(c) =>
              setDepartureDate(
                c.target.value.replace("/", "-").split("-").reverse().join("-")
              )
            }
          />
        </label>
        <label>
          Departure Time:
          <input
            placeholder="HH:MM"
            type="time"
            onChange={(c) => setDepartureTime(c.target.value)}
          />
        </label>
      </div>
      <div className="Arrival">
        <h4>Arrival Information:</h4>
        <label>
          Arrival Airport:
          <input
            placeholder="Arrival Airport"
            type="text"
            onChange={(a) => setArrivalAirport(a.target.value)}
          />
        </label>
        <label>
          Arrival Date:
          <input
            placeholder="DD/MM/YYYY"
            type="date"
            onChange={(v) =>
              setArrivalDate(
                v.target.value.replace("/", "-").split("-").reverse().join("-")
              )
            }
          />
        </label>
        <label>
          Arrival Time:
          <input
            placeholder="HH:MM"
            type="time"
            onChange={(v) => setArrivalTime(v.target.value)}
          />
        </label>
      </div>

      <nav>
        <ul>
          <li>
            <button
              onClick={() => {
                handleAllFlights();
              }}
            >
              Show All Flights
            </button>
          </li>
          <li>
            <button
              onClick={() =>
                handleCreateFlights(
                  flightNumberC,
                  cabinC,
                  seatsAvailableC,
                  arrivalDateC,
                  departureDateC,
                  departureAirportC,
                  arrivalAirportC,
                  departureTimeC,
                  arrivalTimeC
                )
              }
            >
              Create New Flight
            </button>
          </li>
          <li>
            <button
              onClick={() =>
                handleUpdateFlights(                )
              }
            >
              Edit a Flight
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete this flight from the database?"
                  )
                ) {
                  handleDeleteFlights(id);
                  handleAllFlights();
                }
              }}
            >
              Delete a Flight
            </button>
          </li>
          <li>
            <button
              onClick={() =>
                handleSearchFlights(
                  id,
                  flightNumberC,
                  cabinC,
                  seatsAvailableC,
                  arrivalDateC,
                  departureDateC,
                  departureAirportC,
                  arrivalAirportC
                )
              }
            >
              Search for a Flight
            </button>
          </li>
        </ul>
      </nav>
      <div  style={{ display:'flex', height: 550, width: '100%' }}>
      <div style={{ flexGrow: 1 }}>
      <DataGrid rows={rows} columns={columns} />
      </div>
      </div>
    </div>
  );
}

export default App;
