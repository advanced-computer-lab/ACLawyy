import "./App.css";
import React, { useState,useEffect } from "react";
import AdminPage from "./components/AdminPage";
import NavBar from "./components/NavBar"

import FlightResults from "./components/FlightResults/FlightResults"



function App() {
  const [currPage, setCurrPage] = useState(0);


    return(
      
      <FlightResults/>
    );


    return (<div style={{ height: 400, width: '100%' }}> 

    <AdminPage currPage = {currPage}/>
     <NavBar type="0" goTo = {setCurrPage} />

  </div>);
}
export default App;
