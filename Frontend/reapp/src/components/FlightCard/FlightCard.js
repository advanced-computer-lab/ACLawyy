import "./FlightCard.css";

import React, { useState,useEffect ,useRef} from "react";
import { makeStyles } from '@material-ui/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Xarrow from "react-xarrows";
import { CardActionArea } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import IconButton from '@material-ui/core/IconButton';
const flight =    {
  "_id": "61a0aaa76f8ca666a0b5a33f",
  "FlightNumber": 1,
  "ArrivalDate": "2021-11-26",
  "DepartureDate": "2000-04-29",
  "DepartureAirport": "CAI",
  "ArrivalAirport": "NYC",
  "DepartureTime": "22:00",
  "ArrivalTime": "23:00",
  "DepartureCity": "Cairo",
  "ArrivalCity": "New York",
  "BaggageAllowance": 70,
  "FirstClassSeats": 12,
  "BusinessClassSeats": 23,
  "EconomyClassSeats": 34,  
  "EconomyPrice": 420000,
  "createdAt": "2021-11-26T09:36:39.341Z",
  "updatedAt": "2021-11-27T11:31:01.328Z",
  "__v": 0,
  "id": "61a0aaa76f8ca666a0b5a33f"
}
const useStyles = makeStyles((theme) => ({
  arrIcon: {
    '& svg': {
      fontSize: 13,
      marginTop : 1,
    }
  },
  deleteIcon2: {
    '& svg': {
      fontSize: 50
    }
  },

}));
function FlightCard(props){
  // const flight = props.flight;

  const classes = useStyles();

  return(
    <Card variant="outlined" sx={{ maxWidth: 300 , maxHeight: 100, minHeight: 100 ,boxShadow: 3}}>
      <CardActionArea>
      <CardContent>

      <h3 class = "deptime">{flight.DepartureTime} </h3>
      <h3 class = "arrtime"> {flight.ArrivalTime} </h3>

        <div id = "dep"class = "item1" > <h2> {flight.DepartureCity}  </h2>
                                        <h4 class = "depair"> {flight.DepartureAirport}  
                                        <div className={classes.arrIcon}> <FlightTakeoffIcon  /></div>
                                        
                                        </h4>
        </div>
        <h4 class = "dur">  5h 20m</h4>
        <div id = "arr" class = "item2"> <h2>{flight.ArrivalCity} </h2> 
        
        <h4 class = "arrair"> <div className={classes.arrIcon}> <FlightLandIcon  /></div>  {flight.ArrivalAirport}</h4>
        
        </div>

        <Xarrow
                color = "#87ceeb"
                headSize = '6'
                strokeWidth = '1'
                start="dep" 
                end="arr"
                animateDrawing = {true}
                
            />


      </CardContent>
    </CardActionArea>
  </Card>
  );
  }


  export default FlightCard;