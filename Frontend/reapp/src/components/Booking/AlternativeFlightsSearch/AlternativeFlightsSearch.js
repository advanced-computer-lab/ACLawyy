import "./AlternativeFlightsSearch.css";
import React, { useState, useEffect } from "react";
import FlightCard from "../../FlightCard/FlightCard";
import Loading from "../../Loading/Loading";
import { MdOutlineDoubleArrow } from "react-icons/md";
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
  const [childTickets, setChildTickets] = useState(0);
  const [adultTickets, setAdultTickets] = useState(0);

  var adultsPriceDifference =
    selectedFlight === null
      ? 0
      : (selectedFlight.EconomyPrice *
          (selectedCabin === "business"
            ? 1.5
            : selectedCabin === "first"
            ? 2
            : 1) -
          actualFlight.EconomyPrice *
            (actualCabin === "business"
              ? 1.5
              : actualCabin === "first"
              ? 2
              : 1)) *
        adultTickets;

  var childrenPriceDifference =
    selectedFlight === null
      ? 0
      : (selectedFlight.EconomyPrice *
          (selectedCabin === "business"
            ? 1.5
            : selectedCabin === "first"
            ? 2
            : 1) -
          actualFlight.EconomyPrice *
            (actualCabin === "business"
              ? 1.5
              : actualCabin === "first"
              ? 2
              : 1)) *
        childTickets;
  var purchasePriceDifference = childrenPriceDifference + adultsPriceDifference;
  var flightPriceDifference =
    selectedFlight === null
      ? 0
      : selectedFlight.EconomyPrice *
          (selectedCabin === "business"
            ? 1.5
            : selectedCabin === "first"
            ? 2
            : 1) -
        actualFlight.EconomyPrice *
          (actualCabin === "business" ? 1.5 : actualCabin === "first" ? 2 : 1);

  useEffect(() => {
    setSelectedFlight(null);
  }, [showFirst, showBusiness, showEconomy]);

  useEffect(() => {
    var noOfChildren = 0;
    var noOfAdults = 0;
    for (let i = 0; i < props.p.Tickets.length; i++) {
      if (props.p.Tickets[i].type == "Child") {
        noOfChildren += 1;
      } else {
        noOfAdults += 1;
      }
    }
    setAdultTickets(noOfAdults);
    setChildTickets(noOfChildren);
  }, []);

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
      <h2> Alternative {props.flightType} flights </h2>
      <div className="changed-flights" hidden={selectedFlight === null}>
        <div>
          {actualCabin === "economy" && selectedFlight != null ? (
            <FlightCard
              key={actualFlight._id + "e"}
              cabin="economy"
              flight={actualFlight}
              onClick={null}
              isSelected={isSelected}
            />
          ) : null}
          {actualCabin === "business" && selectedFlight != null ? (
            <FlightCard
              key={actualFlight._id + "b"}
              cabin="business"
              flight={actualFlight}
              onClick={null}
              isSelected={isSelected}
            />
          ) : null}
          {actualCabin === "first" && selectedFlight != null ? (
            <FlightCard
              key={actualFlight._id + "f"}
              cabin="first"
              flight={actualFlight}
              onClick={null}
              isSelected={isSelected}
            />
          ) : null}
        </div>
        <div className="spacerIcon" hidden={selectedFlight === null}>
          <MdOutlineDoubleArrow size="30px"></MdOutlineDoubleArrow>
        </div>
        <div>
          {selectedCabin === "economy" && selectedFlight != null ? (
            <FlightCard
              key={selectedFlight._id + "e"}
              cabin="economy"
              flight={selectedFlight}
              onClick={null}
              isSelected={isSelected}
            />
          ) : null}
          {selectedCabin === "business" && selectedFlight != null ? (
            <FlightCard
              key={selectedFlight._id + "b"}
              cabin="business"
              flight={selectedFlight}
              onClick={null}
              isSelected={isSelected}
            />
          ) : null}
          {selectedCabin === "first" && selectedFlight != null ? (
            <FlightCard
              key={selectedFlight._id + "f"}
              cabin="first"
              flight={selectedFlight}
              onClick={null}
              isSelected={isSelected}
            />
          ) : null}
        </div>
      </div>
      <div className="change-details">
        <div className="price-difference">
          <div className="flight-difference">
            <p hidden={selectedFlight === null}>
              <strong>Price difference:</strong>
            </p>
            <p hidden={selectedFlight === null}>
              {flightPriceDifference < 0
                ? " -$" + flightPriceDifference * -1 + " "
                : " $" + flightPriceDifference + " "}
              per adult ticket
            </p>
            <p hidden={selectedFlight === null}>
              {flightPriceDifference < 0
                ? " -$" + flightPriceDifference * -0.5 + " "
                : " $" + flightPriceDifference * 0.5 + " "}
              per child ticket
            </p>
          </div>
          <div className="purchase-difference">
            <p hidden={selectedFlight === null}>
              <strong>
                {purchasePriceDifference < 0
                  ? "Amount to be refunded for entire booking:"
                  : "Amount to be paid for entire booking:"}
              </strong>
            </p>
            <p hidden={selectedFlight === null}>
              {purchasePriceDifference < 0
                ? "$" + purchasePriceDifference * -1
                : "$" + purchasePriceDifference}
            </p>
          </div>
        </div>
        <Button
          disabled={selectedFlight === null}
          onClick={handleConfirm}
          variant="contained"
        >
          Confirm Change
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
        <Loading />
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
                {showFirst && childTickets === 0 ? (
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
