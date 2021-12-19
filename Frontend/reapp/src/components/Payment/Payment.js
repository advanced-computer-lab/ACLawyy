import StripeCheckout from "react-stripe-checkout";
import {React, useState} from "react";
import { Button } from "@mui/material";

import StripeCheckout from "react-stripe-checkout";
const PaymentComponent = () =>{ 
    const [product,setProduct] =useState({
        name:"Pay for reservation",
        price: "10",
        Productby:"ACLawyyy ;)"
        })

        return(


<StripeCheckout 
stripeKey = {process.env.publishable}
token=""
name=""




>
  <Button style={{
   backgroundcolor:"pink",
   fontSize:"15px",
   marginTop:"100px"
  }}>
      Make Payment
      </Button>
      </StripeCheckout> 
      )
     }
     export default PaymentComponent;