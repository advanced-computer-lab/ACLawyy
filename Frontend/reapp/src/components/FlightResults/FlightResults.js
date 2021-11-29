import "./FlightResults.css";
import React, { useState,useEffect } from "react";

import FlightCard from "./FlightCard/FlightCard"



function FlightResults() {



    return(
      
    <div className = "page" >
    <FlightCard />
    <FlightCard />
    <FlightCard />
    </div>
    );


}
export default FlightResults;
