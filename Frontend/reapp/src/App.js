import "./App.css";
import React, { useState, useEffect } from "react";
import AdminPage from "./components/AdminPage";
import NavBar from "./components/NavBar";
import UserHome from "./components/UserHome/UserHome";
import ReservedFlights from "./components/Booking/ReservedFlights";
import Seats from "./components/Seats/Seats";
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
  Link,
} from "react-router-dom";

function App() {
  const [currPage, setCurrPage] = useState(0);
  const userID = "61a53ad5cbfb061456411e90";
  const [seatProps, setSeatProps] = useState({});

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" element={<UserHome userID={userID} />}>
            {" "}
          </Route>

          <Route
            exact
            path="/reservedflights"
            element={<ReservedFlights UserID={userID} onSeats={setSeatProps} />}
          ></Route>

          <Route path="/chooseSeats/:seatParams" element={<Seats />}></Route>
        </Switch>
      </div>
      <NavBar type="1" />
    </Router>
  );

  return (
    <div style={{ height: 400, width: "100%" }}>
      <AdminPage currPage={currPage} />
      <NavBar type="0" goTo={setCurrPage} />
    </div>
  );
}
export default App;
