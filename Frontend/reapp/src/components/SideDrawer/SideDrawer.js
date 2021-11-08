import "./SideDrawer.css";
import { Button } from "reactstrap";
import axios from "axios";
import React, { useState } from "react";
function SideDrawer(props) {
  //const body = "hi";
  const [body, setBody] = useState("sad");

  return (
    <nav className="side-drawer">
      <ul>
        <li>
          <button onClick={() => {}}>Show All Flights</button>
        </li>
        <li>
          <a>Create New Flight</a>
        </li>
        <li>
          <a>Edit a Flight</a>
        </li>
        <li>
          <a>Delete a Flight</a>
        </li>
        <li>
          <a>Search for a Flight</a>
        </li>
      </ul>
    </nav>
  );
}

export default SideDrawer;
