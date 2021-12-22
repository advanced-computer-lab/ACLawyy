import "./ReservedFlights.css";
import BoardingPass from "./BoardingPass";
import Booking from "./Booking";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";

import {ReactSession} from 'react-client-session';

function ReservedFlights(props) {
  const [purchases, setPurchases] = useState([]);
  const [isLoading, setLoading] =  useState(true);
  const userID =ReactSession.get("id");

  //   const [noOfPurchases,setNoOfPurchases]=useState

  useEffect(() => {
    axios
      .post("http://localhost:8000/Tickets/findMyPurchases", {
        UserID: userID,
      })
      .then((res) => {
        console.log(res.data);
        setPurchases(res.data);
        setLoading(false);
      });
  }, []);
  if (isLoading)
    return <Loading/>
  else if (purchases.length === 0)
    return <h1 className="empty"> You don't have any reserved flights </h1>;

  return (
    <div className="flights-div">
      {purchases.map((pur) => {
        console.log(purchases);
        return (
          <div>
            <Booking UserID={userID} p={pur} onSeats={props.onSeats} />
          </div>
        );
      })}
    </div>
  );
}

export default ReservedFlights;
