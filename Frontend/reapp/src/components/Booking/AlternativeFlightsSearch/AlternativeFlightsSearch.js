import "./AlternativeFlightsSearch.css";
import React, { useState,useEffect } from "react";
import FlightCard from "../../FlightCard/FlightCard";

import { Button } from '@mui/material';


import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import axios from "axios";

import Checkbox from '@mui/material/Checkbox';


function AlternativeFlightsSearch(props) {

    const actualFlight = props.flightType == "departure" ? props.DepartureFlight :props.ReturnFlight;
    const actualCabin =  props.flightType == "departure" ? props.awayCabin :props.returnCabin;

    const [alternativeFlights , setAlternativeFlights] = useState([actualFlight]);
    const [showFirst, setShowFirst] = useState(true);
    const [showBusiness, setShowBusiness] = useState(true);
    const [showEconomy, setShowEconomy] = useState(true);
    const [isLoading , setLoading] = useState(true);
    const [selectedFlight , setSelectedFlight] = useState(null);
    const [selectedCabin , setSelectedCabin] = useState(null);

    useEffect(() => {
        setSelectedFlight(null);
    } , [showFirst,showBusiness,showEconomy]);


    const handleConfirm = () => {
        alert ("changing flight" + JSON.stringify(selectedFlight));
    }

    const handleSelect = (flight,cabin) => {
        setSelectedFlight(flight);
        setSelectedCabin(cabin);
    }
    const isSelected = (id,cab)=>{
        if (selectedFlight!= null)
            return selectedFlight._id === id && selectedCabin === cab;
        return false;
    }
    
    function handleSearchFlights() {
        var obj = {DepartureCity : actualFlight.DepartureCity, ArrivalCity : actualFlight.ArrivalCity};

        axios
          .post("http://localhost:8000/Flights/Search", obj)
          .then((res) => {
            var x1 = res.data;
            setAlternativeFlights(x1);
            setLoading(false);
          })
          .catch((e) => {
            alert("error");
            console.log(e);
          });
    
      }

      useEffect(() => {
        handleSearchFlights();
    } , []);

    return(
        <div className = "container2">
            <div>
            <h3> Alternative {props.flightType} flights </h3> 
             <Button

                disabled = {selectedFlight===null}
                onClick= {handleConfirm}
                variant="contained">
                
             Select
             </Button >
        </div>
            <div className = "cabins">
        <div className = "cabin"  >
             <Checkbox
               color="primary"
               checked = {showFirst}
               onChange = {(e)=>setShowFirst(prev => !prev)}
             />
          <h5>  Bourgeoisie Purple </h5>

        
        </div>
        <div className = "cabin">
             <Checkbox
               color="primary"
               checked = {showBusiness}
               onChange = {()=>setShowBusiness(prev=> !prev)}
             />
          <h5>Business Blue </h5>
        </div>
        <div className = "cabin">
             <Checkbox
               checked = {showEconomy}
               onChange = {()=>setShowEconomy(prev=> !prev)}
               color="primary"
             />
          <h5>Budget Green </h5>
        </div>
 

      </div>



                {isLoading? <h3> loading </h3> :<div>
        <Stack direction="column" spacing={2} >
        {alternativeFlights.map((flight) => (
             <Stack direction="column" spacing={2} >
            {showEconomy?<FlightCard key = {flight._id +"e" }cabin = "economy" flight = {flight} onClick = {handleSelect} isSelected = {isSelected} />:null}
            {showBusiness?<FlightCard key = {flight._id +"b"}cabin = "business" flight = {flight} onClick = {handleSelect} isSelected = {isSelected} />:null}
            {showFirst?<FlightCard key = {flight._id +"f"}cabin = "first" flight = {flight} onClick = {handleSelect} isSelected = {isSelected} />:null}
            </Stack>
            )
          )}
                </Stack> 
        </div>}

       </div>
    );


}
export default AlternativeFlightsSearch;
