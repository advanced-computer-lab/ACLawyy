//import './App.css';
import React, { useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import Backdrop from "./components/Backdrop/Backdrop";

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  let sideDrawer;
  let backdrop;

  function drawerToggleClickHandler() {
    setDrawerOpen(false);
  }

  if (drawerOpen) {
    sideDrawer = <SideDrawer />;
    backdrop = <Backdrop click={drawerToggleClickHandler} />;
  }

  return (
    <div style={{ height: "100%" }}>
      <Dashboard
        drawerValue={drawerOpen}
        drawerClickHandler={() => setDrawerOpen}
      />
      {sideDrawer}
      {backdrop}
      <main style={{ marginTop: "64px" }}>
        <p>this is the content of the page</p>
      </main>
    </div>
  );
}

export default App;
