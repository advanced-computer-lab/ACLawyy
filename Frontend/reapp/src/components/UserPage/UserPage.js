import "./UserPage.css";
import Booking from "../Booking/Booking";
import axios from "axios";
import React, { useState, useEffect } from "react";

function UserPage(props) {
const[purchase,setPurchase]=useState();
const[stillFetching,setFetching] = useState(true);
      useEffect(() => {
    axios
      .post("http://localhost:8000/Tickets/getPurchase", {
        _id: "61a66ea747db1cd2e6d86856",
      })
      .then((res) => {
        console.log(res.data);
        setPurchase(res.data);
        setFetching(false);
 
             });
  }, []);
  if (purchase== null){
    return (
        <div></div>)
}
return (
    <div>
     
      <Booking UserID="61a53ad5cbfb061456411e90" p={purchase} />
    </div>
  );
}

export default UserPage;
