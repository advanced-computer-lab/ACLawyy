import "./App.css";
import React, { useState, useEffect } from "react";
import AdminPage from "./components/AdminPage/AdminPage.js";
import AdminHome from "./components/AdminHome";
import NavBar from "./components/NavBar";
import UserHome from "./components/UserHome/UserHome";
import UserPage from "./components/UserPage/UserPage";
import ReservedFlights from "./components/Booking/ReservedFlights";
import Seats from "./components/Seats/Seats";
import Payment from "./components/Payment/Payment";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import BookAFlight from "./components/BookAFlight/BookAFlight";
import BottomPage from "./components/UserHomePage/BottomPage/BottomPage";

import { ReactSession } from "react-client-session";
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
  Link,
} from "react-router-dom";

ReactSession.setStoreType("localStorage");

function App() {
  const [currPage, setCurrPage] = useState(0);
  const [seatProps, setSeatProps] = useState({});
  // const [userID,setUserID] = useState (null);

  //const [userType, setUserType] = useState(2);

  const setUserID = (id) => {
    ReactSession.set("id", id);
  };
  const setUserType = (type) => {
    ReactSession.set("userType", type);
  };

  // useEffect (()=> {
  //    ReactSession.set("userType", 2);
  // },[])
  return (
    <Router>
      <div>
        <Switch>
          <Route
            exact
            path="/"
            element={<UserHome UserID={ReactSession.get("id")} />}
          ></Route>
          <Route
            exact
            path="/booking"
            element={<BookAFlight UserID={ReactSession.get("id")} />}
          ></Route>

          <Route
            exact
            path="/profile"
            element={<UserPage userID={ReactSession.get("id")} />}
          ></Route>
          <Route path="/payment/:purchaseBody" element={<Payment />}></Route>
          <Route
            exact
            path="/reservedflights"
            element={
              <ReservedFlights
                userID={ReactSession.get("id")}
                onSeats={setSeatProps}
              />
            }
          ></Route>
          <Route
            exact
            path="/login"
            element={<Login setUserID={setUserID} setUserType={setUserType} />}
          ></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route path="/chooseSeats/:seatParams" element={<Seats />}></Route>

          {ReactSession.get("userType") == 0 && (
            <Route path="/adminhome" element={<AdminHome />}></Route>
          )}

          {ReactSession.get("userType") == 0 && (
            <Route path="/manageflights" element={<AdminPage />}></Route>
          )}
        </Switch>
      </div>
      <NavBar type={ReactSession.get("userType")} />
      <BottomPage class="BottomPage" />
    </Router>
  );

  return (
    <div style={{ height: 400, width: "100%" }}>
      <NavBar type="0" goTo={setCurrPage} />
      <AdminPage currPage={currPage} />
    </div>
  );
}
export default App;
