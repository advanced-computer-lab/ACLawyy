import "./App.css";
import React, { useState,useEffect } from "react";
import AdminPage from "./components/AdminPage";
import NavBar from "./components/NavBar";
import UserHome from "./components/UserHome/UserHome"


function App() {
  const [currPage, setCurrPage] = useState(0);
  const userID = "61a53ad5cbfb061456411e90";

    return(
      <div>
      <NavBar type="0" goTo = {setCurrPage} />
      <UserHome userID = {userID}/>
      </div>
    );


    return (<div style={{ height: 400, width: '100%' }}> 

    <AdminPage currPage = {currPage}/>
     <NavBar type="0" goTo = {setCurrPage} />

  </div>);
}
export default App;
