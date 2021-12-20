import StripeCheckout from "react-stripe-checkout";
import "./Payment.css";
import visa from "./visa_PNG36.png";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {React, useState} from "react";
import { Button } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
export default function Payment () { 
    const[number,setNumber]= useState(0);
    const [product,setProduct] =useState({
        name:"Pay for reservation",
        price: {number},
        Productby:"ACLawyyy ;)"
        })

        return(
            <div className="center" >
            <Card sx={{ maxWidth: 500,width:500 }}>
        
      
        
        <CardContent>
        <CardMedia
          component="img"
          height="250"
          src={visa}
          alt="visa"
        />
          <Typography gutterBottom variant="h5" component="div">
            Checkout:
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Amount to be paid:{number}
          </Typography>
          <Typography variant="body1" color="text.primary">
            
          </Typography>
            <CardActionArea>
            <Typography variant="body2" color="text.secondary">
            By clicking Make Payment you are agreeing to the terms and conditions
            </Typography>
            <StripeCheckout 
    stripeKey = "pk_test_51K8BI2DXNkUn4YuszggmHAuUflW7oYdM1B6qTgSdkKwBMSnbmbYfUIWREOch2oSPLkCOmOsldOkvW6am99Dc3skq00Xux5d3q4"
    token=""
    name=""
    
    >
        <Button className="B1" style={{
            backgroundcolor:"blue",
            fontSize:"15px",
            marginLeft:"0px"
        }}>
        Make Payment
        </Button>
    </StripeCheckout> 
              
              </CardActionArea> 
          
        </CardContent>
      
    </Card>


    
    </div>      )
     }
     