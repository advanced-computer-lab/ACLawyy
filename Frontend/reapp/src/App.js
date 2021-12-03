import "./App.css";
import React, { useState, useEffect } from "react";
import AdminPage from "./components/AdminPage/AdminPage";
import NavBar from "./components/NavBar";
import Seats from "./components/Seats/Seats";

function App() {
  const [currPage, setCurrPage] = useState(0);
  useEffect(() => {
    console.log(currPage);
  });
  return (
    <div style={{ height: 400, width: "100%" }}>
      {/* <AdminPage currPage={currPage} /> */}
      <NavBar type="1" goTo={setCurrPage} />
      <Seats />
    </div>
  );
}

export default App;
