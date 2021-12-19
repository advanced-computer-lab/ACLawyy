import "./AlternativeFlightsSearch.css";
import React, { useState, useEffect } from "react";
import FlightCard from "../../FlightCard/FlightCard";

import { Button } from "@mui/material";

import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import axios from "axios";

import Checkbox from "@mui/material/Checkbox";

function AlternativeFlightsSearch(props) {
  const isAway = props.flightType == "departure";
  const actualFlight =
    props.flightType == "departure"
      ? props.DepartureFlight
      : props.ReturnFlight;
  const actualCabin =
    props.flightType == "departure" ? props.awayCabin : props.returnCabin;
  const returnFlight = props.ReturnFlight;
  const awayFlight = props.DepartureFlight;
  const [alternativeFlights, setAlternativeFlights] = useState([actualFlight]);
  const [showFirst, setShowFirst] = useState(true);
  const [showBusiness, setShowBusiness] = useState(true);
  const [showEconomy, setShowEconomy] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedCabin, setSelectedCabin] = useState(null);

  useEffect(() => {
    setSelectedFlight(null);
  }, [showFirst, showBusiness, showEconomy]);

  const handleUpdateBackEnd = () => {
    console.log(props.p.Tickets);
    console.log(props.p.Tickets[0]);
    console.log(props.p.Tickets[0]._id);
    const realAwaySeats = [];
    const realReturnSeats = [];

    console.log(props.p.Tickets);
    const newTickets = props.p.Tickets;
    const totalOld = props.p.TotalPrice;
    var totalNew = totalOld;
    var multiplier = 1;
    var childDiscount = 1;

    if (selectedCabin == "business") {
      multiplier = 1.5;
    } else if (selectedCabin == "first") {
      multiplier = 2;
    }

    for (let i = 0; i < props.p.Tickets.length; i++) {
      const obj = { ticketID: props.p.Tickets[i]._id };
      if (newTickets[i].type == "Child") {
        childDiscount = 0.5;
      } else {
        childDiscount = 1;
      }
      if (isAway) {
        obj.AwayFlight = selectedFlight._id;
        newTickets[i].AwayFlight = selectedFlight._id;
        obj.AwayCabin = selectedCabin;
        newTickets[i].AwayCabin = selectedCabin;
        obj.AwayPrice = selectedFlight.EconomyPrice;
        totalNew -= newTickets[i].AwayPrice;
        newTickets[i].AwayPrice =
          selectedFlight.EconomyPrice * multiplier * childDiscount;
        obj.AwaySeat = -1;
        newTickets[i].AwaySeat = -1;
      } else {
        obj.ReturnFlight = selectedFlight._id;
        newTickets[i].ReturnFlight = selectedFlight._id;
        obj.ReturnCabin = selectedCabin;
        newTickets[i].ReturnCabin = selectedCabin;
        obj.ReturnPrice = selectedFlight.EconomyPrice;
        totalNew -= newTickets[i].ReturnPrice;
        newTickets[i].ReturnPrice =
          selectedFlight.EconomyPrice * multiplier * childDiscount;
        obj.ReturnSeat = -1;
        newTickets[i].ReturnSeat = -1;
      }
      totalNew += selectedFlight.EconomyPrice * multiplier * childDiscount;

      axios
        .post("http://localhost:8000/Tickets/modifyPurchase", {
          purchaseID: props.p._id,
          Tickets: newTickets,
          TotalPrice: totalNew,
        })
        .then((res) => {})
        .catch(() => {
          alert("error");
        });

      axios
        .post("http://localhost:8000/Tickets/modifyTicket", obj)
        .then((res) => {})
        .catch(() => {
          alert("error");
        });

      axios
        .post("http://localhost:8000/Tickets/findAwaySeat", {
          ticketID: props.p.Tickets[i]._id,
        })
        .then((res) => {
          console.log(res.data);
          console.log(res.data.AwaySeat);
          realAwaySeats.push(res.data.AwaySeat);
          realReturnSeats.push(res.data.ReturnSeat);

          if (i == props.p.Tickets.length - 1) {
            var seatsAvailable1 = [];
            var seatsAvailable2 = [];

            const flight1update = { _id: awayFlight._id };
            if (props.p.Tickets[0].AwayCabin === "first") {
              flight1update.FirstClassSeats =
                awayFlight.FirstClassSeats + props.p.NumberOfTickets;
              seatsAvailable1 = [...awayFlight.FirstClassSeatsAvailable];
              for (let i = 0; i < realAwaySeats.length; i++) {
                if (realAwaySeats[i] != -1) {
                  seatsAvailable1[realAwaySeats[i]] = 0;
                }
              }
              flight1update.FirstClassSeatsAvailable = seatsAvailable1;
            }
            if (props.p.Tickets[0].AwayCabin === "business") {
              flight1update.BusinessClassSeats =
                awayFlight.BusinessClassSeats + props.p.NumberOfTickets;
              seatsAvailable1 = [...awayFlight.BusinessClassSeatsAvailable];
              for (let i = 0; i < realAwaySeats.length; i++) {
                if (realAwaySeats[i] != -1) {
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
              .then((res) => {
                const flight2update = { _id: returnFlight._id };
                if (props.p.Tickets[0].ReturnCabin === "first") {
                  flight2update.FirstClassSeats =
                    returnFlight.FirstClassSeats + props.p.NumberOfTickets;
                  seatsAvailable2 = [...returnFlight.FirstClassSeatsAvailable];
                  for (let i = 0; i < realReturnSeats.length; i++) {
                    if (realReturnSeats[i] != -1) {
                      seatsAvailable2[realReturnSeats[i]] = 0;
                    }
                  }
                  flight2update.FirstClassSeatsAvailable = seatsAvailable2;
                }
                if (props.p.Tickets[0].ReturnCabin === "business") {
                  flight2update.BusinessClassSeats =
                    returnFlight.BusinessClassSeats + props.p.NumberOfTickets;
                  seatsAvailable2 = [
                    ...returnFlight.BusinessClassSeatsAvailable,
                  ];
                  for (let i = 0; i < realReturnSeats.length; i++) {
                    if (realReturnSeats[i] != -1) {
                      seatsAvailable2[realReturnSeats[i]] = 0;
                    }
                  }
                  flight2update.BusinessClassSeatsAvailable = seatsAvailable2;
                } else {
                  flight2update.EconomyClassSeats =
                    returnFlight.EconomyClassSeats + props.p.NumberOfTickets;
                  seatsAvailable2 = [
                    ...returnFlight.EconomyClassSeatsAvailable,
                  ];
                  for (let i = 0; i < realReturnSeats.length; i++) {
                    if (realReturnSeats[i] != -1) {
                      seatsAvailable2[realReturnSeats[i].ReturnSeat] = 0;
                    }
                  }
                  flight2update.EconomyClassSeatsAvailable = seatsAvailable2;
                  console.log("seats avail 2 " + seatsAvailable2);
                }

                axios
                  .post(
                    "http://localhost:8000/flights/updateflight",
                    flight2update
                  )
                  .then((res) => {
                    window.location.href =
                      "http://localhost:3000/ReservedFlights";
                  })
                  .catch(() => {
                    alert("error");
                  });
              })
              .catch(() => {
                alert("error");
              });
          }
        });
    }
  };


  const handleConfirm = () => {
    //alert("changing flight" + JSON.stringify(selectedFlight));
    handleUpdateBackEnd();
  };

  const handleSelect = (flight, cabin) => {
    setSelectedFlight(flight);
    setSelectedCabin(cabin);
  };
  const isSelected = (id, cab) => {
    if (selectedFlight != null)
      return selectedFlight._id === id && selectedCabin === cab;
    return false;
  };

  function handleSearchFlights() {
    var obj = {
      DepartureCity: actualFlight.DepartureCity,
      ArrivalCity: actualFlight.ArrivalCity,
    };

    axios
      .post("http://localhost:8000/Flights/Search", obj)
      .then((res) => {
        var x1 = res.data;
        setAlternativeFlights(x1);
        setLoading(false);
      })
      .catch((e) => {
        alert("error");
        console.log(e);
      });
  }

  useEffect(() => {
    handleSearchFlights();
  }, []);

  return (
    <div className="container2">
      <div>
        <h3> Alternative {props.flightType} flights </h3>
        <Button
          disabled={selectedFlight === null}
          onClick={handleConfirm}
          variant="contained"
        >
          Select
        </Button>
      </div>
      <div className="cabins">
        <div className="cabin">
          <Checkbox
            color="primary"
            checked={showFirst}
            onChange={(e) => setShowFirst((prev) => !prev)}
          />
          <h5> Bourgeoisie Purple </h5>
        </div>
        <div className="cabin">
          <Checkbox
            color="primary"
            checked={showBusiness}
            onChange={() => setShowBusiness((prev) => !prev)}
          />
          <h5>Business Blue </h5>
        </div>
        <div className="cabin">
          <Checkbox
            checked={showEconomy}
            onChange={() => setShowEconomy((prev) => !prev)}
            color="primary"
          />
          <h5>Budget Green </h5>
        </div>
      </div>

      {isLoading ? (
        <h3> loading </h3>
      ) : (
        <div>
          <Stack direction="column" spacing={2}>
            {alternativeFlights.map((flight) => (
              <Stack direction="column" spacing={2}>
                {showEconomy ? (
                  <FlightCard
                    key={flight._id + "e"}
                    cabin="economy"
                    flight={flight}
                    onClick={handleSelect}
                    isSelected={isSelected}
                  />
                ) : null}
                {showBusiness ? (
                  <FlightCard
                    key={flight._id + "b"}
                    cabin="business"
                    flight={flight}
                    onClick={handleSelect}
                    isSelected={isSelected}
                  />
                ) : null}
                {showFirst ? (
                  <FlightCard
                    key={flight._id + "f"}
                    cabin="first"
                    flight={flight}
                    onClick={handleSelect}
                    isSelected={isSelected}
                  />
                ) : null}
              </Stack>
            ))}
          </Stack>
        </div>
      )}
    </div>
  );
}
export default AlternativeFlightsSearch;
