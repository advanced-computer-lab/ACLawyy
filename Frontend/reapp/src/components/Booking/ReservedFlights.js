import "./ReservedFlights.css";
import BoardingPass from "./BoardingPass";
import Booking from "./Booking";
import React, { useState, useEffect } from "react";
import axios from "axios";

function ReservedFlights(props) {
  const [purchases, setPurchases] = useState([]);
  //   const [noOfPurchases,setNoOfPurchases]=useState

  useEffect(() => {
    axios
      .post("http://localhost:8000/Tickets/findMyPurchases", {
        UserID: props.UserID,
      })
      .then((res) => {
        console.log(res.data);
        setPurchases(res.data);
      });
  }, []);

  if (purchases.length === 0) return <h1> LOADING </h1>;

  return (
    <div className="flights-div">
      {purchases.map((pur) => {
        console.log(purchases);
        return (
          <div>
            <Booking UserID={props.UserID} p={pur} />
          </div>
        );
      })}
    </div>
  );
}

export default ReservedFlights;
