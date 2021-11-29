import AdminTable from "./AdminTable";
import AdminHome from "./AdminHome";
import React, { useState,useEffect } from "react";
import axios from "axios";
import "./AppTest.css";
import BlockTextFields from "./BlockTextFields/BlockTextFields";
import Button from "@mui/material/Button";

import {
    BrowserRouter as Router,
    Route,
    Routes as Switch
} from 'react-router-dom';

function AdminPage(props) {
    const [rows, setRows] = useState([]);
    const [results, setResults] = useState([]);
    const columns = ["Flight Number","Departure Airport","Departure Date","Arrival Airport", "Arrival Date","Total Seats"];
    const [block, setBlock] = useState(0);

    const handleRemoveBlock = () => {
        setBlock(0);
      };
      const handleSearchBlock = () => {
        setBlock(1);
      };
      const handleCreateBlock = () => {
        setBlock(2);
      };


      const handleSearch=(e)=>{

        setResults(e.map(obj=> ({ ...obj, id:obj._id})));
        table = <AdminTable rows={results} columns = {columns} refresh = {handleAllFlights}/>;
     // console.log(JSON.stringify(e))
        }
        

    let   table = results.length ===0 ?(<AdminTable rows={rows} columns = {columns} refresh = {handleAllFlights}/>):
    (<AdminTable rows={results} columns = {columns} refresh = {handleAllFlights}/>)


    let fullTable = <div> 
        <div>

      <div className="buttondiv">
        <Button variant="contained" onClick={handleSearchBlock} size="large">
          Search
        </Button>
        <div className="spacer"></div>
        <Button variant="contained" onClick={handleCreateBlock} size="large">
          Create
        </Button>
      </div>
      <div>
        <BlockTextFields type={block} blockRemover={handleRemoveBlock} searchHandler={handleSearch} />
      </div>
      {table}
    </div>

        </div>
    function handleAllFlights() {
        axios
        .get("http://localhost:8000/flights")
        .then((res) => {
          const x = res.data;
          setRows(x.map(obj=> ({ ...obj, id:obj._id})));
        })
        .catch(() => {
          alert("error");
        });
    }

    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/adminhome" element = { <AdminHome/>}> </Route>

                    <Route path='/manageflights' element = { fullTable}></Route>
                </Switch>

            </div>
        </Router>
    );

}
  export default AdminPage;
  