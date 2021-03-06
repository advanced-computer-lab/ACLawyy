import StripeCheckout from "react-stripe-checkout";
import "./Payment.css";
import PaymentComponent from "../PaymentComponent/PaymentComponent.js";
import visa from "./visa_PNG36.png";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { React, useState } from "react";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";

import { useParams } from "react-router-dom";
export default function Payment() {
  const props = JSON.parse(useParams().purchaseBody);

  //const [number, setNumber] = useState(0);
  //setNumber(props.TotalPrice*100);
  const number = props.TotalPrice.toString();

  const product = {
    name: "Pay for reservation",
    price: number,
    Productby: "ACLawyyy ;)",
    PurchaseBody: props,
  };

  // alert(JSON.stringify(props));
  return (
    <div className="center">
      <Card sx={{ maxWidth: 500, width: 500 }}>
        <CardContent className="visa-page">
          <CardMedia className ="visa-img" component="img" height="250" src={visa} alt="visa" />
          <Typography gutterBottom variant="h5" component="div">
            Checkout:
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Amount to be paid:{number}
          </Typography>
          <Typography variant="body1" color="text.primary"></Typography>
          <CardActionArea>
            <Typography variant="body2" color="text.secondary">
              By clicking Make Payment you are agreeing to the terms and
              conditions
            </Typography>
            <PaymentComponent product={product} />
          </CardActionArea>
        </CardContent>
      </Card>
    </div>
  );
}
