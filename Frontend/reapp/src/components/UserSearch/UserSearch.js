import "./UserSearch.css";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import BasicDatePicker from "../BasicDatePicker/BasicDatePicker";
import React, { useState } from "react";
import axios from "axios";
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { inflateSync } from "zlib";



function UserSearch(props) {

  const [departureDateC, setDepartureDate] = useState("");
  const [departureAirportC, setDepartureAirport] = useState("");
  const [arrivalAirportC, setArrivalAirport] = useState("");
  const [departureCityC, setDepartureCity] = useState("");
  const [arrivalCityC, setArrivalCity] = useState("");
  const [adultsC, setAdults] = useState(0);
  const [childrenC, setChildren] = useState(0);
  const [firstClassSeatsC, setFirstClassSeats] = useState("");
  const [businessClassSeatsC, setBusinessClassSeats] = useState("");
  const [economyClassSeatsC, setEconomyClassSeats] = useState("");

  const [outboundFlights,setOutboundFlights] = useState([]);
  const [inboundFlights,setInboundFlights] = useState([]);




  const [showFirst, setShowFirst] = useState(true);
  const [showBusiness, setShowBusiness] = useState(true);
  const [showEconomy, setShowEconomy] = useState(true);

  const [anchorEl, setAnchorEl] = React.useState(null);



  const setChildrenBig = (e) => 
  {
    const finalValue = parseInt( e.target.value) > -1 ? e.target.value : 0 ;
    
    setChildren(finalValue); setShowFirst(prev => (prev &&childrenC==""&& finalValue<1))}




  const setAdultsBig = (e) => 
    {
      const finalValue = parseInt( e.target.value) > 0 ? e.target.value : 1 ;
      
      setAdults(finalValue); }
  

  const handlePopoverOpen = (event) => {
    if (childrenC > 0)
      setAnchorEl(event.currentTarget);
  };

  const formatCityName= (name)=>{
    let formattedName = name.trim(); 
    formattedName = formattedName.toLowerCase();

    for (var i = 0; i < formattedName.length; i++) {
      if (i === 0 || ( i> 0 && formattedName.charAt(i-1) === ' ' )){
        formattedName= formattedName.substring(0, i) + formattedName.charAt(i).toUpperCase() + formattedName.substring(i + 1);
      }
      }
     return formattedName
  }

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);


  const setDate = (date) => {

    setDepartureDate(JSON.stringify(date).slice(1, 11));

  }
  const isMissing = () =>
  {
    if (departureDateC == "" || departureAirportC == "" ||arrivalAirportC == "" ||departureCityC == "" ||arrivalCityC == "" ||adultsC == "" )
        return true;
    return false;

  }

  function handleSearchFlights() {
    var obj = {};
    var obj2 ={};
    if (departureAirportC.length !== 0) {
      obj = { ...obj, ["DepartureAirport"]: departureAirportC.trim().toUpperCase() };

      obj2 = { ...obj2, ["DepartureAirport"]: arrivalAirportC.trim().toUpperCase() };
    }
    if (arrivalAirportC.length !== 0) {
      obj = { ...obj, ["ArrivalAirport"]: arrivalAirportC.trim().toUpperCase() };

      obj2 = { ...obj2, ["ArrivalAirport"]: departureAirportC.trim().toUpperCase() };
    }


    if (departureCityC.length !== 0) {
      obj = { ...obj, ["DepartureCity"]: formatCityName(departureCityC) };
      obj2 = { ...obj2, ["DepartureCity"]: formatCityName(arrivalCityC) };
    }
    if (arrivalCityC.length !== 0) {
      obj = { ...obj, ["ArrivalCity"]: formatCityName(arrivalCityC) };

      obj2 = { ...obj2, ["ArrivalCity"]: formatCityName(departureCityC) };
    }
 
    if (firstClassSeatsC.length !== 0) {
      obj = { ...obj, ["FirstClassSeats"]: firstClassSeatsC };
    }
    if (businessClassSeatsC.length !== 0) {
      obj = { ...obj, ["BusinessClassSeats"]: businessClassSeatsC };
    }
    if (economyClassSeatsC.length !== 0) {
      obj = { ...obj, ["EconomyClassSeats"]: economyClassSeatsC };
    }
    
    if (departureDateC.length !== 0) {
      obj = {
        ...obj,
        ["DepartureDate"]: JSON.stringify(departureDateC).slice(1, 11),
      };
    }
  


    axios
      .post("http://localhost:8000/Flights/Search", obj)
      .then((res) => {
        var x1 = res.data;
        setOutboundFlights(x1);

        axios
        .post("http://localhost:8000/Flights/Search", obj2)
        .then((res) => {
          var x2 = res.data;

          setInboundFlights(x2);

          props.onSearch(x1,x2,adultsC,childrenC,showFirst,showBusiness,showEconomy);
        })
        .catch((e) => {
          alert("error");
          console.log(e);
        });


      })
      .catch((e) => {
        alert("error");
        console.log(e);
      });
 
 






  }
    return (
      <div className = "container">

      <div className = "cabins">
        <div className = "cabin"        
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}>
             <Checkbox
               color="primary"
               checked = {showFirst}
               onChange = {(e)=>setShowFirst(e.target.checked && (childrenC==""||childrenC ==0) )}
             />
          <h5>  Bourgeoisie Purple </h5>

          <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>Children are not allowed in First class</Typography>
      </Popover>
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
      <div className = "alldetails">
      <Stack spacing = {2} >
        <div><TextField id="outlined-basic" label="Departing City" variant="outlined" onChange= {(e) => setDepartureCity(e.target.value)}/></div>
        <div className = "box"><TextField id="outlined-basic" label="Departing Airport" variant="outlined" onChange= {(e) => setDepartureAirport(e.target.value)}/></div>
      </Stack>
      <Stack spacing = {2} >
        <div><TextField id="outlined-basic" label="Arrival City" variant="outlined" onChange= {(e) => setArrivalCity(e.target.value)}/></div>
        <div><TextField id="outlined-basic" label="Arrival Airport" variant="outlined" onChange= {(e) => setArrivalAirport(e.target.value)} /></div>
      </Stack>
      <Stack spacing = {2} >
        <div><TextField id="outlined-basic" label="Adults" variant="outlined" type = "number" onChange= {(e) => setAdultsBig(e) } value = {adultsC}/></div>
        <div><TextField id="outlined-basic" label="Children" variant="outlined" type = "number" onChange= {setChildrenBig} value = {childrenC}/></div>
        </Stack>
      </div>
      <Stack direction="row" spacing={10}>
      <div><BasicDatePicker label="Departing Date" changeHandler={()=> {return}} type = "date" changeHandler= {setDate}/></div>
      <Button
         disabled = {isMissing()}
            variant="contained"
            onClick = {handleSearchFlights}
          >
            Search
          </Button >
      </Stack>
      </div>
    );
  
    }
export default UserSearch;
