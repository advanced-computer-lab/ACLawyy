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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import LuggageIcon from '@mui/icons-material/Luggage';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
function diff(start, end) {
  start = start.split(":");
  end = end.split(":");
  var startDate = new Date(0, 0, 0, start[0], start[1], 0);
  var endDate = new Date(0, 0, 0, end[0], end[1], 0);
  var diff = endDate.getTime() - startDate.getTime();
  var hours = Math.floor(diff / 1000 / 60 / 60);
  diff -= hours * 1000 * 60 * 60;
  var minutes = Math.floor(diff / 1000 / 60);
  
  // If using time pickers with 24 hours format, add the below line get exact hours
  if (hours < 0)
     hours = hours + 24;
  
  return (hours <= 9 ? "0" : "") + hours + "h " + (minutes <= 9 ? "0" : "") + minutes+ "m" ;
  }


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


const useStyles = makeStyles((theme) => ({
  arrIcon: {
    '& svg': {
      fontSize: 13,
      marginTop : 1,
    }
  },
  expIcon: {
    '& svg': {
      fontSize: 20,
      color: 'dimgrey',
    }
  },

}));
function FlightCard(props){
   const flight = props.flight;
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const classes = useStyles();
  const cabin = props.cabin;
  let multiplier = 1;
  let color = "lightgreen";
  let seats = flight.EconomyClassSeats;
  let selectedColor = '#ccffcc ';
  if (cabin == "first"){
    color = '#D099E2';
    multiplier = 2;
    seats = flight.FirstClassSeats;
    selectedColor = '#e6cce6'
  }
  if (cabin == "business"){
    color = "lightblue";
    multiplier = 1.5;
    seats = flight.BusinessClassSeats;
    selectedColor = '#cce6ff '
  }

  const mystyle = {background : color}

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  let bgCol = 'white';
  if (props.isSelected(flight._id,cabin))
    bgCol = selectedColor;



  return(
    <Card variant="outlined" sx={{ maxWidth: 300 ,minWidth: 300 , boxShadow: 3,borderColor: color,borderWidth: 2,backgroundColor:bgCol,flexGrow :0}}>
      <CardActionArea onClick = {()=>{
        if (props.isSelected(flight._id,cabin))
          props.onClick(null,null)
        else
          props.onClick(flight,props.cabin)}
          }>
      <CardContent>
      <h3 className = "date"> {flight.DepartureDate} </h3>
      <h3 className = "deptime">{flight.DepartureTime} </h3>
      <h3 className = "arrtime"> {flight.ArrivalTime} </h3>

      <h3 className = "num"> #{flight.FlightNumber} </h3>
        <div id = "dep" ref = {ref1} className = "item1" > <h2> {flight.DepartureCity}  </h2>
                                        <h4 className = "depair"> {flight.DepartureAirport}  
                                        <div className={classes.arrIcon}> <FlightTakeoffIcon  /></div>
                                        
                                        </h4>
        </div>
        <h4 class = "dur"> {diff(flight.DepartureTime,flight.ArrivalTime)}</h4>
        <div id = "arr" ref = {ref2} class = "item2"> <h2>{flight.ArrivalCity} </h2> 
        
        <h4 class = "arrair"> <div className={classes.arrIcon}> <FlightLandIcon  /></div>  {flight.ArrivalAirport}</h4>
        
        </div>

        <Xarrow
                color = {color}
                headSize = {6}
                strokeWidth = {1}
                start= {ref1}
                end= {ref2}
                animateDrawing = {true}
                
            />


      </CardContent>



    </CardActionArea>

    <ExpandMore
          className = "expand"
          expand={expanded || props.perm}
          onClick={handleExpandClick}
          aria-expanded={expanded || props.perm}
          aria-label="show more"
        >
         { !props.perm&& <ExpandMoreIcon  />}
        </ExpandMore>
        <Collapse in={expanded || props.perm} timeout="auto" unmountOnExit >
          <div  className = "details" style={mystyle}>  

            <div className =  "attribute"> <div className = "icon"><LuggageIcon /> </div><h4 class = "arricon">  {flight.BaggageAllowance} Kg </h4></div>

            <div className =  "attribute"> <div className = "icon"><AttachMoneyIcon /> </div><h4 class = "arricon"> {flight.EconomyPrice * multiplier}  </h4></div>
          
            <div className =  "attribute"> <div className = "icon"><AirlineSeatReclineNormalIcon /> </div><h4 class = "arricon">  {seats} available seats  </h4></div>
          
           </div>
        </Collapse>

  </Card>
  );
  }


  export default FlightCard;