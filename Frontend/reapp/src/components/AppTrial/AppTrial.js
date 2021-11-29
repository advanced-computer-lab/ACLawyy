
import React, { useState, useEffect } from "react";
import NavBar from "../NavBar";
import UserPage from "../UserPage/UserPage";

function AppTrial() {
  const [currPage, setCurrPage] = useState(0);
  useEffect(() => {
    console.log(currPage);
  });
  return (
    <div style={{ height: 400, width: "100%" }}>
      <UserPage currPage={currPage} />
      <NavBar type="1"/>
    </div>
  );
}

export default AppTrial;
