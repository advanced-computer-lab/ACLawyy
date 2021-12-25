import "./Seats.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { set } from "date-fns";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import plane from "./Tayara2.png";
import Loading from "../Loading/Loading";


//flightID and cabin type are props to seats function???
//seat chosen needs to be tied to backend
function Seats(prop) {
  const [FirstClassSeats, setFirstClassSeats] = useState();
  const [BusinessSeats, setBusinessSeats] = useState();
  const [EconomySeats, setEconomySeats] = useState();
  const [newSeat, setNewSeat] = useState(-1);


  const props = JSON.parse(useParams().seatParams);
  console.log("in seats with props", props);
  // const flightID= "61a9f38d12bf9a68fa37bfe4";
  const flightID = props.flightID;

  //const ticketID = "61aa17a2bf62ad1df817235c"
  const ticketID = props.ticketID;

  //const cabinType="economy";
  const cabinType = props.cabinType;

  const SeatCabin= cabinType.charAt(0).toUpperCase();

  //const nbOfSeats= 100;
  const nbOfSeats = props.seats;

  //const isAway = true;
  const isAway = props.isAway;
  
  const seatNumber = parseInt(props.seatNumber);

  const [chosen, setChosen] = useState(0);
  var firstCss = "firstNotAllowed";
  var businessCss = "businessNotAllowed";
  var economyCss = "economyNotAllowed";
  const [FirstAvailable, setFirstAvailable] = useState([]);
  const [BusinessAvailable, setBusinessAvailable] = useState([]);
  const [EconomyAvailable, setEconomyAvailable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .post("http://localhost:8000/Flights/Search", { _id: flightID })
      .then((res) => {
        const x = res.data;
        setFirstClassSeats(x[0].FirstClassSeats);
        setBusinessSeats(x[0].BusinessClassSeats);
        setEconomySeats(x[0].EconomyClassSeats);

        setFirstAvailable(x[0].FirstClassSeatsAvailable);
        setBusinessAvailable(x[0].BusinessClassSeatsAvailable);
        setEconomyAvailable(x[0].EconomyClassSeatsAvailable);
        setIsLoading(false);
      })
      .catch((e) => {
        alert("error");
        console.log(e);
      });
  }, []);
  //to pick seat onClick:
  function handleSeatsFirst(index, firstCss) {
    if (chosen < nbOfSeats && firstCss == "first"&&index!=newSeat) {
      console.log("seat is", index);
      let list = [...FirstAvailable];
      console.log("now it's index in list is ", list[index]);
      list[index] = 2; //0
      setFirstAvailable(list);
      console.log(list[index]);
      setChosen((prev) => prev + 1);
      setNewSeat(index);
    }
      else {
        console.log("seat is", index);
        let list = [...FirstAvailable];
        console.log("now it's index in list is ", list[index]);
        list[index] = 0; //0
        setFirstAvailable(list);
        console.log(list[index]);
        setChosen((prev) => prev - 1);
        setNewSeat(-1);
    
    } 
    
  }

  function handleSeatsBusiness(index, businessCss) {

    if (chosen < nbOfSeats && businessCss == "bsuiness"&&index!=newSeat) {
      console.log("seat is", index);
      let list = [...BusinessAvailable];
      console.log("now it's index in list is ", list[index]);
      list[index] = 2; //0
      setBusinessAvailable(list);
      console.log(list[index]);
      setChosen((prev) => prev + 1);
      setNewSeat(index);
    }
      else {
        console.log("seat is", index);
        let list = [...BusinessAvailable];
        console.log("now it's index in list is ", list[index]);
        list[index] = 0; //0
        setBusinessAvailable(list);
        console.log(list[index]);
        setChosen((prev) => prev - 1);
        setNewSeat(-1);
    
    } 
  }

  function handleSeatsEconomy(index, economyCss) {
    if (chosen < nbOfSeats && economyCss == "economy"&&index!=newSeat) {
      console.log("seat is", index);
      let list = [...EconomyAvailable];
      console.log("now it's index in list is ", list[index]);
      list[index] = 2; //0
      setEconomyAvailable(list);
      console.log(list[index]);
      setChosen((prev) => prev + 1);
      setNewSeat(index);
    }
      else {
        console.log("seat is", index);
        let list = [...EconomyAvailable];
        console.log("now it's index in list is ", list[index]);
        list[index] = 0; //0
        setEconomyAvailable(list);
        console.log(list[index]);
        setChosen((prev) => prev - 1);
        setNewSeat(-1);
    
    } 
  }

  function indexOfSeats(array) {
    var res = [];
    for (var i = 0; i < array.length; i++) {
      if (array[i] == 2) res.push(i);
    }
    return res;
  }

  function backToOne(array) {
    var res = [];
    for (var i = 0; i < array.length; i++) {
      if (array[i] == 2) {
        res[i] = 1;
      } else {
        res[i] = array[i];
      }
    }
    return res;
  }

  function confirmSeat() {
    let changedIndices = [];
    const obj = { _id: flightID };


    if (cabinType == "first") {
      changedIndices = indexOfSeats(FirstAvailable);

      let finalSeats =backToOne(FirstAvailable)
      if (seatNumber > -1){
          finalSeats[seatNumber] = 0;
 
      }
      obj.FirstClassSeatsAvailable = finalSeats ;
    } else if (cabinType == "business") {
      changedIndices = indexOfSeats(BusinessAvailable);


      let finalSeats =backToOne(BusinessAvailable)
      if (seatNumber > -1){
          finalSeats[seatNumber] = 0;

     
      }
      obj.BusinessClassSeatsAvailable = finalSeats ;
    } else if (cabinType == "economy") {
      changedIndices = indexOfSeats(EconomyAvailable);

      let finalSeats =backToOne(EconomyAvailable)
      if (seatNumber > -1){
          finalSeats[seatNumber] = 0;

     
      }
      obj.EconomyClassSeatsAvailable = finalSeats ;
    }

    axios
      .post("http://localhost:8000/Tickets/modifySeatsAvailable", obj)
      .then((res) => {
        console.log("updated");
        if (isAway) {
          axios
            .post("http://localhost:8000/Tickets/modifyAwaySeat", {
              _id: ticketID,
              modifiedSeats: changedIndices,
              AwayFlight: flightID,
              AwaySeat: seatNumber
            })
            .then((res) => {
    
              window.location.href = "http://localhost:3000/ReservedFlights";
              console.log("Changed indices are : ", changedIndices);
    
    
            })
            .catch((e) => {
              alert("error");
              console.log(e);
            });
        } else {
          axios
            .post("http://localhost:8000/Tickets/modifyReturnSeat", {
              _id: ticketID,
              modifiedSeats: changedIndices,
              ReturnFlight: flightID,
              ReturnSeat: seatNumber,
            })
            .then((res) => {
              window.location.href = "http://localhost:3000/ReservedFlights";
              console.log("Changed indices are : ", changedIndices);
    
    
            })
            .catch((e) => {
              alert("error");
              console.log(e);
            });
        }
    


      })
      .catch((e) => {
        alert("error");
        console.log(e);
      });

    

  }

  //to render the right cabin
  if (cabinType == "economy") {
    economyCss = "economy";
  } else if (cabinType == "first") {
    firstCss = "first";
  } else if (cabinType == "business") {
    businessCss = "business";
  }
if (isLoading)
  return( <Loading />);

  return (
    <div className= "SeatsBig">
    <div className="seats">
      <div className="seatsTop">
        <ul className={firstCss}>
          {Array.from({ length: FirstAvailable.length / 4 }).map((_, index) => (
            <div>
              {FirstAvailable[index] == 1 && <li className="notAv"> </li>}
              {FirstAvailable[index] == 0 && (
                <li
                  className="av"
                  onClick={() => handleSeatsFirst(index, firstCss)}
                >
                  {" "}
                </li>
              )}
              {FirstAvailable[index] == 2 && <li className="selected" onClick={() =>
                    handleSeatsFirst(
                      index,firstCss
                    )
                  }> </li>}
            </div>
          ))}

          {Array.from({ length: FirstAvailable.length / 4 }).map((_, index) => (
            <div>
              {FirstAvailable[index + FirstAvailable.length / 4] == 1 && (
                <li className="notAv"> </li>
              )}
              {FirstAvailable[index + FirstAvailable.length / 4] == 0 && (
                <li
                  className="av"
                  onClick={() =>
                    handleSeatsFirst(
                      index + FirstAvailable.length / 4,
                      firstCss
                    )
                  }
                >
                  {" "}
                </li>
              )}
              {FirstAvailable[index + FirstAvailable.length / 4] == 2 && (
                <li className="selected" onClick={() =>
                  handleSeatsFirst(
                    index + FirstAvailable.length / 4,
                    firstCss
                  )
                }> </li>
              )}
            </div>
          ))}
        </ul>
        <ul className={businessCss}>
          {Array.from({ length: BusinessAvailable.length / 4 }).map(
            (_, index) => (
              <div>
                {BusinessAvailable[index] === 1 && <li className="notAv"> </li>}
                {BusinessAvailable[index] === 0 && (
                  <li
                    className="av"
                    onClick={() => handleSeatsBusiness(index, businessCss)}
                  >
                    {" "}
                  </li>
                )}
                {BusinessAvailable[index] === 2 && (
                  <li className="selected" onClick={() => handleSeatsBusiness(index, businessCss)}> </li>
                )}
              </div>
            )
          )}
          {Array.from({ length: BusinessSeats / 4 }).map((_, index) => (
            <div>
              {BusinessAvailable[index + BusinessAvailable.length / 4] ===
                1 && <li className="notAv"> </li>}
              {BusinessAvailable[index + BusinessAvailable.length / 4] ===
                0 && (
                <li
                  className="av"
                  onClick={() =>
                    handleSeatsBusiness(
                      index + BusinessAvailable.length / 4,
                      businessCss
                    )
                  }
                >
                  {" "}
                </li>
              )}
              {BusinessAvailable[index + BusinessAvailable.length / 4] ===
                2 && <li className="selected" onClick={() =>
                  handleSeatsBusiness(
                    index + BusinessAvailable.length / 4,
                    businessCss
                  )
                }> </li>}
            </div>
          ))}
        </ul>
        <ul className={economyCss}>
          {Array.from({ length: EconomyAvailable.length / 4 }).map(
            (_, index) => (
              <div>
                {EconomyAvailable[index] === 1 && <li className="notAv"> </li>}
                {EconomyAvailable[index] === 0 && (
                  <li
                    className="av"
                    onClick={() => handleSeatsEconomy(index, economyCss)}
                  >
                    {" "}
                  </li>
                )}
                {EconomyAvailable[index] === 2 && (
                  <li className="selected"  onClick={() => handleSeatsEconomy(index, economyCss)}> </li>
                )}
              </div>
            )
          )}

          {Array.from({ length: EconomyAvailable.length / 4 }).map(
            (_, index) => (
              <div>
                {EconomyAvailable[index + EconomyAvailable.length / 4] ===
                  1 && <li className="notAv"> </li>}
                {EconomyAvailable[index + EconomyAvailable.length / 4] ===
                  0 && (
                  <li
                    className="av"
                    onClick={() =>
                      handleSeatsEconomy(
                        index + EconomyAvailable.length / 4,
                        economyCss
                      )
                    }
                  >
                    {" "}
                  </li>
                )}
                {EconomyAvailable[index + EconomyAvailable.length / 4] ===
                  2 && <li className="selected" onClick={() =>
                    handleSeatsEconomy(
                      index + EconomyAvailable.length / 4,
                      economyCss
                    )
                  }> </li>}
              </div>
            )
          )}
        </ul>
      </div>
      <img
        className="img"
        src={plane}
        alt="plane"
      />

      <div className="seatsBottom">
        <ul className={firstCss}>
          {Array.from({ length: FirstAvailable.length / 4 }).map((_, index) => (
            <div>
              {FirstAvailable[index + FirstAvailable.length / 2] == 1 && (
                <li className="notAv"> </li>
              )}
              {FirstAvailable[index + FirstAvailable.length / 2] == 0 && (
                <li
                  className="av"
                  onClick={() =>
                    handleSeatsFirst(
                      index + FirstAvailable.length / 2,
                      firstCss
                    )
                  }
                >
                  {" "}
                </li>
              )}
              {FirstAvailable[index + FirstAvailable.length / 2] == 2 && (
                <li className="selected" onClick={() =>
                  handleSeatsFirst(
                    index + FirstAvailable.length / 2,
                    firstCss
                  )
                }> </li>
              )}
            </div>
          ))}
          {Array.from({ length: FirstAvailable.length / 4 }).map((_, index) => (
            <div>
              {FirstAvailable[index + (3 * FirstAvailable.length) / 4] == 1 && (
                <li className="notAv"> </li>
              )}
              {FirstAvailable[index + (3 * FirstAvailable.length) / 4] == 0 && (
                <li
                  className="av"
                  onClick={() =>
                    handleSeatsFirst(
                      index + (3 * FirstAvailable.length) / 4,
                      firstCss
                    )
                  }
                >
                  {" "}
                </li>
              )}
              {FirstAvailable[index + (3 * FirstAvailable.length) / 4] == 2 && (
                <li className="selected" onClick={() =>
                  handleSeatsFirst(
                    index + (3 * FirstAvailable.length) / 4,
                    firstCss
                  )
                }> </li>
              )}
            </div>
          ))}
        </ul>
        <ul className={businessCss}>
          {Array.from({ length: BusinessAvailable.length / 4 }).map(
            (_, index) => (
              <div>
                {BusinessAvailable[index + BusinessAvailable.length / 2] ===
                  1 && <li className="notAv"> </li>}
                {BusinessAvailable[index + BusinessAvailable.length / 2] ===
                  0 && (
                  <li
                    className="av"
                    onClick={() =>
                      handleSeatsBusiness(
                        index + BusinessAvailable.length / 2,
                        businessCss
                      )
                    }
                  >
                    {" "}
                  </li>
                )}
                {BusinessAvailable[index + BusinessAvailable.length / 2] ===
                  2 && <li className="selected" onClick={() =>
                    handleSeatsBusiness(
                      index + BusinessAvailable.length / 2,
                      businessCss
                    )
                  }> </li>}
              </div>
            )
          )}
          {Array.from({ length: BusinessAvailable.length / 4 }).map(
            (_, index) => (
              <div>
                {BusinessAvailable[
                  index + (3 * BusinessAvailable.length) / 4
                ] === 1 && <li className="notAv"> </li>}
                {BusinessAvailable[
                  index + (3 * BusinessAvailable.length) / 4
                ] === 0 && (
                  <li
                    className="av"
                    onClick={() =>
                      handleSeatsBusiness(
                        index + (3 * BusinessAvailable.length) / 4,
                        businessCss
                      )
                    }
                  >
                    {" "}
                  </li>
                )}
                {BusinessAvailable[
                  index + (3 * BusinessAvailable.length) / 4
                ] === 2 && <li className="selected" onClick={() =>
                  handleSeatsBusiness(
                    index + (3 * BusinessAvailable.length) / 4,
                    businessCss
                  )
                }> </li>}
              </div>
            )
          )}
        </ul>
        <ul className={economyCss}>
          {Array.from({ length: EconomyAvailable.length / 4 }).map(
            (_, index) => (
              <div>
                {EconomyAvailable[index + EconomyAvailable.length / 2] ===
                  1 && <li className="notAv"> </li>}
                {EconomyAvailable[index + EconomyAvailable.length / 2] ===
                  0 && (
                  <li
                    className="av"
                    onClick={() =>
                      handleSeatsEconomy(
                        index + EconomyAvailable.length / 2,
                        economyCss
                      )
                    }
                  >
                    {" "}
                  </li>
                )}
                {EconomyAvailable[index + EconomyAvailable.length / 2] ===
                  2 && <li className="selected" onClick={() =>
                    handleSeatsEconomy(
                      index + EconomyAvailable.length / 2,
                      economyCss
                    )
                  }> </li>}
              </div>
            )
          )}
          {Array.from({ length: EconomyAvailable.length / 4 }).map(
            (_, index) => (
              <div>
                {EconomyAvailable[index + (3 * EconomyAvailable.length) / 4] ===
                  1 && <li className="notAv"> </li>}
                {EconomyAvailable[index + (3 * EconomyAvailable.length) / 4] ===
                  0 && (
                  <li
                    className="av"
                    onClick={() =>
                      handleSeatsEconomy(
                        index + (3 * EconomyAvailable.length) / 4,
                        economyCss
                      )
                    }
                  >
                    {" "}
                  </li>
                )}
                {EconomyAvailable[index + (3 * EconomyAvailable.length) / 4] ===
                  2 && <li className="selected" onClick={() =>
                    handleSeatsEconomy(
                      index + (3 * EconomyAvailable.length) / 4,
                      economyCss
                    )
                  }> </li>}
              </div>
            )
          )}
        </ul>
      </div>
      <div className="header">
      <h4>Seat selection: 
        &nbsp; {SeatCabin}{newSeat!=-1&&newSeat} selected.{" "}
      </h4>
      </div>
      <Button
        sx={{ width: "100px", left: "10px" ,top :"60px"}}
        onClick={() => confirmSeat()}
        variant="contained"
      >
        Confirm
      </Button>
    </div>
    </div>
  );
}
export default Seats;
