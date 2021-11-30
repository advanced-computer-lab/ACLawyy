import "./Seats.css";
import { IoAirplaneSharp } from 'react-icons/io5';
import Checkbox from '@mui/material/Checkbox';
import CheckIcon from '@mui/icons-material/Check';
import {makeStyles} from '@material-ui/styles';
import React, { useState,useEffect } from "react";
import axios from "axios";


const useStyles = makeStyles((theme) => ({
    seats:{
  
           
             display:'flex',
             position:'relative',
             flexDirection: 'column',
             height: '100%',
             width: '100%',
        
    },
    seatsTop:{
        
             display:'flex',
             position:'relative',
             flexDirection: 'row',
             columnGap: '20px',
             top: '270px',
             left: '170px',
        
    },
    seatsBottom:{
        
             display:'flex',
             position:'relative',
             flexDirection: 'row',
             columnGap: '20px',
             top: '370px',
             left: '170px',
        
    },
    first:{
        '& svg':{
            color: 'purple',
        },
        color: 'purple',
        position:'relative',
        display:'flex',
        flexWrap: 'wrap',
        flexDirection:'row',
        rowGap: '0px',
        width:'140px',
        height:'100px',
        
    },
    business:{
        '& svg':{
            color: 'blue',
        },
        color: 'blue',
        position:'relative',
        display:'flex',
        flexWrap: 'wrap',
        flexDirection:'row',
        rowGap: '0px',
        width:'250px',
        height:'100px',
        
    },
    economy:{
        '& svg':{
            color: 'green',
        },
        color: 'green',
        position:'relative',
        display:'flex',
        flexWrap: 'wrap',
        flexDirection:'row',
        rowGap: '0px',
        width:'400px',
        height:'100px',
        
    },
    notAv:{
        color:'red',
        
    }
 
    
}))

function Seats() {
    const classes = useStyles();
    const [FirstClassSeats, setFirstClassSeats]= useState();
    const [BusinessSeats, setBusinessSeats]= useState();
    const [EconomySeats, setEconomySeats]= useState();
    const flightID= "61a0aaa76f8ca666a0b5a33f";
    const[FirstAvailable, setFirstAvailable]= useState([]);
    const[BusinessAvailable, setBusinessAvailable]= useState([]);
    const[EconomyAvailable, setEconomyAvailable]= useState([]);

    useEffect(() => {
    axios
    .post("http://localhost:8000/Flights/Search", {_id: flightID})
    .then((res) => {
      const x = res.data;
      setFirstClassSeats(x[0].FirstClassSeats);
      setBusinessSeats(x[0].BusinessClassSeats);
      setEconomySeats(x[0].EconomyClassSeats);
      setFirstAvailable(x[0].FirstClassSeatsAvailable);
      setBusinessAvailable(x[0].BusinessClassSeatsAvailable);
      setEconomyAvailable(x[0].EconomyClassSeatsAvailable);
    })
    .catch((e) => {
      alert("error");
      console.log(e);
    });

}, []);

    return (
  <div className= {classes.seats}>
      <div className= {classes.seatsTop} >
         <div className= {classes.first}>
         {
         Array.from({length: FirstClassSeats/2 })
            .map((_, index) => (
                FirstAvailable[index]==1
                  ? (<div><button className= {classes.notAv}> first</button></div>)
                  :<div> <button > first</button> </div>
              )) }
         </div>
         <div className= {classes.business}>
         {
         Array.from({length: BusinessSeats/2})
            .map((_, index) => (
                BusinessAvailable[index]==1
                  ? (<div><button className= {classes.notAv}> busi</button></div>)
                  :<div> <button > busi</button> </div>
              )) }
         </div>
         <div className= {classes.economy}>
         {
         Array.from({length: EconomySeats/2})
            .map((_, index) => (
                EconomyAvailable[index]==1
                  ? (<div><button className= {classes.notAv}> econ</button></div>)
                  :<div> <button > econ</button> </div>
              )) }
         </div>
        </div>


        <div className= {classes.seatsBottom} >
         <div className= {classes.first}>
         {
         Array.from({length: FirstClassSeats/2})
            .map((_, index) => (
                FirstAvailable[index+(FirstClassSeats/2)+1]==1
                  ? (<div><button className= {classes.notAv}> first</button></div>)
                  :<div> <button > first</button> </div>
              )) }
         </div>
         <div className= {classes.business}>
         {
         Array.from({length: BusinessSeats/2})
            .map((_, index) => (
                BusinessAvailable[index+(BusinessSeats/2)]==1
                  ? (<div><button className= {classes.notAv}> busi</button></div>)
                  :<div> <button > busi</button> </div>
              )) }
         </div>
         <div className= {classes.economy}>
         {
         Array.from({length: EconomySeats/2})
            .map((_, index) => (
                EconomyAvailable[index+(EconomySeats/2)]==1
                  ? (<div><button className= {classes.notAv}> econ</button></div>)
                  :<div> <button > econ</button> </div>
              )) }
         </div>
        </div>
  </div> )
}
  export default Seats;