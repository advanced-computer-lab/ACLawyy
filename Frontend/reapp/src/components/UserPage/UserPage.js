import "./UserPage.css";
import Booking from "../Booking/Booking";
import axios from "axios";
import React, { useState, useEffect } from "react";

function UserPage(props) {
  const [purchase, setPurchase] = useState();
  const [stillFetching, setFetching] = useState(true);
  useEffect(() => {
    axios
      .post("http://localhost:8000/Tickets/getPurchase", {
        _id: "61aa1eb909135e86f5f8e5d1",
      })
      .then((res) => {
        console.log(res.data);
        setPurchase(res.data);
        setFetching(false);
      });
  }, []);
  if (purchase == null) {
    return <div></div>;
  }
  return (
    <div>
      <Booking UserID="61a53ad5cbfb061456411e90" p={purchase} />
    </div>
  );
}

export default UserPage;
