import "./NavBar.css";
import { CgProfile } from "react-icons/cg";
import logo from "./logo.jpeg";
import Button from "@mui/material/Button";

import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
  Link,
} from "react-router-dom";
import {ReactSession} from 'react-client-session';

function NavBar(props) {

  const handleSignOut= ()=>{
    
    ReactSession.set("userType", 2);
    window.location.href = "http://localhost:3000/";

  }

 const [type, setType]= useState(props.type);
  useEffect(()=> {
   // alert(ReactSession.get("userType"));
    setType(ReactSession.get("userType"));

  },[])

  if (type == 0) {
    return (
      <header className="navbar">
        <nav className="navbar-nav">
          <div className="navbar-logo">
            <img src={logo} alt="Logo" />
          </div>
          <div className="navbar-slogan">
            <a href="/">Love At First Flight ; )</a>
          </div>
          <div className="spacer"></div>
          <div className="navbar-nav-items">
            <ul>
              <li>
                <a href="/adminhome"> Home</a>
                <a href="/manageflights"> Manage Flights </a>
              </li>
            </ul>
          </div>

          <div className="navbar-profile">
            <Link className="navbar-profile-logo" to="/profile">
              <CgProfile size="40px" />
            </Link>

            <a onClick = {() => handleSignOut()}>log out</a>
          </div>
        </nav>
      </header>
    );
  } else if (type == 1) {
    return (
      <header className="navbar">
        <nav className="navbar-nav">
          <div className="navbar-logo">
            <img src={logo} alt="Logo" />
          </div>
          <div className="navbar-slogan">
            <a href="/">Love At First Flight ; )</a>
          </div>
          <div className="spacer"></div>
          <div className="navbar-nav-items">
            <ul>
              <li>
                <Link to="/
                ">Home</Link>
                <Link to = "/booking" >Book A Flight</Link>
                <Link to="/ReservedFlights">Reserved Flights</Link>
                <a href="/">FAQ</a>
              </li>
            </ul>
          </div>

          <div className="navbar-profile">
            <Link className="navbar-profile-logo" to="/profile">
              <CgProfile size="40px" />
            </Link>
            <a onClick = {() => handleSignOut()}>log out</a>
          </div>
        </nav>
      </header>
    );
  } else {
    return (
      <header className="navbar">
        <nav className="navbar-nav">
          <div className="navbar-logo">
            <img src={logo} alt="Logo" />
          </div>
          <div className="navbar-slogan">
            <a href="/">Love At First Flight ; )</a>
          </div>
          <div className="spacer"></div>
          <div className="navbar-nav-items">
            <ul>
              <li>
                <a href="/">Home</a>
                <a href="/booking">Book A Flight</a>
                <a href="/">FAQ</a>
              </li>
            </ul>
          </div>

          <div className="navbar-profile-buttons">
            <Button variant="contained" href="http://localhost:3000/register" color="primary" size="small">
              Sign Up
            </Button>
            <Button variant="text" href="http://localhost:3000/login" color="primary" size="small">
              Sign in
            </Button>
          </div>
        </nav>
      </header>
    );
  }
}

export default NavBar;
